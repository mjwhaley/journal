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

    entry1 = Entry(title='entry 1 title', description='entry 1 decription', mapLat=51.3865, mapLng=0.5095, public=False, header_image='https://images.unsplash.com/photo-1496672541024-d5ffffdfa045?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3070&q=80',
    categories=[hiking, kayaking], creator=matt, liked_by=[matt])
    entry2 = Entry(title='entry 2 title', description='entry 2 decription', mapLat=51.3865, mapLng=0.5095, public=True, header_image='https://images.unsplash.com/photo-1481391032119-d89fee407e44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80',
    categories=[hiking, sightseeing], creator=matt, liked_by=[matt])
    entry3 = Entry(title='entry 3 title', description='entry 3 decription', mapLat=51.3865, mapLng=0.5095, public=True, header_image='https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
    categories=[sightseeing], creator=matt, liked_by=[matt])
    entry4 = Entry(title='entry 4 title', description='entry 4 decription', mapLat=51.3865, mapLng=0.5095, public=False, header_image='https://images.unsplash.com/photo-1526819945808-268890ae8b32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
    categories=[relaxing], creator=matt, liked_by=[matt])
    entry5 = Entry(title='entry 5 title', description='entry 5 decription', mapLat=51.3865, mapLng=0.5095, public=False, header_image='https://images.unsplash.com/photo-1524654458049-e36be0721fa2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
    categories=[running, hiking], creator=matt, liked_by=[matt])
    entry6 = Entry(title='entry 6 title', description='entry 6 decription', mapLat=51.3865, mapLng=0.5095, public=False, header_image='https://images.unsplash.com/photo-1549383625-61676f103009?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80',
    categories=[biking, hiking], creator=matt, liked_by=[matt])

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
