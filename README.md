# DineVista

A restaurant ordering web app built with Node.js, Express, EJS, and MongoDB (Mongoose).

## Features
- User sign up / login with JWT-based authentication and bcrypt-hashed passwords
- Browse and search the menu
- Add items to cart, adjust quantities, and confirm orders
- View order history from the user profile

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure MongoDB

Set the `MONGODB_URI` environment variable to your own MongoDB connection string.

For macOS/Linux:

```bash
export MONGODB_URI="your_mongodb_uri"
```

For Windows PowerShell:

```powershell
$env:MONGODB_URI="your_mongodb_uri"
```

### 3. Start the application

```bash
npm start
```

The app runs at:

```text
http://localhost:3000
```

`PORT` can be set as an environment variable when needed; otherwise, the app uses port `3000`.

## Deploying on Render

1. Push the project to GitHub.
2. Create a new Web Service on Render and connect the repository.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add `MONGODB_URI` in Render's Environment Variables section.
6. Render provides `PORT` automatically.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `MONGODB_URI` | Yes | MongoDB connection string |
| `PORT` | No | Server port; defaults to `3000` |
| `SESSION_SECRET` | No | Session signing secret; recommended for production |

Do not commit database credentials or `.env` files to GitHub. The repository includes a `.gitignore` entry for `.env` and `node_modules/`.
