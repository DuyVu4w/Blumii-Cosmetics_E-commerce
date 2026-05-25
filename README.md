# Blumii Cosmetics - E-commerce Web Application

Blumii Cosmetics is a modern, full-stack e-commerce platform dedicated to beauty and skincare products. The application features a dynamic customer shopping experience alongside a robust administrator management system to streamline business operations.

---

## 📺 Project Demo
* **Demo Video / Live Link:**

---

## 🚀 Tech Stack

### Frontend
* **Core:** ReactJS (Functional Components & Hooks)
* **State Management:** React Context API & LocalStorage
* **Routing:** React Router DOM
* **Styling:** Bootstrap 5 & Custom CSS

### Backend
* **Runtime Environment:** NodeJS
* **Framework:** ExpressJS
* **Database:** MongoDB via Mongoose ODM
* **Security & Authentication:** JSON Web Tokens (JWT) & Bcrypt password hashing

---

## 🛠️ Key Features

### For Customers
* **User Authentication:** Secure registration, login, and session persistence using JWT.
* **Product Catalog:** Responsive browsing with advanced filtering options.
* **Cart & Order Management:** Dynamic shopping cart operations and structured order placement.
* **Address Book:** Manage multiple shipping and delivery addresses.

### For Administrators (Admin Panel)
* **Dashboard:** Overview of sales performance and order metrics.
* **Product Management:** Full CRUD operations for cosmetics, categories, and inventory stock.
* **Order Tracking:** Monitor, update, and manage customer order fulfillment statuses.

---

## 👥 Contributors

This project was developed as a collaborative Final Project for the Web Application Development course by:
* **Vũ Đức Duy**
* **Huỳnh Ngọc Nhi**
* **Nguyễn Thị Anh Thư**


---
## 💻 Getting Started

### Prerequisites
* Node.js (v16.x or higher)
* MongoDB Atlas account or local MongoDB instance

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/NhiBuaaCosmetics-Sales-System-NodeJS-Final-Project.git](https://github.com/NhiBuaaCosmetics-Sales-System-NodeJS-Final-Project.git)
   cd Cosmetics-Sales-System-NodeJS-Final-Project
    ```

2. **Backend setup**
    ```bash
        cd server
        npm install
    ```

3. **Configure Environment Variables:**
   * Navigate to the server directory:
     ```bash
     cd server
     ```
   * Create a new file named `.env` in the root of the `/server` directory and populate it with the following environment variables:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```
   *(Note: Replace `your_mongodb_connection_string` with your local MongoDB URI or MongoDB Atlas connection string, and provide a secure random string for `your_jwt_secret_key`).*

4. **Install Dependencies & Run Backend Server:**
   * While still inside the `/server` directory, install all required Node.js packages:
     ```bash
     npm install
     ```
   * Start the development backend server:
     ```bash
     npm start
     ```
   * The backend API should now be running securely at `http://localhost:5000`.

5. **Install Dependencies & Run Frontend (React):**
   * Open a new terminal window/tab and navigate back to the root project folder, then enter the client directory:
     ```bash
     cd client
     ```
   * Install the frontend dependencies:
     ```bash
     npm install
     ```
   * Launch the React development server:
     ```bash
     npm start
     ```
   * Your browser should automatically open and render the application at `http://localhost:3000`.

---

## 🔐 Default Testing Credentials

To explore the application's full capabilities instantly without registering a new account, you can use the following pre-configured test accounts:

### Admin Account (Full access to Admin Dashboard)
* **Email:** `.....`
* **Password:** `.....`

### Customer Account (Standard e-commerce user experience)
* **Email:** `.....`
* **Password:** `.....`