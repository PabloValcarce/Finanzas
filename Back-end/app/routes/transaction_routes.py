from flask import Blueprint, request, jsonify
from app.models import db, Transaction, Categoria
from app.middleware import token_required

transactions = Blueprint('transactions', __name__)

@transactions.route('/transactions', methods=['GET', 'POST'])
@token_required  
def handle_transactions(current_user):
    if request.method == 'GET':
        # Obtener todas las transacciones del usuario actual
        transactions = Transaction.query.filter_by(user_id=current_user.id).all()
        return jsonify([{
            'id': transaction.id,
            'description': transaction.description,
            'amount': transaction.amount,
            'date': transaction.date.isoformat() if transaction.date else None,
            'categoria': transaction.categoria.nombre if transaction.categoria else None  # Incluir la categoría
        } for transaction in transactions])
    
    if request.method == 'POST':
        # Crear una nueva transacción
        data = request.get_json()
                
       # Verificar si los campos requeridos existen en los datos
        if not data.get('description') or not data.get('amount'):
            return jsonify({'message': 'Description and amount are required'}), 400

        categoria_id = data.get('categoria_id')  # Obtener la categoría desde la solicitud
        
        # Verificar si la categoría existe
        categoria = Categoria.query.get(categoria_id) if categoria_id else None
        
        if categoria_id and not categoria:
            return jsonify({'message': 'Category not found'}), 404
        
        new_transaction = Transaction(
            description=data['description'],
            amount=data['amount'],
            user_id=current_user.id,  # Usar el current_user
            categoria_id=categoria.id if categoria else None  # Relación con la categoría
        )
        
        db.session.add(new_transaction)
        db.session.commit()

        # Retornar la nueva transacción con la categoría
        return jsonify({
            'id': new_transaction.id,
            'description': new_transaction.description,
            'amount': new_transaction.amount,
            'user_id': new_transaction.user_id,
            'date': new_transaction.date.isoformat() if new_transaction.date else None,
            'categoria': new_transaction.categoria.nombre if new_transaction.categoria else None  # Incluir la categoría
        }), 201

@transactions.route('/transactions/<int:id>', methods=['PUT'])
@token_required
def update_transaction(current_user, id):
    data = request.get_json()
    transaction = Transaction.query.get(id)

    if not transaction or transaction.user_id != current_user.id:
        return jsonify({'message': 'Transaction not found or not authorized'}), 404

    # Actualizar la transacción
    transaction.description = data['description']
    transaction.amount = data['amount']
    
    # Si se proporciona una categoría nueva, actualizarla
    if 'categoria_id' in data:
        categoria = Categoria.query.get(data['categoria_id'])
        if categoria:
            transaction.categoria = categoria
    
    db.session.commit()
    
    return jsonify({
        'id': transaction.id,
        'description': transaction.description,
        'amount': transaction.amount,
        'user_id': transaction.user_id,
        'date': transaction.date.isoformat() if transaction.date else None,
        'categoria': transaction.categoria.nombre if transaction.categoria else None  # Incluir categoría
    })

@transactions.route('/transactions/<int:id>', methods=['DELETE'])
@token_required
def delete_transaction(current_user, id):
    transaction = Transaction.query.get(id)
    
    if not transaction or transaction.user_id != current_user.id:
        return jsonify({'message': 'Transaction not found or not authorized'}), 404
    
    db.session.delete(transaction)
    db.session.commit()

    return jsonify({'message': 'Transaction deleted'})
