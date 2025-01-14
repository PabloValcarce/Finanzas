from flask import Blueprint, request, jsonify
from app.models import db, Transaction
from app.middleware import token_required

transactions = Blueprint('transactions', __name__)

@transactions.route('/transactions', methods=['GET', 'POST'])
@token_required
def handle_transactions(current_user_id):
    if request.method == 'GET':
        # Manejar solicitudes GET
        transactions = Transaction.query.filter_by(user_id=current_user_id).all()
        return jsonify([{
            'id': transaction.id,
            'description': transaction.description,
            'amount': transaction.amount,
            'user_id': transaction.user_id
        } for transaction in transactions])
    
    if request.method == 'POST':
        # Manejar solicitudes POST
        data = request.get_json()
        new_transaction = Transaction(
            description=data['description'],
            amount=data['amount'],
            user_id=current_user_id
        )
        db.session.add(new_transaction)
        db.session.commit()
        return jsonify({
            'id': new_transaction.id,
            'description': new_transaction.description,
            'amount': new_transaction.amount,
            'user_id': new_transaction.user_id
        })

@transactions.route('/transactions/<int:id>', methods=['PUT'])
@token_required
def update_transaction(current_user_id, id):
    data = request.get_json()
    transaction = Transaction.query.get(id)
    if not transaction or transaction.user_id != current_user_id:
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
def delete_transaction(current_user_id, id):
    transaction = Transaction.query.get(id)
    if not transaction or transaction.user_id != current_user_id:
        return jsonify({'message': 'Transaction not found or not authorized'}), 404
    db.session.delete(transaction)
    db.session.commit()
    return jsonify({'message': 'Transaction deleted'})
