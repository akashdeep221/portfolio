# Portfolio Website Backend

This is the Django backend for the portfolio website frontend.

## Tech
- Django
- Payment gateway

## Features
- Portfolio Website Management
- User Registration/Login
- Email verification for sign-up
- Payment Integration
- Product Request/User/Subscription Management
- Scalable and future-ready project structure

## Prerequisites

- Python 3.10+ (or compatible)
- Node.js and npm (for frontend integration)
- Virtual environment recommended

## Setup

### 1. Create a virtual environment
- Navigate to the project folder. 
Windows (PowerShell): 
python -m venv venv

Linux/macOS:
python3 -m venv venv

### 2. Activate the virtual environment
- Windows (PowerShell):
.\venv\Scripts\activate

- Linux/macOS:
source venv/bin/activate

### 3. Install dependencies
- Windows (PowerShell):
pip install -r requirements.txt

-Linux/macOS:
pip3 install -r requirements.txt

### 4. Configure environment variables
- Create a .env file in the backend folder to store secrets (secret keys, email credentials, payment gateway credentials etc.).

- Do NOT commit .env to version control.

Example .env variables:

SECRET_KEY=your_django_secret_key
DEBUG=True
ALLOWED_HOSTS=host_ips_you_allowed
BACKEND_BASE_URL=your_backend_base_ip
FRONTEND_BASE_URL=your_frontend_base_ip
EMAIL_HOST_USER=your_email
EMAIL_HOST_PASSWORD=your_email_password
CORS_ALLOWED_ORIGINS=your_ips_that_are_allowed_in_backend
RAZORPAY_KEY_ID=your_razorpay_gateway_key
RAZORPAY_KEY_SECRET=your_razorpay_gateway_secret

### 5. Run database migrations
- Windows (PowerShell):
python manage.py migrate

-Linux/macOS:
python3 manage.py migrate

### 6. Create a superuser for admin
- Windows (PowerShell):
python manage.py createsuperuser

-Linux/macOS:
python3 manage.py createsuperuser

### 7. Start the development server
- Windows (PowerShell):
python manage.py runserver

-Linux/macOS:
python3 manage.py runserver

- Server runs on http://localhost:8000 by default.

- Ensure your virtual environment is activated whenever you run the server.

## Admin
- Visit `/admin/` to manage users, product requests, payments, subscriptions.
- Use the superuser account created during setup.

## Notes
- Always keep your .env file secret; do not share or commit it.

- For production deployment, ensure DEBUG=False and use proper environment-specific settings.

- To check all dependencies and their versions, run:
Windows (PowerShell):
pip freeze > requirements.txt

Linux/macOS:
pip3 freeze > requirements.txt

- Start the server inside the virtual environment to avoid missing dependencies.

---

For more details, see code comments and documentation.
