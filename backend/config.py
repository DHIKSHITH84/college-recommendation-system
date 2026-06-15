import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    USE_SQLITE = os.getenv('USE_SQLITE', 'false').lower() == 'true'
    SQLITE_PATH = os.getenv(
        'SQLITE_PATH',
        os.path.join(
            os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
            'database',
            'eapcet_colleges.db',
        ),
    )
    MYSQL_HOST = os.getenv('MYSQL_HOST', 'localhost')
    MYSQL_USER = os.getenv('MYSQL_USER', 'root')
    MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD', '')
    MYSQL_DB = os.getenv('MYSQL_DB', 'eapcet_colleges')
    MYSQL_PORT = int(os.getenv('MYSQL_PORT', 3306))

    @staticmethod
    def get_db_config():
        return {
            'host': Config.MYSQL_HOST,
            'user': Config.MYSQL_USER,
            'password': Config.MYSQL_PASSWORD,
            'database': Config.MYSQL_DB,
            'port': Config.MYSQL_PORT,
            'cursorclass': None,
        }
