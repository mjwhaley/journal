from app import app, db

from models.entry import Entry, Comment
from models.category import Category
from models.user import UserSchema
user_schema = UserSchema()

with app.app_context():
    db.drop_all()
    db.create_all()

    matthewwhaley, errors = user_schema.load({
		'username': 'matthewwhaley',
		'email': 'matt@email',
		'password': 'password',
		'password_confirmation': 'password'
    })

    if errors:
        raise Exception(errors)

    db.session.add(matthewwhaley)

    hiking = Category(name='hiking', creator=matthewwhaley)
    kayaking = Category(name='kayaking', creator=matthewwhaley)
    sightseeing = Category(name='sightseeing', creator=matthewwhaley)
    relaxing = Category(name='relaxing', creator=matthewwhaley)
    running = Category(name='running', creator=matthewwhaley)
    biking = Category(name='biking', creator=matthewwhaley)
    wakeskating = Category(name='wakeskating', creator=matthewwhaley)
    skateboarding = Category(name='skateboarding', creator=matthewwhaley)

    entry1 = Entry(
    title='Amazing trek up a mountain',
    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sapien neque, placerat ac lacus sed, pulvinar dictum justo. Donec et turpis ipsum. Pellentesque a elementum nibh. Etiam placerat massa eu nulla consequat, eu malesuada odio lobortis. In condimentum pulvinar augue sed consequat. Donec sit amet velit et augue euismod rutrum. Nullam at feugiat quam. Etiam in maximus augue. Cras non malesuada odio.',
    mapLat=51.3865,
    mapLng=0.5095,
    ispublic=False,
    header_image='https://images.unsplash.com/photo-1496672541024-d5ffffdfa045?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3070&q=80',
    categories=[hiking, sightseeing],
    creator=matthewwhaley,
    liked_by=[matthewwhaley]
    )

    entry2 = Entry(
    title='Skateboarding at dorney lake',
    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sapien neque, placerat ac lacus sed, pulvinar dictum justo. Donec et turpis ipsum. Pellentesque a elementum nibh. Etiam placerat massa eu nulla consequat, eu malesuada odio lobortis. In condimentum pulvinar augue sed consequat. Donec sit amet velit et augue euismod rutrum. Nullam at feugiat quam. Etiam in maximus augue. Cras non malesuada odio.',
    mapLat=51.3865,
    mapLng=0.5095,
    ispublic=True,
    header_image='https://images.unsplash.com/photo-1481391032119-d89fee407e44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80',
    categories=[skateboarding],
    creator=matthewwhaley,
    liked_by=[matthewwhaley]
    )

    entry3 = Entry(
    title='Kayaking looking for seals',
    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sapien neque, placerat ac lacus sed, pulvinar dictum justo. Donec et turpis ipsum. Pellentesque a elementum nibh. Etiam placerat massa eu nulla consequat, eu malesuada odio lobortis. In condimentum pulvinar augue sed consequat. Donec sit amet velit et augue euismod rutrum. Nullam at feugiat quam. Etiam in maximus augue. Cras non malesuada odio.',
    mapLat=51.3865,
    mapLng=0.5095,
    ispublic=True,
    header_image='https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
    categories=[kayaking, sightseeing],
    creator=matthewwhaley,
    liked_by=[matthewwhaley]
    )

    entry4 = Entry(
    title='Running the OMM',
    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sapien neque, placerat ac lacus sed, pulvinar dictum justo. Donec et turpis ipsum. Pellentesque a elementum nibh. Etiam placerat massa eu nulla consequat, eu malesuada odio lobortis. In condimentum pulvinar augue sed consequat. Donec sit amet velit et augue euismod rutrum. Nullam at feugiat quam. Etiam in maximus augue. Cras non malesuada odio.',
    mapLat=51.3865,
    mapLng=0.5095,
    ispublic=False,
    header_image='https://images.unsplash.com/photo-1526819945808-268890ae8b32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
    categories=[running, hiking],
    creator=matthewwhaley,
    liked_by=[matthewwhaley]
    )

    entry5 = Entry(
    title='Wakeskating in France',
    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sapien neque, placerat ac lacus sed, pulvinar dictum justo. Donec et turpis ipsum. Pellentesque a elementum nibh. Etiam placerat massa eu nulla consequat, eu malesuada odio lobortis. In condimentum pulvinar augue sed consequat. Donec sit amet velit et augue euismod rutrum. Nullam at feugiat quam. Etiam in maximus augue. Cras non malesuada odio.',
    mapLat=51.3865,
    mapLng=0.5095,
    ispublic=False,
    header_image='https://images.unsplash.com/photo-1524654458049-e36be0721fa2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
    categories=[wakeskating],
    creator=matthewwhaley,
    liked_by=[matthewwhaley])

    entry6 = Entry(
    title='Hiking in the welsh mountians',
    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sapien neque, placerat ac lacus sed, pulvinar dictum justo. Donec et turpis ipsum. Pellentesque a elementum nibh. Etiam placerat massa eu nulla consequat, eu malesuada odio lobortis. In condimentum pulvinar augue sed consequat. Donec sit amet velit et augue euismod rutrum. Nullam at feugiat quam. Etiam in maximus augue. Cras non malesuada odio.',
    mapLat=51.3865,
    mapLng=0.5095,
    ispublic=False,
    header_image='https://images.unsplash.com/photo-1549383625-61676f103009?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80',
    categories=[hiking, sightseeing],
    creator=matthewwhaley,
    liked_by=[matthewwhaley]
    )

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
    db.session.add(wakeskating)
    db.session.add(skateboarding)
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
