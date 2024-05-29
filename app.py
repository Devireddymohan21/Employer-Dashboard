import tornado.ioloop
import tornado.web
import json
import pymysql.cursors

def get_connection():
    return pymysql.connect(
        host='localhost',
        user='root',
        password="Saimohan@18",
        db='employer_db',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

class BaseHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "http://localhost:3000")
        self.set_header("Access-Control-Allow-Headers", "Content-Type")
        self.set_header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")

    def options(self, *args, **kwargs):
        # Set status 204 (No Content) for preflight requests
        self.set_status(204)
        self.finish()


class MainHandler(BaseHandler):
    def get(self):
        self.write("Employer Dashboard API")

class EmployeeHandler(BaseHandler):
    def get(self, username=None):
        try:
            conn = get_connection()
            with conn.cursor() as cursor:
                if username:
                    sql = "SELECT * FROM employees WHERE name = %s"
                    cursor.execute(sql, (username,))
                    result = cursor.fetchone()  # Fetch a single record
                else:
                    sql = "SELECT * FROM employees"
                    cursor.execute(sql)
                    result = cursor.fetchall()
                if result:
                    self.write(json.dumps(result))
                else:
                    self.set_status(404)
                    self.write({"error": "Employee not found"})
        except Exception as e:
            self.set_status(500)
            self.write({"error": str(e)})
        finally:
            conn.close()

    def post(self):
        try:
            data = json.loads(self.request.body)
            name = data['name']
            position = data['position']
            conn = get_connection()
            with conn.cursor() as cursor:
                sql = "INSERT INTO employees (name, position) VALUES (%s, %s)"
                cursor.execute(sql, (name, position))
                conn.commit()
                self.write({"message": "Employee added successfully"})
        except Exception as e:
            self.set_status(500)
            self.write({"error": str(e)})
        finally:
            conn.close()

    def delete(self, id):
        try:
            conn = get_connection()
            with conn.cursor() as cursor:
                sql = "DELETE FROM employees WHERE id = %s"
                cursor.execute(sql, (id,))
                conn.commit()
                self.write({"message": "Employee deleted successfully"})
        except Exception as e:
            self.set_status(500)
            self.write({"error": str(e)})
        finally:
            conn.close()

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/api/employees", EmployeeHandler),
        (r"/api/employees/([0-9]+)", EmployeeHandler),
        (r"/api/employees/(.+)", EmployeeHandler),  # This handles username-based queries
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    print("Server is running on http://localhost:8888")
    tornado.ioloop.IOLoop.current().start()
