from backend.db import get_db_conn
from psycopg2.extras import RealDictCursor


class PeopleDatabase():
    def load(self):
        conn = get_db_conn()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        query = """
        SELECT * from directory.public.todo_items
        """
        cursor.execute(query)
        data = cursor.fetchall()
        return data

    def save(self, new_item):
        conn = get_db_conn()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        query = """
        INSERT INTO directory.public.people (title, id, completed, deleted) 
         VALUES (%(title)s, %(id)s, %(completed)s, %(deleted)s)"""
        cursor.execute(query,
                       dict(name=new_item['name'],
                            id=new_item['id'],
                            completed=new_item['completed'],
                            deleted=new_item['deleted'])
                       )
        conn.commit()