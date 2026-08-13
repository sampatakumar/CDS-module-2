# Full-Stack AMOLED Blog Application

A responsive, full-stack blog application featuring secure JWT authentication, private dashboard routes, a user profile system, category filters, and search functionality. The UI is designed with a premium skeuomorphic AMOLED black style.

---

## 🌟 Acknowledgement & Appreciation

This project was built as part of the software engineering internship program. Special thanks to **[Codomax Digital Solutions](https://www.codomaxdigital.in)** for providing this enriching internship opportunity, structural guidance, and design specifications.

---

## 🚀 Key Features

* **Secure Authentication**: Register and Login features using secure hashed passwords (via `bcryptjs`) and secure session tracking via JSON Web Tokens (JWT).
* **Guarded Routing**: Private routes (`/dashboard`, `/profile`, `/create`, `/edit/:id`) protected by a client-side React Router guard, redirecting unauthorized users to `/login`.
* **Public Feed**: Accessible to all guests; displays published blogs with category tags, authorship, and formatted creation timestamps. Guests cannot create, edit, or delete articles.
* **Personal Dashboard**: Authorized area displaying profile statistics (e.g., total articles authored) and a listing of the user's *own* blog posts with options to edit or delete them.
* **User Profile**: A dedicated profile view loading metadata retrieved securely from the backend API.
* **Server-side Search**: Instantly query titles and contents matching search keywords.
* **Category Filters**: Filter posts by categories such as *Technology*, *Lifestyle*, *Travel*, *Business*, *Food*, or *General*.
* **Deployment Blueprints**: Included config structures ready for deployment on **Render** (backend) and **Vercel** (frontend).

---

## 🛠️ Tech Stack

* **Frontend**: React (Vite), React Router v6, Lucide Icons, Vanilla CSS (with custom AMOLED skeuomorphic variables).
* **Backend**: Node.js, Express.js (v5), Mongoose (MongoDB).
* **Security**: JWT (JsonWebToken) and bcryptjs.

---

## 📂 Project Structure

```text
├── backend/
│   ├── src/
│   │   ├── controllers/      # auth and blog handlers
│   │   ├── db/               # database connection setup
│   │   ├── middleware/       # JWT auth protector
│   │   ├── models/           # Mongoose schemas (User & Blog with Category)
│   │   └── routes/           # Auth and Blog router mapping
│   ├── server.js             # main Express server entrypoint
│   └── .env                  # local environment variables configuration
├── frontend/
│   ├── src/
│   │   ├── components/       # Nav, Feed, Dashboard, forms & guards
│   │   ├── App.jsx           # router mapping & state controllers
│   │   ├── App.css           # AMOLED Skeuomorphic style implementation
│   │   ├── api.js            # fetch requests wrapping with auth headers
│   │   └── main.jsx          # React DOM render root
│   ├── vercel.json           # Vercel SPA routing rewrite mapping
│   └── package.json          # frontend modules and dependencies
├── render.yaml               # Render Infrastructure-as-Code Blueprint
└── README.md
```

---

## 💻 Local Setup & Installation

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed and a [MongoDB](https://www.mongodb.com/) instance running locally on `port 27017` or have access to a MongoDB Atlas cluster.

### 2. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside the `backend` folder:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/blog_app_db
   JWT_SECRET=your_secure_jwt_secret_string
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

---

## 🌐 Production Deployment Guide

### 1. Backend (Render)
1. Commit the code and push it to your Git repository.
2. In the Render Dashboard, click **New +** and select **Blueprint**.
3. Link your repository. Render will automatically read the root [render.yaml](render.yaml) file.
4. Input your production variables for `MONGO_URI` and `JWT_SECRET` when prompted.

### 2. Frontend (Vercel)
1. Add a new project in the Vercel Dashboard and link your Git repository.
2. Configure the **Root Directory** setting to `frontend`.
3. Under Environment Variables, add:
   * `VITE_API_BASE_URL` = `https://your-deployed-render-backend-url.onrender.com/api`
4. Click **Deploy**. Vercel will build the frontend and serve it securely, routing all traffic back to `index.html` via [vercel.json](frontend/vercel.json).