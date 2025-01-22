from app import create_app
from app.models import db, Categoria

# Crear la aplicación
app = create_app()

# Función para insertar categorías por defecto
def insert_default_categories():
    categories = ['Comida', 'Transporte', 'Ocio', 'Renta', 'Salud', 'Otros']
    
    for category_name in categories:
        # Verifica si la categoría ya existe para evitar duplicados
        if not Categoria.query.filter_by(nombre=category_name).first():
            categoria = Categoria(nombre=category_name)
            db.session.add(categoria)
    
    # Commit para guardar los cambios
    db.session.commit()

# Ejecutar la inicialización de la base de datos y las categorías
with app.app_context():
    # Crear todas las tablas si no existen
    db.create_all()

    # Insertar las categorías predeterminadas
    insert_default_categories()

print("Database initialized and default categories inserted!")
