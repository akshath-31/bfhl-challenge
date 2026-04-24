# BFHL Graph Challenge

A full-stack application that processes directed graph relationships.
It builds hierarchical trees, detects cycles, and generates summary insights from input edges.

---

## Live Demo

Frontend: https://bfhl-akshath.netlify.app/
Backend API: https://bfhl-challenge-nkoz.onrender.com/bfhl

---

## Features

* Build hierarchical trees from directed edges
* Detect cycles in graphs
* Validate and filter invalid inputs
* Handle duplicate edges
* Generate summary statistics
* Support multiple disconnected components

---

## API

### Endpoint

POST `/bfhl`

### Request

```json
{
  "data": ["A->B", "B->C"]
}
```

### Response

```json
{
  "user_id": "akshathsenthilkumar_31052005",
  "hierarchies": [...],
  "invalid_entries": [...],
  "duplicate_edges": [...],
  "summary": {
    "total_trees": 1,
    "total_cycles": 0,
    "largest_tree_root": "A"
  }
}
```

---

## Tech Stack

* Frontend: HTML, CSS, JavaScript
* Backend: Node.js, Express
* Deployment: Render, Netlify

---

## Project Structure

```
bfhl-challenge/
├── client/
│   └── index.html
├── server/
│   ├── routes/
│   ├── utils/
│   └── index.js
```

---

## Run Locally

### Backend

```
cd server
npm install
npm start
```

### Frontend

Open `client/index.html` in browser

---

## Author

Akshath Senthilkumar
