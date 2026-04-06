from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from models import db,Customer, Worker, WorkQuery, Response  # Replace 'your_module' with the actual module name
from flask_cors import CORS
from flask_migrate import Migrate
from datetime import datetime


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'  # Example for SQLite
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#db = SQLAlchemy(app)
@app.teardown_appcontext
def shutdown_session(exception=None):
    db.session.remove()
# Initialize the database
db.init_app(app)

# Initialize Flask-Migrate
# migrate = Migrate(app, db)

@app.route('/')
def home():
    return "Welcome to the Work Query Platform!"

# Customer Registration
@app.route('/customers', methods=['POST'])
def register_customer():
    data = request.get_json()
    new_customer = Customer(
        email=data['email'],
        first_name=data['first_name'],
        last_name=data['last_name'],
        password=data['password'],  # Remember to hash this
        mobile_number=data['mobile_number'],
        address=data['address'],
        city=data['city'],
        state=data['state'],
        pincode=data['pincode']
    )
    db.session.add(new_customer)
    db.session.commit()
    return jsonify({'message': 'Customer registered successfully!'}), 201

# Customer Login
@app.route('/customers/login', methods=['POST'])
def login_customer():
    data = request.get_json()
    customer = Customer.query.filter_by(email=data['email']).first()
    if customer and customer.password == data['password']:  # Remember to check hashed password
        return jsonify({'message': 'Login successful!'}), 200
    return jsonify({'message': 'Invalid credentials!'}), 401

# View Customer Profile
@app.route('/customers/<string:email>', methods=['GET'])
def view_customer_profile(email):
    customer = Customer.query.filter_by(email=email).first()
    if customer:
        return jsonify({
            'email': customer.email,
            'first_name': customer.first_name,
            'last_name': customer.last_name,
            'mobile_number': customer.mobile_number,
            'address': customer.address,
            'city': customer.city,
            'state': customer.state,
            'pincode': customer.pincode
        }), 200
    return jsonify({'message': 'Customer not found!'}), 404

# Edit Customer Profile
@app.route('/customers/<string:email>', methods=['PUT'])
def edit_customer_profile(email):
    data = request.get_json()
    customer = Customer.query.filter_by(email=email).first()
    if customer:
        customer.first_name = data.get('first_name', customer.first_name)
        customer.last_name = data.get('last_name', customer.last_name)
        customer.mobile_number = data.get('mobile_number', customer.mobile_number)
        customer.address = data.get('address', customer.address)
        customer.city = data.get('city', customer.city)
        customer.state = data.get('state', customer.state)
        customer.pincode = data.get('pincode', customer.pincode)

        db.session.commit()
        return jsonify({'message': 'Profile updated successfully!'}), 200
    return jsonify({'message': 'Customer not found!'}), 404

# Add Work Query
@app.route('/work_queries', methods=['POST'])
def add_work_query():
    data = request.get_json()

    # Convert string dates to date objects
    start_date = datetime.strptime(data['start_date'], '%Y-%m-%d').date()
    end_date = datetime.strptime(data['end_date'], '%Y-%m-%d').date()

    new_query = WorkQuery(
        customer_email=data['customer_email'],
        description=data['description'],
        start_date=start_date,
        end_date=end_date,
        budget=float(data['budget']),  # Ensure budget is a float
        work=data['work'],
        category=data['category']
    )
    
    db.session.add(new_query)
    db.session.commit()
    return jsonify({'message': 'Work query added successfully!'}), 201

#Delete a query
@app.route('/work_queries/<int:work_id>', methods=['DELETE'])
def delete_work_query(work_id):
    # Find the work query by its work_id
    work_query = WorkQuery.query.get(work_id)
    
    # Check if the work query exists
    if not work_query:
        return jsonify({'message': 'Work query not found!'}), 404
    
    # Check if there are any associated responses and delete them
    if work_query.responses:
        db.session.delete(work_query.responses)  # Delete associated response

    # Delete the work query itself
    db.session.delete(work_query)
    db.session.commit()
    
    return jsonify({'message': f'Work query with ID {work_id} and its associated response has been deleted successfully!'}), 200



# View Work Queries for Customer
@app.route('/customers/<string:customer_email>/work_queries', methods=['GET'])
def view_work_queries(customer_email):
    # Perform a left join between WorkQuery, Response, and Worker tables
    queries = db.session.query(WorkQuery, Response, Worker).\
        outerjoin(Response, Response.work_id == WorkQuery.work_id).\
        outerjoin(Worker, Worker.email == Response.worker_email).\
        filter(WorkQuery.customer_email == customer_email).\
        all()
    
    # Prepare the result with all fields from WorkQuery, Response, and Worker
    result = []
    for query, response, worker in queries:
        query_data = {
            'work_id': query.work_id,
            'customer_email': query.customer_email,
            'description': query.description,
            'start_date': query.start_date.isoformat() if query.start_date else None,
            'end_date': query.end_date.isoformat() if query.end_date else None,
            'budget': query.budget,
            'work': query.work,
            'category': query.category,
            'status': query.status,
            'created_at': query.created_at.isoformat() if query.created_at else None,
            
            # Worker details (could be None if no response exists)
            'worker': {
                'first_name': worker.first_name if worker else None,
                'last_name': worker.last_name if worker else None,
                'email': worker.email if worker else None,
                'mobile_number': worker.mobile_number if worker else None
            },
            # Response details (could be None if no response exists)
            'response': {
                'response_id': response.response_id if response else None,
                'worker_email': response.worker_email if response else None,
                'status': response.status if response else None,
                'rating': response.rating if response else None,
                'feedback': response.feedback if response else None
            }
        }
        result.append(query_data)

    # Return the list of work queries along with worker details as JSON
    return jsonify(result), 200


# Worker Registration
@app.route('/workers', methods=['POST'])
def register_worker():
    data = request.get_json()
    new_worker = Worker(
        email=data['email'],
        first_name=data['first_name'],
        last_name=data['last_name'],
        password=data['password'],  # Remember to hash this
        mobile_number=data['mobile_number'],
        profession=data['profession'],
        city=data['city'],
        state=data['state'],
        pincode=data['pincode']
    )
    db.session.add(new_worker)
    db.session.commit()
    return jsonify({'message': 'Worker registered successfully!'}), 201

# Worker Login
@app.route('/workers/login', methods=['POST'])
def login_worker():
    data = request.get_json()
    worker = Worker.query.filter_by(email=data['email']).first()
    if worker and worker.password == data['password']:  # Remember to check hashed password
        return jsonify({'message': 'Login successful!'}), 200
    return jsonify({'message': 'Invalid credentials!'}), 401

# View Worker Profile
@app.route('/workers/<string:email>', methods=['GET'])
def view_worker_profile(email):
    worker = Worker.query.filter_by(email=email).first()
    if worker:
        return jsonify({
            'email': worker.email,
            'first_name': worker.first_name,
            'last_name': worker.last_name,
            'mobile_number': worker.mobile_number,
            'profession': worker.profession,
            'city': worker.city,
            'state': worker.state,
            'pincode': worker.pincode
        }), 200
    return jsonify({'message': 'Worker not found!'}), 404

# Edit Worker Profile
@app.route('/workers/<string:email>', methods=['PUT'])
def edit_worker_profile(email):
    data = request.get_json()
    worker = Worker.query.filter_by(email=email).first()
    if worker:
        worker.first_name = data.get('first_name', worker.first_name)
        worker.last_name = data.get('last_name', worker.last_name)
        worker.mobile_number = data.get('mobile_number', worker.mobile_number)
        worker.profession = data.get('profession', worker.profession)
        worker.city = data.get('city', worker.city)
        worker.state = data.get('state', worker.state)
        worker.pincode = data.get('pincode', worker.pincode)

        db.session.commit()
        return jsonify({'message': 'Profile updated successfully!'}), 200
    return jsonify({'message': 'Worker not found!'}), 404

# View Nearby Queries
@app.route('/workers/<string:worker_email>/nearby_queries', methods=['GET'])
def view_nearby_queries(worker_email):
    worker = Worker.query.filter_by(email=worker_email).first()
    if not worker:
        return jsonify({'message': 'Worker not found!'}), 404

    # Fetch the work queries based on the worker's city
    queries = WorkQuery.query.join(Customer).filter(Customer.city == worker.city).filter(WorkQuery.category==worker.profession).all()

    # Create a list of dictionaries with all columns for each query
    result = []
    for query in queries:
        query_data = {
            'work_id': query.work_id,
            'customer_email': query.customer_email,
            'description': query.description,
            'start_date': query.start_date.isoformat() if query.start_date else None,
            'end_date': query.end_date.isoformat() if query.end_date else None,
            'budget': query.budget,
            'work': query.work,
            'category': query.category,
            'status': query.status,
            'created_at': query.created_at.isoformat() if query.created_at else None,
            'address': query.customer.address
            
        }
        result.append(query_data)

    # Return the list of work queries as JSON
    return jsonify(result), 200


# Accept to a Work Query
@app.route('/<int:work_id>/accept', methods=['PATCH','POST'])
def accept_work_query(work_id):
    # Fetch the work query by ID
    query = WorkQuery.query.get(work_id)
    if not query:
        return jsonify({'message': 'Work request not found!'}), 404

    # Check if the status is already 'Accepted' to avoid redundant updates
    if query.status == 'Accepted':
        return jsonify({'message': 'This work request has already been accepted.'}), 400

    # Update the status of the work query to 'Accepted'
    query.status = 'Accepted'

    # Now, create a new Response record to indicate the worker's response to the query
    data = request.get_json()  # Assume that the request contains the worker's email
    worker_email = data.get('worker_email')

    # Create a new response object
    response = Response(
        work_id=work_id,
        worker_email=worker_email
    )

    # Add both the updated query and the new response to the session
    db.session.add(response)

    try:
        # Commit the transaction to the database
        db.session.commit()
        return jsonify({'message': 'Work request accepted and response submitted successfully!'}), 200
    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        return jsonify({'message': f'Error updating status and submitting response: {str(e)}'}), 500


# View Responses for a Specific Work Query (for Customers)
@app.route('/work_queries/<int:work_id>/responses', methods=['GET'])
def view_responses_for_query(work_id):
    responses = Response.query.filter_by(work_id=work_id).all()
    return jsonify([{
        'response_id': response.response_id,
        'worker_email': response.worker_email
    } for response in responses]), 200

# View All Responses Made by a Worker
@app.route('/<string:worker_email>/responses', methods=['GET'])
def view_worker_responses(worker_email):
    # Perform a join between Response, WorkQuery, and Customer tables
    responses = db.session.query(Response, WorkQuery, Customer).join(
        WorkQuery, WorkQuery.work_id == Response.work_id
    ).join(
        Customer, Customer.email == WorkQuery.customer_email
    ).filter(
        Response.worker_email == worker_email
    ).all()
    
    # Prepare the result with all fields from Response, WorkQuery, and Customer
    result = []
    for response, work_query, customer in responses:
        response_data = {
            'response_id': response.response_id,
            'worker_email': response.worker_email,
            'work_id': work_query.work_id,
            'customer_email': work_query.customer_email,
            'description': work_query.description,
            'start_date': work_query.start_date.isoformat() if work_query.start_date else None,
            'end_date': work_query.end_date.isoformat() if work_query.end_date else None,
            'budget': work_query.budget,
            'work': work_query.work,
            'category': work_query.category,
            'status': response.status,
            'created_at': work_query.created_at.isoformat() if work_query.created_at else None,
            'rating': response.rating,
            'feedback': response.feedback,
            
            # Adding customer details
            'customer_first_name': customer.first_name,
            'customer_last_name': customer.last_name,
            'customer_address': customer.address,
            'customer_mobile_number': customer.mobile_number,
            'customer_city': customer.city,
            'customer_state': customer.state,
            'customer_pincode': customer.pincode
        }
        result.append(response_data)

    # Return the list of responses along with customer information
    return jsonify(result), 200


@app.route('/responses/feedback', methods=['POST'])
def provide_feedback():
    data = request.get_json()
    work_id = data.get('work_id')
    response_id = data.get('response_id')
    feedback = data.get('feedback')

    # Find the acceptance record
    response = Response.query.filter_by(work_id=work_id, response_id=response_id).first()
    
    if not response:
        return jsonify({'message': 'Response not found'}), 404

    # Update feedback
    response.feedback = feedback
    
    db.session.commit()
    
    return jsonify({'message': 'Feedback submitted successfully'}), 200

@app.route('/responses/rating', methods=['POST'])
def provide_rating():
    data = request.get_json()
    work_id = data.get('work_id')
    response_id = data.get('response_id')
    rating = data.get('rating')

    # Find the acceptance record
    response = Response.query.filter_by(work_id=work_id, response_id=response_id).first()
    
    if not response:
        return jsonify({'message': 'Response not found'}), 404

    # Update rating
    response.rating = rating
    
    db.session.commit()
    
    return jsonify({'message': 'Rating submitted successfully'}), 200

#update paid status
@app.route('/work_queries/<int:work_id>/pay', methods=['PATCH'])
def update_payment_status(work_id):
    # Fetch the work query by ID
    query = WorkQuery.query.get(work_id)
    if not query:
        return jsonify({'message': 'Work request not found!'}), 404

    # Check if the status is already 'Paid' to avoid redundant updates
    if query.status == 'Paid':
        return jsonify({'message': 'This work request has already been paid for.'}), 400

    # Update the status of the work query to 'Paid'
    query.status = 'Paid'

    # Find and update the corresponding response record
    response = Response.query.filter_by(work_id=work_id).first()
    if response:
        response.status = 'Paid'

    try:
        # Commit the transaction to the database
        db.session.commit()
        return jsonify({
            'message': 'Payment status updated successfully!',
            'status': 'Paid'
        }), 200
    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        return jsonify({'message': f'Error updating payment status: {str(e)}'}), 500

@app.route('/work_queries/<int:work_id>/complete', methods=['PATCH'])
def update_completion_status(work_id):
    # Fetch the work query by ID
    query = WorkQuery.query.get(work_id)
    if not query:
        return jsonify({'message': 'Work request not found!'}), 404

    # Check if the work is already marked as completed
    if query.status == 'Completed':
        return jsonify({'message': 'This work request is already marked as completed.'}), 400

    # Check if the work is paid for
    if query.status != 'Paid':
        return jsonify({'message': 'This work request needs to be paid for before marking as completed.'}), 400

    # Update the status of the work query to 'Completed'
    query.status = 'Completed'

    # Find and update the corresponding response record
    response = Response.query.filter_by(work_id=work_id).first()
    if response:
        response.status = 'Completed'

    try:
        # Commit the transaction to the database
        db.session.commit()
        return jsonify({
            'message': 'Work marked as completed successfully!',
            'status': 'Completed'
        }), 200
    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        return jsonify({'message': f'Error updating completion status: {str(e)}'}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables if they don't exist
    app.run(debug=True)