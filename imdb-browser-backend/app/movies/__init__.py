from flask import Blueprint

bp = Blueprint("movies", __name__)

from . import routes