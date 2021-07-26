from backend.db import get_db_conn
from psycopg2.extras import RealDictCursor


class TodoDatabase():
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
        INSERT INTO directory.public.todo_items (title, completed, deleted) 
         VALUES (%(title)s, %(completed)s, %(deleted)s)"""
        cursor.execute(query,
                       dict(title=new_item['title'],
                            completed=new_item['completed'],
                            deleted=new_item['deleted'])
                       )
        conn.commit()

    def delete(self, item_id):
        conn = get_db_conn()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        query = """
                UPDATE directory.public.todo_items SET deleted = true 
                 WHERE %(id)s = id"""
        cursor.execute(query,
                       dict(id=item_id)
                       )
        conn.commit()

    def complete(self, item):
        conn = get_db_conn()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        query = """
        UPDATE directory.public.todo_items SET completed = %(completed)s
            WHERE id = %(id)s"""
        cursor.execute(query,
                       dict(
                           id=item["id"],
                           completed=item["completed"]
                       ))
        conn.commit()

    def load_on_id(self, item_id):
        conn = get_db_conn()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        query = """
                SELECT * from directory.public.todo_items WHERE %(id)s = id
                """
        cursor.execute(query,
                       dict(
                           id=item_id
                       ))
        data = cursor.fetchall()
        return data