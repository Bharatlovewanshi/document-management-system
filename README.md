## 📄 Document Management System (DMS)

A full-stack Document Management System that allows users to securely upload, manage, version, and share documents with role-based access control.
Built with Angular (Frontend) and Node.js + Express (Backend), using MongoDB and Cloudinary for storage.

### Features
### Authentication & Authorization

-User registration & login (JWT based)-
-Secure API access with Authorization headers
-Role-based permissions (owner, editor, viewer)

## 📂 Document Management

-Upload documents with metadata (title, description, tags)
-Cloud-based file storage using Cloudinary
-View all accessible documents
-Soft delete documents

## 🕒 Version Control

-Upload new versions of existing documents
-Maintain complete version history
-Restore any previous version

## 👥 Permissions

-Control document access per user
-View-only or edit access
-Secure permission middleware

### 🎨 Frontend UI

-Angular + Tailwind CSS
-Loader components & reusable UI
-Search and highlight functionality
-Responsive dashboard layout

## 🧱 Tech Stack
### Frontend (Client)

    Angular
    TypeScript
    Tailwind CSS
    Angular Router
    HTTP Interceptors (JWT)

### Backend (Server)

    Node.js
    Express.js
    MongoDB + Mongoose
    JWT Authentication
    Multer (memory storage)
    Cloudinary (file uploads)


## 📁 Project Structure
Document-Management-System/
│
├── client/                 # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   ├── core/
│   │   │   ├── shared/
│   │   │   └── app.module.ts
│   │   └── environments/
│   └── angular.json
│
├── server/                 # Node.js Backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   └── config/
│   ├── server.js
│   └── .env
│
└── README.md


## 🛠️ Installation & Setup
## 1️⃣ Clone Repository
    git clone https://github.com/Bharatlovewanshi/document-management-system

    cd document-management-system

## 2️⃣ Backend Setup
    cd server
    npm install

   # Run server:
    npm run dev
    
   # Server will start on:
    http://localhost:5000


## 3️⃣ Frontend Setup
    cd client
    npm install
    ng serve

   # Frontend runs on:
    http://localhost:4200


## ⚙️ Environment Variables
##  Backend .env (server/.env)
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/dms(if mongodb installed in your system else) paste mongodb string 
    JWT_SECRET=your_jwt_secret

    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret

##  frontend Environment (client/environments/environment.ts)
#     environment.prod.ts
    export const environment = {
      production: true/false,
      apiBaseUrl: 'https://your-backend-url/api'
    };



## 🔁 API Endpoints (Backend)
##  Auth
    POST /api/auth/register
    POST /api/auth/login
    GET /api/auth/me
    
##  Documents
    POST /api/documents/upload
    GET /api/documents
    GET /api/documents/:id
    PUT /api/documents/:id/edit
    DELETE /api/documents/:id

##  Versions
    GET /api/versions/:documentId
    POST /api/versions/:documentId/restore/:versionId

## 🔐 Security Notes

-JWT token is stored in localStorage (for development).
-AuthInterceptor automatically attaches token
-Backend middleware validates permissions
-Files are uploaded securely via Cloudinary

 ## #############################################