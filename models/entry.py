from app import db, ma
from marshmallow import fields
from models.category import Category
from .base import BaseModel
from .user import User, UserSchema

likes = db.Table(
    'likes',
    db.Column('entry_id', db.Integer, db.ForeignKey('entries.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'))
)

categories_entries = db.Table('categories_entries',
    db.Column('categories_id', db.Integer, db.ForeignKey('categories.id'), primary_key=True),
    db.Column('entries_id', db.Integer, db.ForeignKey('entries.id'), primary_key=True)
)

class Entry(db.Model, BaseModel):
    __tablename__ = 'entries'

    title = db.Column(db.String(80), nullable=False)
    mapLat = db.Column(db.Float(10), nullable=False)
    mapLng = db.Column(db.Float(10), nullable=False)
    tags = db.Column(db.String(80))
    description = db.Column(db.String, nullable=False)
    ispublic = db.Column(db.Boolean, nullable=False)
    header_image = db.Column(db.String(400), nullable=False)
    categories = db.relationship('Category', secondary=categories_entries, backref='entries')
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    creator = db.relationship('User', backref='created_entries')
    liked_by = db.relationship('User', secondary=likes, backref='likes')

class EntrySchema(ma.ModelSchema):
    comments = fields.Nested('CommentSchema', many=True, exclude=('entry',))
    categories = fields.Nested('CategorySchema', many=True)
    creator = fields.Nested('UserSchema', only=('id', 'username'))
    liked_by = fields.Nested('UserSchema', many=True, only=('id', 'username'))
    class Meta:
        model = Entry

class Comment(db.Model, BaseModel):

    __tabelname__ = 'comments'

    content = db.Column(db.Text, nullable=False)
    entry_id = db.Column(db.Integer, db.ForeignKey('entries.id'))
    entry = db.relationship('Entry', backref='comments')

class CommentSchema(ma.ModelSchema):
    class Meta:
        model = Comment
