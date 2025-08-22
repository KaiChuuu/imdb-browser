# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
#
# from movie_bp import movie_bp
#
# app = Flask(__name__)
# app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://guest:ctu-relational@relational.fel.cvut.cz:3306/imdb_ijs"
# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
#
# db = SQLAlchemy(app)
#
# app.register_blueprint(movie_bp, url_prefix='/movie')
#
# if __name__ == '__main__':
#     app.run(debug=True)


# SsQjCjonkRlq2CAk

# from dotenv import load_dotenv
# import os
#
# import mysql.connector
#
# load_dotenv(".env")
#
# conn = mysql.connector.connect(
#     host=os.getenv("DB_HOST"),
#     port=os.getenv("DB_PORT"),
#     database=os.getenv("DB_NAME"),
#     user=os.getenv("DB_USER"),
#     password=os.getenv("DB_PASSWORD")
# )
#
# cursor = conn.cursor()
# cursor.execute("SELECT name FROM `movies` LIMIT 10;")
# rows = cursor.fetchall()
# for row in rows:
#     print(row)
#
# cursor.close()
# conn.close()