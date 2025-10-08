# Fullstack Portfolio Website

A Fullstack Portfolio Website showcasing my portfolio, personal projects, user interactions, my contact, subscription and secure payment integration. This project consists of a Django backend and a React + Vite frontend, designed to be scalable, secure, and easy to deploy.

## 📁 Project Structure

```bash
portfolio/                       # project root
│
├── backend/                     # Django REST API (Business Logic + Payments + Auth)
│   ├── README.md                # Backend setup and usage instructions
│   ├── requirements.txt         # Python dependencies
│   └── ...                      # Other backend files and folders
│
├── frontend/                    # React + Vite UI (Portfolio, Dashboard, Forms)
│   ├── README.md                # Frontend setup and usage instructions
│   ├── package.json             # Node.js dependencies
│   └── ...                      # Other frontend files and assets
│
└── README.md                    # Combined project overview and high-level instructions (This File)
```

## 🧠 Overview

The project serves as a portfolio and product showcase platform with integrated user authentication, email verification, and online payments using Razorpay. It demonstrates the use of modern frontend frameworks with a robust Django backend, adhering to best practices in structure, security, and scalability.

## 🛠️ Tech Stack

Frontend

* React 19, Vite 6
* React Router DOM
* Razorpay Checkout Integration
* Responsive design (mobile-friendly)

Backend

* Django 5.x
* SQLite (development)
* Razorpay Payment Gateway Integration
* Email verification and authentication

Other Tools

* Python 3.10+
* Node.js 20+ (LTS recommended) and npm 10+
* Environment variables (.env files for secrets)
* AWS / Netlify / Vercel (for deployment options)

## ⚙️ Setup Overview

Detailed setup steps for both backend and frontend are provided in their respective README.md files.

Quick Summary

## 🔐 Security Notes

* .env files must never be committed to version control.
* For production:
    * DEBUG=False should be set in Django
    * HTTPS and proper CORS configuration, domain restrictions should be used
    * Should be hosted on a secure cloud provider (e.g., AWS, Render, Vercel (for frontend) etc)

## 🚀 Features

Frontend

* Portfolio and product and showcase
* User authentication (login/signup/forgot password)
* Registered User Dashboard with product request and payment option
* Email subscription and contact forms
* Smooth page navigation and responsive UI

Backend

* API endpoints for frontend communication
* Admin panel for managing users, payments, subscriptions and product requests
* Payment gateway integration
* Email verification and notification system
* Modular and scalable architecture

## 🧪 Testing & Maintenance

* Use pip freeze > requirements.txt and npm list (npm ls for linux/macOS) to verify installed dependencies.
* Test API endpoints using Postman or cURL.
* Run the backend and frontend concurrently to test full integration.
* Activate the virtual environment before running backend commands.

## 🌐 Deployment

* Frontend:
    Build and deploy the optimized files (dist/) using Netlify, Vercel, or AWS S3.
        npm run build
* Backend:
    Deploy Django using AWS EC2, Elastic Beanstalk, or Render with proper environment configuration.
* Ensure both services communicate over secure HTTPS endpoints.

## 🧾 Additional Information

* Admin Access: /admin/ (Django Admin Panel)
* Default Local URLs:
    * Backend: http://localhost:8000
    * Frontend: http://localhost:5173

## 📝 License and Credits

This project was developed by me, Akashdeep Vasistha, as part of Final Year Software Engineering Project. All referenced open-source frameworks and APIs (Django, React, Razorpay, etc.) are credited to their respective owners and contributors.