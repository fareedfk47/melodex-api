# 🎵 Melodex API

Melodex is a Spotify-inspired music streaming backend that I built to practice building REST APIs and working with authentication, MongoDB, file uploads, and cloud storage.

The API is built with **Node.js, Express, MongoDB, Mongoose, and ImageKit**.

## 🚀 What I Built

* 👤 User registration and login
* 🔐 JWT authentication using HTTP-only cookies
* 👥 Role-based access for `user` and `artist`
* 🎵 Music upload for artists
* ☁️ Music files stored on ImageKit CDN
* 💿 Album creation with multiple tracks
* 📂 Browse music and albums
* 🔍 Get album details with tracks and artist information

## 🛠️ Tech Stack

| Part             | Technology              |
| ---------------- | ----------------------- |
| Runtime          | Node.js                 |
| Backend          | Express.js v5           |
| Database         | MongoDB + Mongoose      |
| Authentication   | JWT + HTTP-only Cookies |
| File Storage     | ImageKit                |
| File Uploads     | Multer                  |
| Password Hashing | bcryptjs                |

## 📁 Project Structure

```text
spotify/
├── server.js
├── .env.example
├── src/
│   ├── app.js
│   ├── db/
│   │   └── db.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── music.model.js
│   │   └── album.model.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── music.controller.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   └── music.route.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   └── services/
│       └── storage.service.js
```

## ⚙️ Getting Started

### 1. Clone the project

```bash
git clone https://github.com/fareedfk47/melodex-api.git
cd melodex-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the `.env` file

Create a `.env` file in the root directory and add:

```env
MONGOOSE_URI=your_mongodb_connection_string

JWT_SECRETKEY=your_super_secret_jwt_key

IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

CLIENT_URL=http://localhost:5173
```

### 4. Start the server

```bash
npm run dev
```

The server will run on:

```text
http://localhost:3000
```

## 📡 API Routes

### 🔐 Authentication — `/api/auth`

| Method | Endpoint    | Auth | Description                 |
| ------ | ----------- | ---- | --------------------------- |
| POST   | `/register` | ❌    | Create a new account        |
| POST   | `/login`    | ❌    | Login                       |
| POST   | `/logout`   | ❌    | Logout and clear the cookie |

When registering, the role can be:

```text
user
artist
```

If no role is provided, it defaults to `user`.

### 🎵 Music — `/api/music`

| Method | Endpoint           | Access              | Description          |
| ------ | ------------------ | ------------------- | -------------------- |
| POST   | `/upload`          | Artist              | Upload a music track |
| POST   | `/album`           | Artist              | Create an album      |
| GET    | `/`                | Authenticated users | Get music            |
| GET    | `/albums`          | Authenticated users | Get all albums       |
| GET    | `/albums/:albumId` | Authenticated users | Get album details    |

For music uploads, I use **Multer** to receive the file and then upload it to **ImageKit**.

## 🔒 Authentication

I used **JWT-based authentication** for the project.

After registration or login, the server creates a JWT and stores it in an **HTTP-only cookie**.

Protected routes read the cookie and verify the token before allowing access.

The token expires after **7 days**.

I also added role-based authorization, so artist-only operations like uploading music and creating albums can't be accessed by regular users.

## 🗄️ Database

I used **MongoDB with Mongoose** for storing users, music tracks, and albums.

Albums store references to music tracks, which lets me use Mongoose `populate()` to get the related tracks and artist information when fetching an album.

## 🧪 Testing

I tested the API using **Postman**.

The project includes a Postman collection in the `postman` folder.

A typical flow is:

```text
Register
   ↓
Login
   ↓
JWT cookie is created
   ↓
Access protected routes
   ↓
Artist → Upload music
   ↓
Artist → Create album
   ↓
Users → Browse music/albums
```

## 🎯 Why I Built This

I built Melodex mainly to get hands-on experience with backend development.

While working on it, I practiced:

* Building REST APIs with Express
* Connecting MongoDB with Mongoose
* JWT authentication
* HTTP-only cookies
* Role-based authorization
* Password hashing with bcrypt
* File uploads with Multer
* Cloud storage with ImageKit
* MongoDB relationships and `populate()`
* Testing APIs with Postman

## 📄 License

This project is licensed under the ISC License.

---

Built with ❤️ while learning backend development.