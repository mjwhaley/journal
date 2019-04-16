import os

db_uri = os.getenv('DATABASE_URL', 'postgres://localhost:5432/entries')
secret = os.getenv('SECRET', 'ssh its a secret')
