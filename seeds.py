from app import app, db

from models.entry import Entry, Comment
from models.category import Category
from models.user import UserSchema
user_schema = UserSchema()

with app.app_context():
    db.drop_all()
    db.create_all()

    matt, errors = user_schema.load({
		'username': 'matt',
		'email': 'matt@email',
		'password': 'password',
		'password_confirmation': 'password'
    })

    if errors:
        raise Exception(errors)

    db.session.add(matt)

    hiking = Category(name='hiking', creator=matt)
    kayaking = Category(name='kayaking', creator=matt)
    sightseeing = Category(name='sightseeing', creator=matt)
    relaxing = Category(name='relaxing', creator=matt)
    running = Category(name='running', creator=matt)
    biking = Category(name='biking', creator=matt)

    entry1 = Entry(title='entry 1 title', description='entry 1 decription', mapLocation='400', public=False, header_image='bbc.com',
    categories=[hiking, kayaking], creator=matt, liked_by=[matt])
    entry2 = Entry(title='entry 2 title', description='entry 2 decription', mapLocation='400', public=True, header_image='bbc.com',
    categories=[hiking, sightseeing])
    entry3 = Entry(title='entry 3 title', description='entry 3 decription', mapLocation='400', public=True, header_image='bbc.com',
    categories=[sightseeing])
    entry4 = Entry(title='entry 4 title', description='entry 4 decription', mapLocation='400', public=False, header_image='bbc.com',
    categories=[relaxing], creator=matt)
    entry5 = Entry(title='entry 5 title', description='entry 5 decription', mapLocation='400', public=False, header_image='bbc.com',
    categories=[running, hiking])
    entry6 = Entry(title='entry 6 title', description='entry 6 decription', mapLocation='400', public=False, header_image='bbc.com',
    categories=[biking, hiking])

    comment1 = Comment(content='Love this post', entry=entry1)
    comment2 = Comment(content='Love this post', entry=entry2)
    comment3 = Comment(content='Love this post', entry=entry3)
    comment4 = Comment(content='Love this post', entry=entry4)
    comment5 = Comment(content='Love this post', entry=entry5)
    comment6 = Comment(content='Love this post', entry=entry6)

    db.session.add(hiking)
    db.session.add(kayaking)
    db.session.add(sightseeing)
    db.session.add(relaxing)
    db.session.add(running)
    db.session.add(biking)
    db.session.add(entry1)
    db.session.add(entry2)
    db.session.add(entry3)
    db.session.add(entry4)
    db.session.add(entry5)
    db.session.add(entry6)
    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)

    db.session.commit()

    # test with pipenv python seeds.py
    # shell in to db. psql name. Then select *
