from flask import Blueprint, request, jsonify, g
from models.category import Category, CategorySchema
from lib.secure_route import secure_route

api = Blueprint('categories', __name__)

categories_schema = CategorySchema()

#Show all
@api.route('/categories', methods=['GET'])
def index():
    categories = Category.query.all()

    return categories_schema.jsonify(categories, many=True), 200
#Show by id
@api.route('/categories/<int:category_id>', methods=['GET'])
def show(category_id):
    category = Category.query.get(category_id)
    return categories_schema.jsonify(category), 200
#Create
@api.route('/categories', methods=['POST'])
@secure_route
def create():
    data = request.get_json()
    category, errors = categories_schema.load(data)
    if errors:
        return jsonify(errors), 422
    category.creator = g.current_user
    category.save()
    return categories_schema.jsonify(category)
#Edit
@api.route('/categories/<int:category_id>', methods=['PUT'])
@secure_route
def update(category_id):
    category = Category.query.get(category_id)
    category, errors = categories_schema.load(request.get_json(), instance=category, partial=True)

    if errors:
        return jsonify(errors), 422
    if category.creator != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401
    category.save()
    return categories_schema.jsonify(category)

#Delete by id
@api.route('/categories/<int:category_id>', methods=['DELETE'])
@secure_route
def delete(category_id):
    category = Category.query.get(category_id)
    category.remove()
    return '', 204
#Delete all
@api.route('/categories', methods=['DELETE'])
@secure_route
def delete_all():
    categories = Category.query.all()
    for category in categories:
        category.remove()
    return '', 204
