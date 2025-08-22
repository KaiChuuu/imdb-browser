from flask import Blueprint

bp = Blueprint("movie_detail", __name__)

from . import routes