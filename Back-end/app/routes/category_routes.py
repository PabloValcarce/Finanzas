from flask import Blueprint, jsonify
from app.models import Categoria

category_routes = Blueprint('categories', __name__)

@category_routes.route('/categories', methods=['GET'])
def get_categories():
    categories = Categoria.query.all()
    return jsonify([{'id': cat.id, 'nombre': cat.nombre} for cat in categories])
