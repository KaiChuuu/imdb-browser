from . import bp
from .. import db

from sqlalchemy import text
from flask import request, jsonify

@bp.route("/<int:movie_id>")
def get_movie_details(movie_id):
    sql = text(
        'SELECT "Series_Title", "row_id", "Poster_Link", "Released_Year", "Runtime", '
        '"Genre", "IMDB_Rating", "Overview", "Certificate", "Meta_score", '
        '"Director", "Star1", "Star2", "Star3", "Star4", "No_of_Votes", "Gross" '
        'FROM "imdb_movies" '
        'WHERE "row_id" = :movie_id'
    )
    result = db.session.execute(sql, {"movie_id": movie_id}).mappings().first()
    if not result:
        return jsonify({"error": "Movie not found"}), 404
    return jsonify(dict(result))

@bp.route("/<int:movie_id>/similar/<int:limit>")
def similar_movies(movie_id, limit):
    genres = request.args.get("genre")

    query = '''SELECT "Genre", "Series_Title", "row_id", "Poster_Link", "Released_Year", "IMDB_Rating"
                FROM "imdb_movies"
                WHERE "row_id" != :movie_id'''

    params = {"limit": limit, "movie_id": movie_id}

    if genres:
        query += ' AND "Genre" ILIKE :genres'
        params["genres"] = f"%{genres}%"

    query += " LIMIT :limit"
    sql = text(query)

    result = db.session.execute(sql, params)
    rows = [dict(r) for r in result.mappings()]
    return jsonify(rows)

@bp.route("/search/<string:movie_title>")
def search_movie_title(movie_title):
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    offset = (page - 1) * limit

    query = text("""
            SELECT "Genre", "Series_Title", "row_id", "Poster_Link", "Released_Year", "IMDB_Rating", COUNT(*) OVER() AS "total_count"
            FROM "imdb_movies" 
            WHERE "Series_Title" ILIKE :title
            LIMIT :limit OFFSET :offset
        """)

    params = {"limit": limit, "offset": offset, "title": f"%{movie_title}%"}

    result = db.session.execute(query, params)
    rows = [dict(r) for r in result.mappings()]

    total = rows[0]["total_count"] if rows else 0
    for row in rows:
        row.pop("total_count", None)

    return jsonify({
        "total": total,
        "movies": rows
    })