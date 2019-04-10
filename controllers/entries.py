from flask import Blueprint, request, jsonify, g

from models.entry import Entry, EntrySchema, CommentSchema, Comment
from models.category import Category

from lib.secure_route import secure_route

api = Blueprint('entries', __name__)
entry_schema = EntrySchema()
comment_schema = CommentSchema()

# Index Route
@api.route('/entries', methods=['GET'])
def index():
    entries = Entry.query.all()
    return entry_schema.jsonify(entries, many=True), 200

# Show Route
@api.route('/entries/<int:entry_id>', methods=['GET'])
def show(entry_id):
    entry = Entry.query.get(entry_id)
    return entry_schema.jsonify(entry), 200
#Create
@api.route('/entries', methods=['POST'])
@secure_route
def create():
    data = request.get_json()
    entry, errors = entry_schema.load(data)
    if errors:
        return jsonify(errors), 422
    category = Category.query.get(data['entry_id'])
    entry.creator = g.current_user
    entry.categories.append(category)
    entry.save()
    return entry_schema.jsonify(entry)
#Edit
@api.route('/entries/<int:entry_id>', methods=['PUT'])
@secure_route
def update(entry_id):
    entry = Entry.query.get(entry_id)
    entry, errors = entry_schema.load(request.get_json(), instance=entry, partial=True)

    if errors:
        return jsonify(errors), 422
    if entry.creator != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401
    entry.save()
    return entry_schema.jsonify(entry)
#Delete by id
@api.route('/entries/<int:entry_id>', methods=['DELETE'])
@secure_route
def delete(entry_id):
    entry = Entry.query.get(entry_id)
    entry.remove()
    return '', 204
#Delete all
@api.route('/entries', methods=['DELETE'])
@secure_route
def delete_all():
    entries = Entry.query.all()
    for entry in entries:
        entry.remove()
    return '', 204

#Create Comment by entry
@api.route('/entries/<int:entry_id>/comments', methods=['POST'])
@secure_route
def comment_create(entry_id):
    data = request.get_json()
    entry = Entry.query.get(entry_id)
    comment, errors = comment_schema.load(data)
    if errors:
        return jsonify(errors), 422
    comment.entry = entry
    comment.save()
    return comment_schema.jsonify(comment)
#Delete a comment on a entry
@api.route('/entries/<int:entry_id>/comments/<int:comments_id>', methods=['DELETE'])
@secure_route
def comment_delete(**kwargs):
    comment = Comment.query.get(kwargs['comments_id'])
    comment.remove()
    return '', 204
#likes
@api.route('/entries/<int:entry_id>/like', methods=['PUT'])
@secure_route
def like(entry_id):
    entry = Entry.query.get(entry_id)
    user = g.current_user
    entry.liked_by.append(user)
    entry.save()
    return entry_schema.jsonify(entry), 201
