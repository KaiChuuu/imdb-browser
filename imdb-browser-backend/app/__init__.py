import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    load_dotenv()

    # configure connection string
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DB_URI")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    # register blueprints
    from .movies import bp as movies_bp
    app.register_blueprint(movies_bp, url_prefix="/movies")

    from .movie_details import bp as movie_details_bp
    app.register_blueprint(movie_details_bp)

    return app