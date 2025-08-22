from . import bp
from .. import db

from flask import jsonify

@bp.route("/random/<int:limit>")
def random_movies(limit):
    sql = ("SELECT * "
           "FROM movies "
           "ORDER BY RAND() "
           "LIMIT :limit")
    result = db.session.execute(sql, {"limit": limit})
    movies = result.fetchall()

    return jsonify([{"id": m.id, "name": m.name, "year": m.year} for m in movies])


@bp.route("/range/<int:start>/<int:end>")
def range_movies(start, end,):
    sql = ""
    result = db.session.execute(sql, {})
    movies = result.fetchall()

    pass