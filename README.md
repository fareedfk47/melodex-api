# 🎵 Melodex API

A RESTful backend API for a Spotify-like music streaming platform built with **Node.js**, **Express**, **MongoDB**, and **ImageKit** for cloud media storage.

---

## 🚀 Features

- 👤 User registration & login with **role-based access control** (`user` / `artist`)
- 🔐 Secure authentication using **JWT** stored in HTTP-only cookies
- 🎵 Music track upload to **ImageKit CDN** (artists only)
- 💿 Album creation with linked tracks (artists only)
- 📂 Browse all music & albums (any authenticated user)
- 🔍 Album detail view with populated tracks & artist info

---

## 🛠️ Tech Stack

| Layer          | Technology              |
|----------------|-------------------------|
| Runtime        | Node.js                 |
| Framework      | Express.js v5           |
| Database       | MongoDB + Mongoose      |
| Authentication | JWT + HTTP-only Cookies |
| File Storage   | ImageKit CDN            |
| File Uploads   | Multer (memory storage) |
| Passwords      | bcryptjs                |

---

## 📁 Project Structure

```
spotify/
├── server.js               # Entry point
├── .env.example            # Environment variable template
├── src/
│   ├── app.js              # Express app (middleware + routes)
│   ├── db/
│   │   └── db.js           # MongoDB connection
│   ├── models/
│   │   ├── user.model.js   # User schema
│   │   ├── music.model.js  # Music track schema
│   │   └── album.model.js  # Album schema
│   ├── controllers/
│   │   ├── auth.controller.js   # Register, Login, Logout
│   │   └── music.controller.js  # Music & Album CRUD
│   ├── routes/
│   │   ├── auth.route.js        # /api/auth/*
│   │   └── music.route.js       # /api/music/*
│   ├── middlewares/
│   │   └── auth.middleware.js   # JWT verification
│   └── services/
│       └── storage.service.js   # ImageKit upload service
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/melodex-api.git
cd melodex-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Fill in your `.env` file:

```env
MONGOOSE_URI=your_mongodb_connection_string
JWT_SECRETKEY=your_super_secret_jwt_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
CLIENT_URL=http://localhost:5173
```

### 4. Start the development server

```bash
npm run dev
```

Server will start on **http://localhost:3000**

---

## 📡 API Reference

### 🔐 Auth Routes — `/api/auth`

| Method | Endpoint    | Auth     | Body                              | Description          |
|--------|-------------|----------|-----------------------------------|----------------------|
| POST   | `/register` | ❌ None  | `username, email, password, role` | Register a new user  |
| POST   | `/login`    | ❌ None  | `username/email, password`        | Login                |
| POST   | `/logout`   | ❌ None  | —                                 | Logout (clears cookie) |

> `role` can be `"user"` (default) or `"artist"`

---

### 🎵 Music Routes — `/api/music`

| Method | Endpoint           | Auth          | Body / Params             | Description              |
|--------|--------------------|---------------|---------------------------|--------------------------|
| POST   | `/upload`          | 🎤 Artist only | `title` + `music` (file)  | Upload a music track     |
| POST   | `/album`           | 🎤 Artist only | `title, musics[]`         | Create an album          |
| GET    | `/`                | 👤 Any user   | —                         | Get all music (limit 10) |
| GET    | `/albums`          | 👤 Any user   | —                         | Get all albums           |
| GET    | `/albums/:albumId` | 👤 Any user   | `albumId` (param)         | Get album by ID          |

---

## 🔒 Authentication

This API uses **JWT tokens** stored in HTTP-only cookies.

- After login/register, a `token` cookie is set automatically.
- Protected routes read this cookie via `cookie-parser`.
- Tokens expire in **7 days**.

---

## 📦 Environment Variables

| Variable               | Description                            |
|------------------------|----------------------------------------|
| `MONGOOSE_URI`         | MongoDB Atlas connection string        |
| `JWT_SECRETKEY`        | Secret key for signing JWT tokens      |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private API key               |
| `IMAGEKIT_PUBLIC_KEY`  | ImageKit public API key                |
| `IMAGEKIT_URL_ENDPOINT`| ImageKit URL endpoint for your account |
| `CLIENT_URL`           | Frontend URL (used for CORS)           |

---

## 🧪 Testing with Postman

A Postman collection is included in the `/postman` directory.

1. Import the collection from the `/postman` folder
2. Set the base URL to `http://localhost:3000`
3. Register a user first, then use the returned cookie for authenticated routes

---

## 📄 License

This project is licensed under the **ISC License**.

---

> Built with ❤️ as a Spotify-inspired backend project.
