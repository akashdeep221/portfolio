# Portfolio Website Backend

This is a Django REST API backend for the portfolio website frontend. It features:

- Custom user model (name, email, mobile, password)
- JWT authentication
- Email verification for sign-up
- REST API endpoints for login, signup, and password reset
- PostgreSQL database
- CORS configured for frontend only
- Django admin panel for user management
- Product request model for storing user requests
- Scalable and future-ready project structure

## Setup

1. Create a PostgreSQL database and update `backend/settings.py` with your DB credentials.
2. Create a `.env` file for secrets (recommended).
3. Activate the virtual environment:
   ```powershell
   .\venv\Scripts\activate
   ```
4. Install dependencies (already installed if you followed setup):
   ```powershell
   pip install -r requirements.txt
   ```
5. Run migrations:
   ```powershell
   python manage.py migrate
   ```
6. Create a superuser for admin:
   ```powershell
   python manage.py createsuperuser
   ```
7. Start the server:
   ```powershell
   python manage.py runserver
   ```

## API Endpoints
- `/api/auth/signup/` (POST)
- `/api/auth/login/` (POST)
- `/api/auth/password-reset/` (POST)
- `/api/products/request/` (POST)

## Admin
Visit `/admin/` to manage users and product requests.

---

For more details, see code comments and documentation.
