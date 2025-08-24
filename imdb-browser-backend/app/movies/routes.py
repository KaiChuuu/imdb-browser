from . import bp
from .. import db

from sqlalchemy import text
from flask import jsonify

@bp.route("/random/<int:limit>")
def random_movies(limit):
    sql = text('SELECT "Series_Title", "Poster_Link", "Released_Year", "Runtime", "Genre", "IMDB_Rating", "Overview" '
               'FROM "imdb_movies" '
               'ORDER BY RANDOM() '
               'LIMIT :limit')

    result = db.session.execute(sql, {"limit": limit})
    rows = [dict(row) for row in result]
    return jsonify(rows)

@bp.route("/users")
def get_users():
    result = db.session.execute(text('SELECT "Series_Title" FROM "imdb_movies" LIMIT 5;'))
    rows = [dict(row) for row in result]
    return jsonify(rows)


@bp.route("/range/<int:start>/<int:end>")
def range_movies(start, end,):
    sql = ""
    result = db.session.execute(sql, {})
    movies = result.fetchall()

    pass