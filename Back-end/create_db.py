from app import create_app
from app.models import db, Categoria, Transaction
from datetime import datetime, timedelta, timezone
import random

# Crear la aplicación
app = create_app()

# Función para insertar categorías por defecto
def insert_default_categories():
    categories = ['Comida', 'Transporte', 'Ocio', 'Inversion', 'Renta', 'Salud', 'Otros']
    
    for category_name in categories:
        # Verifica si la categoría ya existe para evitar duplicados
        if not Categoria.query.filter_by(nombre=category_name).first():
            categoria = Categoria(nombre=category_name)
            db.session.add(categoria)
    
    # Commit para guardar los cambios
    db.session.commit()

# Función para insertar transacciones por defecto
def insert_default_transactions():
    # Obtén todas las categorías para asignarlas a las transacciones
    categorias = Categoria.query.all()
    if not categorias:
        print("No hay categorías para asignar a las transacciones.")
        return
    
    # Fecha inicial: primer día del año actual
    now = datetime.now(timezone.utc)
    year = now.year
    start_of_year = datetime(year, 1, 1, tzinfo=timezone.utc)
    
    # Crear al menos una transacción para cada mes
    for month in range(12):
        # Generar una fecha aleatoria dentro del mes actual
        first_day_of_month = start_of_year + timedelta(days=month * 30)
        random_day_in_month = first_day_of_month + timedelta(days=random.randint(0, 27))
        
        # Generar transacciones aleatorias con montos positivos y negativos
        for _ in range(random.randint(1, 3)):  # Entre 1 y 3 transacciones por mes
            categoria = random.choice(categorias)
            amount = round(random.uniform(-500, 500), 2)  # Monto entre -500 y 500
            description = f"Transacción {random.randint(1000, 9999)}"
            
            nueva_transaccion = Transaction(
                description=description,
                amount=amount,
                user_id=1,  # Ajusta según el ID de usuario
                date=random_day_in_month,
                categoria_id=categoria.id
            )
            db.session.add(nueva_transaccion)
    
    # Commit para guardar los cambios
    db.session.commit()

# Ejecutar la inicialización de la base de datos, categorías y transacciones
with app.app_context():
    # Crear todas las tablas si no existen
    db.create_all()

    # Insertar las categorías predeterminadas
    insert_default_categories()

    # Insertar las transacciones predeterminadas
    insert_default_transactions()

print("Database initialized, default categories and transactions inserted!")
