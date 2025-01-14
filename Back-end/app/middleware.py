# app/middleware.py
import jwt
from functools import wraps
from flask import request, jsonify
import os

def token_required(f):
    @wraps(f)  # Preserva los metadatos de la función original
    def decorator(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]  # Asumimos que el token tiene formato "Bearer <token>"
        
        if not token:
            return jsonify({"message": "Token is missing!"}), 401
        
        try:
            # Usamos la clave secreta desde una variable de entorno
            secret_key = os.getenv('SECRET_KEY', 'default_secret_key')  # 'default_secret_key' solo para desarrollo
            data = jwt.decode(token, secret_key, algorithms=['HS256'])
            current_user_id = data['user_id']
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired!"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Token is invalid!"}), 401
        
        return f(current_user_id, *args, **kwargs)
    
    return decorator
