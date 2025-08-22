from . import bp
from .. import db

from flask import jsonify

@bp.route("/<int:movie_id>")
def get_movie(movie_id):
    # movie = Movie.query.get(movie_id)
    # return jsonify({"id": movie.id, "title": movie.title})
    pass