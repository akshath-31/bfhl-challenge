# BFHL Graph Challenge

A full-stack application for processing and analyzing directed graph relationships. The backend accepts edge definitions, cleans the data, identifies trees vs cycles, and aggregates statistics. The frontend provides a dark-themed, responsive dashboard to visualize these structures.

## Setup & Run

### Backend
1. Navigate to the `server` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:4200` (or dynamically loaded via `process.env.PORT`).

### Frontend
The frontend requires no build steps or frameworks.
Simply open `client/index.html` in any modern web browser.

## Tech Stack
- **Backend**: Node.js, Express, CORS (ESM modules)
- **Frontend**: Vanilla HTML/CSS/JS
- **Algorithms**: Iterative Depth First Search (DFS), topological grouping.
