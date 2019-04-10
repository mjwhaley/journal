from app import db, ma
from marshmallow import fields
from .base import BaseModel

class Category(db.Model, BaseModel):

    __tablename__ = 'categories'

    name = db.Column(db.String(40), unique=True, nullable=False)

class CategorySchema(ma.ModelSchema):
    categories = fields.Nested('EntrySchema', many=True, exclude=('categories',))
    class Meta:
        model = Category
