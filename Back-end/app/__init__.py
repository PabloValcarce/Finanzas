from flask import Flask
from flask_cors import CORS
from app.models import db
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    CORS(app)  # Habilitar CORS para toda la aplicación

    # Registrar rutas
    from app.routes import main
    from app.auth_routes import auth
    app.register_blueprint(main)
    app.register_blueprint(auth, url_prefix='/auth')

    return app
