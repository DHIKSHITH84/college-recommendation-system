"""Initialize SQLite database with schema and sample college data."""
import os
import sqlite3
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DB_PATH = os.path.join(ROOT, 'database', 'eapcet_colleges.db')
SCHEMA_PATH = os.path.join(ROOT, 'database', 'sqlite_schema.sql')
SAMPLE_PATH = os.path.join(ROOT, 'database', 'sample_data.sql')


def load_sql_file(cursor, path):
    with open(path, 'r', encoding='utf-8') as handle:
        sql = handle.read()
    cursor.executescript(sql)


def load_sample_data(cursor):
    with open(SAMPLE_PATH, 'r', encoding='utf-8') as handle:
        buffer = []
        for line in handle:
            stripped = line.strip()
            if not stripped or stripped.startswith('--'):
                continue
            if stripped.upper().startswith('USE '):
                continue
            buffer.append(line)
        sql = ''.join(buffer)
    cursor.executescript(sql)


def init_db(force=False):
    if force and os.path.exists(DB_PATH):
        os.remove(DB_PATH)

    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    try:
        cursor = conn.cursor()
        load_sql_file(cursor, SCHEMA_PATH)
        load_sample_data(cursor)
        conn.commit()

        college_count = cursor.execute('SELECT COUNT(*) FROM colleges').fetchone()[0]
        program_count = cursor.execute('SELECT COUNT(*) FROM college_programs').fetchone()[0]
        print(f'SQLite database ready: {DB_PATH}')
        print(f'Colleges: {college_count}, Programs: {program_count}')
    finally:
        conn.close()


if __name__ == '__main__':
    force = '--force' in sys.argv
    init_db(force=force)
