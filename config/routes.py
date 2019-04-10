from app import app

from controllers import entries, categories, auth

app.register_blueprint(entries.api, url_prefix='/api')
app.register_blueprint(categories.api, url_prefix='/api')
app.register_blueprint(auth.api, url_prefix='/api')
