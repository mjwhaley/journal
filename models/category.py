from app import db, ma
from marshmallow import fields
from .base import BaseModel
from .user import User, UserSchema

class Category(db.Model, BaseModel):

    __tablename__ = 'categories'

    name = db.Column(db.String(40), unique=True, nullable=False)
    creator = db.relationship('User', backref='created_categories')
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'))

class CategorySchema(ma.ModelSchema):
    categories = fields.Nested('EntrySchema', many=True, exclude=('categories',))
    creator = fields.Nested('UserSchema', only=('id', 'username'))
    class Meta:
        model = Category
