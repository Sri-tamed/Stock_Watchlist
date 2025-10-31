<<<<<<< HEAD
# Stock Watchlist API

A simple and secure Node.js application for managing a stock watchlist. The application is built with Express and uses MongoDB for data storage. It provides a RESTful API to add and view stock tickers, with a basic web interface.

## Features

- **Add Stocks**: Add new stock tickers to your watchlist.
- **View Watchlist**: See all the stocks you've added.
- **Input Validation**: Ensures that stock tickers are in a valid format (1-5 uppercase letters).
- **Duplicate Prevention**: Prevents adding the same stock ticker more than once.
- **Security**: Uses `helmet` for security headers, `cors` for cross-origin requests, and sanitizes input to prevent NoSQL injection attacks.
- **Simple UI**: A clean, static frontend to interact with the API.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Middleware**: Helmet, CORS, Express-Validator
- **Frontend**: HTML, CSS, JavaScript (no frameworks)

## Local Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd stock-watchlist
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project by copying the example file:

```bash
cp .env.example .env
```

Now, open the `.env` file and add your MongoDB connection string:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

### 4. Run the Application

For development (with auto-reloading via `nodemon`):

```bash
npm run dev
```

For production:

```bash
npm start
```

The server will start on `http://localhost:5000`.

## API Endpoints & Testing

You can test the API using the provided cURL scripts.

```bash
bash ./scripts/testRequests.sh
```

### Test Cases

1.  **Add a valid stock ("AAPL")**
    ```sh
    curl -X POST -H "Content-Type: application/json" -d '{"name": "AAPL"}' http://localhost:5000/api/add
    ```
    *Expected Response (Status 201):*
    ```json
    { "success": true, "data": { "name": "AAPL", ... } }
    ```

2.  **Add an invalid stock ("apple123")**
    ```sh
    curl -X POST -H "Content-Type: application/json" -d '{"name": "apple123"}' http://localhost:5000/api/add
    ```
    *Expected Response (Status 400):*
    ```json
    { "success": false, "error": "Stock ticker must be 1-5 uppercase letters." }
    ```

3.  **Add a duplicate stock**
    ```sh
    curl -X POST -H "Content-Type: application/json" -d '{"name": "AAPL"}' http://localhost:5000/api/add
    ```
    *Expected Response (Status 409):*
    ```json
    { "success": false, "error": "Stock ticker already exists in the watchlist." }
    ```

4.  **GET the watchlist**
    ```sh
    curl http://localhost:5000/api/watchlist
    ```
    *Expected Response (Status 200):*
    ```json
    { "success": true, "data": [ { "name": "AAPL", ... } ] }
    ```

5.  **Add an empty input**
    ```sh
    curl -X POST -H "Content-Type: application/json" -d '{"name": ""}' http://localhost:5000/api/add
    ```
    *Expected Response (Status 400):*
    ```json
    { "success": false, "error": "Stock ticker cannot be empty." }
    ```

## Git & GitHub Commands

To initialize a new repository and push your code to GitHub:

```bash
# 1. Initialize a local Git repository
git init

# 2. Add all files to staging
git add .

# 3. Commit the files
git commit -m "Initial commit - stock-watchlist"

# 4. Create a new repository on GitHub (using GitHub CLI)
gh repo create stock-watchlist --public --source=. --remote=origin --push

# Or, if you created the repo manually on GitHub.com:
# git remote add origin https://github.com/your-username/stock-watchlist.git
# git push -u origin main
```

## Deployment to Render

Render is a great platform for deploying Node.js applications.

1.  **Create a New Web Service**: Go to your Render dashboard and click "New" > "Web Service".
2.  **Connect Your Repository**: Connect your GitHub account and select the `stock-watchlist` repository.
3.  **Configure Settings**:
    -   **Name**: Give your service a name (e.g., `stock-watchlist`).
    -   **Root Directory**: Leave as is.
    -   **Branch**: `main` (or your default branch).
    -   **Build Command**: `npm install`
    -   **Start Command**: `npm start`
4.  **Add Environment Variables**: Under the "Environment" section, add the following variables:
    -   `MONGODB_URI`: Your full MongoDB Atlas connection string.
    -   `PORT`: `5000` (Render will use this internally but expose the service on port 443).
5.  **Deploy**: Click "Create Web Service". Render will automatically build and deploy your application.
=======
# Stock_Watchlist
complete Stock Watchlist application using Node.js + Express.js + MongoDB Atlas
>>>>>>> bee430a1dd9783c392053c17778c7c44060d856d
