import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.pool import NullPool
from dotenv import load_dotenv

db = SQLAlchemy()
engine = None

def create_app():
    global engine

    # Load environment
    load_dotenv()
    USER = os.getenv("user")
    PASSWORD = os.getenv("password")
    HOST = os.getenv("host")
    PORT = os.getenv("port")
    DBNAME = os.getenv("dbname")

    DATABASE_URL = f"postgresql+psycopg2://{USER}:{PASSWORD}@{HOST}:{PORT}/{DBNAME}?sslmode=require"

    # Create Flask app
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Init extensions
    db.init_app(app)
    engine = create_engine(DATABASE_URL, poolclass=NullPool)

    # Register blueprints
    from .movies import bp as movies_bp
    app.register_blueprint(movies_bp, url_prefix="/movies")

    from .movie_details import bp as movie_details_bp
    app.register_blueprint(movie_details_bp)

    return app


# @app.route("/")
# def home():
#     return "Flask + Supabase is working!"
#
# @app.route("/time")
# def get_time():
#     """Example using raw engine"""
#     with engine.connect() as conn:
#         result = conn.execute(text("SELECT NOW();"))
#         current_time = result.scalar()
#     return jsonify({"time": str(current_time)})
#
# @app.route("/users")
# def get_users():
#     """Example using Flask-SQLAlchemy ORM"""
#     result = db.session.execute(text('SELECT "Series_Title" FROM "imdb-movies" LIMIT 5;'))
#     rows = [dict(row) for row in result]
#     return jsonify(rows)

# --- MAIN ENTRY ---
