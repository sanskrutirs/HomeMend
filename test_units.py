import unittest
from unittest.mock import patch, MagicMock
from app import app, db  # Import customer_login and app
from models import Customer, Worker, WorkQuery, Response

class TestCustomerModel(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        # Set up application context once for all tests in this class
        cls.app_context = app.app_context()
        cls.app_context.push()

    @classmethod
    def tearDownClass(cls):
        # Remove application context after all tests are done
        cls.app_context.pop()

    def setUp(self):
        # Setup any required test variables
        self.customer = Customer(
            email='test_customer@example.com',
            first_name='John',
            last_name='Doe',
            password='hashed_password',  # Assume password is hashed
            mobile_number='1234567890',
            address='123 Test St',
            city='Testville',
            state='TS',
            pincode='123456'
        )

    def test_customer_creation(self):
        # Test that customer object initializes correctly
        self.assertEqual(self.customer.email, 'test_customer@example.com')
        self.assertEqual(self.customer.first_name, 'John')
        self.assertEqual(self.customer.last_name, 'Doe')
        self.assertEqual(self.customer.mobile_number, '1234567890')
        self.assertEqual(self.customer.city, 'Testville')
        
    @patch('app.db.session.add')
    @patch('app.db.session.commit')
    def test_customer_registration_db_call(self, mock_commit, mock_add):
        # Mocking db.session.add and db.session.commit to test without a real database
        db.session.add(self.customer)
        db.session.commit()
        
        # Verify db.session.add and db.session.commit were called once
        mock_add.assert_called_once_with(self.customer)
        mock_commit.assert_called_once()

class TestWorkerModel(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        # Set up application context once for all tests in this class
        cls.app_context = app.app_context()
        cls.app_context.push()

    @classmethod
    def tearDownClass(cls):
        # Remove application context after all tests are done
        cls.app_context.pop()

    def setUp(self):
        # Setup any required test variables for a Worker
        self.worker = Worker(
            email='worker@example.com',
            first_name='Worker',
            last_name='One',
            password='workerpass',  # Plain text for testing
            mobile_number='0987654321',
            profession='Plumber',
            city='Testville',
            state='TS',
            pincode='654321'
        )

    def test_worker_creation(self):
        # Test that worker object initializes correctly
        self.assertEqual(self.worker.email, 'worker@example.com')
        self.assertEqual(self.worker.first_name, 'Worker')
        self.assertEqual(self.worker.last_name, 'One')
        self.assertEqual(self.worker.mobile_number, '0987654321')
        self.assertEqual(self.worker.profession, 'Plumber')
        self.assertEqual(self.worker.city, 'Testville')
        
    @patch('app.db.session.add')
    @patch('app.db.session.commit')
    def test_worker_registration_db_call(self, mock_commit, mock_add):
        # Mocking db.session.add and db.session.commit to test without a real database
        db.session.add(self.worker)
        db.session.commit()
        
        # Verify db.session.add and db.session.commit were called once with the worker instance
        mock_add.assert_called_once_with(self.worker)
        mock_commit.assert_called_once()
        
class TestWorkQueryModel(unittest.TestCase):

    def setUp(self):
        self.work_query = WorkQuery(
            customer_email='test_customer@example.com',
            description='Fix kitchen sink',
            start_date='2024-11-15',
            end_date='2024-11-16',
            budget=100.00,
            work='Plumbing',
            category='Household'
        )

    def test_work_query_creation(self):
        # Test that work query object initializes correctly
        self.assertEqual(self.work_query.customer_email, 'test_customer@example.com')
        self.assertEqual(self.work_query.description, 'Fix kitchen sink')
        self.assertEqual(self.work_query.budget, 100.00)
        self.assertEqual(self.work_query.category, 'Household')
        
    @patch('app.db.session.add')
    @patch('app.db.session.commit')
    def test_add_work_query_db_call(self, mock_commit, mock_add):
        # Mocking db.session.add and db.session.commit to test without a real database
        db.session.add(self.work_query)
        db.session.commit()
        
        # Verify db.session.add and db.session.commit were called once
        mock_add.assert_called_once_with(self.work_query)
        mock_commit.assert_called_once()


class TestResponseModel(unittest.TestCase):

    def setUp(self):
        self.response = Response(
            work_id=1,
            worker_email='worker@example.com',
            status='Accepted',
            rating=5,
            feedback='Great job!'
        )

    def test_response_creation(self):
        # Test that response object initializes correctly
        self.assertEqual(self.response.work_id, 1)
        self.assertEqual(self.response.worker_email, 'worker@example.com')
        self.assertEqual(self.response.status, 'Accepted')
        self.assertEqual(self.response.rating, 5)
        self.assertEqual(self.response.feedback, 'Great job!')

    @patch('app.db.session.add')
    @patch('app.db.session.commit')
    def test_response_db_call(self, mock_commit, mock_add):
        # Mocking db.session.add and db.session.commit to test without a real database
        db.session.add(self.response)
        db.session.commit()
        
        # Verify db.session.add and db.session.commit were called once
        mock_add.assert_called_once_with(self.response)
        mock_commit.assert_called_once()


if __name__ == '__main__':
    unittest.main()
