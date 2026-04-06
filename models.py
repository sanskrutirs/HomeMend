from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# Customer Model
class Customer(db.Model):
    __tablename__ = 'customers'
    
    email = db.Column(db.String(100), primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)
    mobile_number = db.Column(db.String(15), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    pincode = db.Column(db.String(10), nullable=False)
    
    # Relationships
    work_queries = db.relationship('WorkQuery', backref='customer', lazy=True)

# Worker Model
class Worker(db.Model):
    __tablename__ = 'workers'
    
    email = db.Column(db.String(100), primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)
    mobile_number = db.Column(db.String(15), nullable=False)
    profession = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    pincode = db.Column(db.String(10), nullable=False)
    
    # Relationships
    responses = db.relationship('Response', backref='worker', lazy=True)

# WorkQuery Model
class WorkQuery(db.Model):
    __tablename__ = 'work_queries'
    
    work_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    customer_email = db.Column(db.String(100), db.ForeignKey('customers.email'), nullable=False)
    description = db.Column(db.Text, nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    budget = db.Column(db.Float, nullable=False)
    work = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(100),default='Pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    responses = db.relationship('Response', backref='work_query', uselist=False)

    @property
    def is_accepted(self):
        return self.responses is not None

# Response Model
class Response(db.Model):
    __tablename__ = 'responses'
    
    response_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    work_id = db.Column(db.Integer, db.ForeignKey('work_queries.work_id'), nullable=False)
    worker_email = db.Column(db.String(100), db.ForeignKey('workers.email'), nullable=False)
    rating = db.Column(db.Integer)
    feedback = db.Column(db.Text)
    status = db.Column(db.String(100),default='Pending')
    

# Acceptance Model
# class Acceptance(db.Model):
#     __tablename__ = 'acceptances'
    
#     work_id = db.Column(db.Integer, db.ForeignKey('work_queries.work_id'), primary_key=True)
#     response_id = db.Column(db.Integer, db.ForeignKey('responses.response_id'), primary_key=True)
#     rating = db.Column(db.Integer)
#     feedback = db.Column(db.Text)
    
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)

#     def __repr__(self):
#         return f'<Acceptance work_id={self.work_id} response_id={self.response_id}>'

# Helper functions for database initialization
# def init_db(app):
#     db.init_app(app)
    
#     with app.app_context():
#         db.create_all()

# def drop_db(app):
#     with app.app_context():
#         db.drop_all()