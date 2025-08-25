from . import bp
from .. import db

from sqlalchemy import text
from flask import jsonify

@bp.route("/<int:movie_title>")
def get_movie_details():

    pass