import sqlite3

import pymysql
from pymysql.cursors import DictCursor

from config import Config


def _normalize_query(query):
    return query.replace('%s', '?')


def _sqlite_connection():
    conn = sqlite3.connect(Config.SQLITE_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def _sqlite_row_to_dict(row):
    if row is None:
        return None
    return dict(row)


def get_connection():
    if Config.USE_SQLITE:
        return _sqlite_connection()
    return pymysql.connect(
        host=Config.MYSQL_HOST,
        user=Config.MYSQL_USER,
        password=Config.MYSQL_PASSWORD,
        database=Config.MYSQL_DB,
        port=Config.MYSQL_PORT,
        cursorclass=DictCursor,
        autocommit=True,
    )


def execute_query(query, params=None, fetch_one=False, fetch_all=False):
    params = params or ()
    conn = get_connection()
    try:
        if Config.USE_SQLITE:
            cursor = conn.cursor()
            cursor.execute(_normalize_query(query), params)
            if fetch_one:
                return _sqlite_row_to_dict(cursor.fetchone())
            if fetch_all:
                return [_sqlite_row_to_dict(row) for row in cursor.fetchall()]
            conn.commit()
            return cursor.lastrowid

        with conn.cursor() as cursor:
            cursor.execute(query, params)
            if fetch_one:
                return cursor.fetchone()
            if fetch_all:
                return cursor.fetchall()
            return cursor.lastrowid
    finally:
        conn.close()
