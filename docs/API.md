# API Documentation

Base URL: `http://localhost:5000/api`

All responses follow this format:
```json
{
  "success": true,
  "data": { ... },
  "count": 10
}
```

---

## Health Check

### `GET /health`

Check if the API is running.

**Response:**
```json
{
  "success": true,
  "message": "EAPCET API is running"
}
```

---

## Colleges

### `GET /colleges`

List all colleges with optional filters.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| location | string | Filter by city |
| type | string | Government, Private, Autonomous |
| search | string | Search by name or code |

**Example:** `GET /colleges?location=Hyderabad`

---

### `GET /colleges/:id`

Get college details with all programs.

**Example:** `GET /colleges/1`

---

### `GET /colleges/search`

Advanced search with filters.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| q | string | Search query |
| branch | string | Branch name |
| location | string | City |
| category | string | OC, BC-A, SC, etc. (default: OC) |
| min_fee | number | Minimum fee per year |
| max_fee | number | Maximum fee per year |

**Example:** `GET /colleges/search?branch=Computer&location=Hyderabad&max_fee=150000`

---

### `POST /colleges/compare`

Compare multiple college programs.

**Request Body:**
```json
{
  "program_ids": [1, 5, 12, 20]
}
```

**Response:** Array of program objects with college details.

---

## Recommendations

### `POST /recommend`

Get AI-powered college recommendations.

**Request Body:**
```json
{
  "eapcet_rank": 5000,
  "category": "OC",
  "gender": "Male",
  "name": "Student Name",
  "email": "student@email.com",
  "preferred_branch": "Computer Science Engineering",
  "preferred_location": "Hyderabad",
  "max_budget": 150000,
  "student_id": 1
}
```

**Required fields:** `eapcet_rank`, `category`

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 25,
    "safe_colleges": [...],
    "target_colleges": [...],
    "dream_colleges": [...],
    "all_recommendations": [...],
    "student_profile": {
      "rank": 5000,
      "category": "OC",
      "branch": "Computer Science Engineering",
      "location": "Hyderabad",
      "max_budget": 150000
    }
  }
}
```

Each recommendation includes:
- `probability_score` (0-100) — ML-predicted admission chance
- `classification` — Safe (≥70%), Target (40-69%), Dream (<40%)

---

## Students

### `POST /students`

Register a student profile.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@email.com",
  "eapcet_rank": 5000,
  "category": "OC",
  "gender": "Male",
  "preferred_branch": "Computer Science Engineering",
  "preferred_location": "Hyderabad",
  "max_budget": 150000
}
```

---

### `GET /students/:id`

Get student profile by ID.

---

## Favorites

### `GET /favorites/:student_id`

List student's favorite colleges.

---

### `POST /favorites`

Add college to favorites.

**Request Body:**
```json
{
  "student_id": 1,
  "program_id": 5
}
```

---

### `DELETE /favorites`

Remove from favorites.

**Request Body:**
```json
{
  "student_id": 1,
  "program_id": 5
}
```

---

## Reference Data

### `GET /locations`

List all available locations.

### `GET /branches`

List all available branches.

---

## Error Responses

```json
{
  "success": false,
  "message": "Error description"
}
```

HTTP status codes: `400` (Bad Request), `404` (Not Found), `409` (Conflict), `500` (Server Error)
