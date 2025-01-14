from flask import Flask
from flask_cors import CORS
from app.models import db
from config import Config

def create_app():
    app = Flask(__name__)
    
    app.config.from_object(Config)
    
    db.init_app(app)
    CORS(app)  
    
    from app.routes.main_routes import main
    from app.routes.auth_routes import auth
    from app.routes.transaction_routes import transactions

    app.register_blueprint(main)
    app.register_blueprint(auth, url_prefix='/auth')
    app.register_blueprint(transactions, url_prefix='/api/transactions') 

    return app
