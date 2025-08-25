from . import bp
from .. import db

from sqlalchemy import text
from flask import request, jsonify

@bp.route("/random/<int:limit>")
def random_movies(limit):
    sql = text('SELECT "Series_Title", "row_id", "Poster_Link", "Released_Year", "Runtime", "Genre", "IMDB_Rating", "Overview" '
               'FROM "imdb_movies" '
               'ORDER BY RANDOM() '
               'LIMIT :limit')

    result = db.session.execute(sql, {"limit": limit})
    rows = [dict(row) for row in result]
    return jsonify(rows)

@bp.route("/")
def range_movies():
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    offset = (page - 1) * limit

    genre = request.args.get("genre")
    year = request.args.get("year")
    rating = request.args.get("rating")
    sort_by = request.args.getlist("sort")

    query = '''SELECT "Series_Title", "row_id", "Poster_Link", "Released_Year", "IMDB_Rating"
            FROM "imdb_movies"
            WHERE 1=1'''

    params = {"limit": limit, "offset": offset}

    # Filters
    if genre:
        query += ' AND "Genre" ILIKE :genre'
        params["genre"] = f"%{genre}%"

    if year:
        query += ' AND "Released_Year" = :year'
        params["year"] = year

    if rating:
        query += ' AND "IMDB_Rating" >= :rating'
        params["rating"] = rating

    # Sorting
    order_clauses = []
    for s in sort_by:
        col, _, direction = s.partition(":")

        # default sorting if empty is ASC
        direction = direction.upper() if direction else "ASC"

        if col == "year":
            order_clauses.append(f'"Released_Year" {direction}')
        elif col == "rating":
            order_clauses.append(f'"IMDB_Rating" {direction}')

    if order_clauses:
        query += " ORDER BY " + ", ".join(order_clauses)

    query += " LIMIT :limit OFFSET :offset"

    sql = text(query)
    result = db.session.execute(sql, params)
    rows = [dict(row) for row in result]

    return jsonify(rows)