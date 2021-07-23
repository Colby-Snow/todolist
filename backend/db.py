import psycopg2


def get_db_conn():
    return psycopg2.connect(
        host="localhost",
        database="directory",
        port=5432,
        user="colby-snow",
        password="admin"
    )
