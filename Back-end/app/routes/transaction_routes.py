from flask import Blueprint, request, jsonify
from app.models import db, Transaction
from app.middleware import token_required 

transactions = Blueprint('transactions', __name__)

@transactions.route('/transactions', methods=['GET', 'POST'])
@token_required  
def handle_transactions(current_user):
    if request.method == 'GET':
        transactions = Transaction.query.filter_by(user_id=current_user.id).all()
        return jsonify([{
            'id': transaction.id,
            'description': transaction.description,
            'amount': transaction.amount,
            'user_id': transaction.user_id,
            'date': transaction.date
        } for transaction in transactions])
    
    if request.method == 'POST':
        # Crear una nueva transacción
        data = request.get_json()
        new_transaction = Transaction(
            description=data['description'],
            amount=data['amount'],
            user_id=current_user.id  # Usamos el current_user, no solo el id
        )
        db.session.add(new_transaction)
        db.session.commit()
        return jsonify({
            'id': new_transaction.id,
            'description': new_transaction.description,
            'amount': new_transaction.amount,
            'user_id': new_transaction.user_id,
            'date': new_transaction.date  # Asegúrate de incluir el campo 'date' si es necesario
        })

@transactions.route('/transactions/<int:id>', methods=['PUT'])
@token_required
def update_transaction(current_user, id):
    data = request.get_json()
    transaction = Transaction.query.get(id)
    if not transaction or transaction.user_id != current_user.id:
        return jsonify({'message': 'Transaction not found or not authorized'}), 404
    transaction.description = data['description']
    transaction.amount = data['amount']
    db.session.commit()
    return jsonify({
        'id': transaction.id,
        'description': transaction.description,
        'amount': transaction.amount,
        'user_id': transaction.user_id
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
