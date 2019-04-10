from app import app

from controllers import entries, category, auth

app.register_blueprint(entries.api, url_prefix='/api')
app.register_blueprint(category.api, url_prefix='/api')
app.register_blueprint(auth.api, url_prefix='/api')
