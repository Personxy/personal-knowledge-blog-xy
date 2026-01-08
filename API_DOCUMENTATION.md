# API Documentation

## Base Information
- **Base URL**: `/api/v1`
- **Content-Type**: `application/json` (except for file uploads)
- **Authorization**: Bearer Token (header: `Authorization: Bearer <token>`)

## Endpoints

### 1. Authentication (Auth)

#### 1.1 Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Auth Required**: No
- **Body**:
  ```json
  {
    "username": "admin",
    "password": "password123"
  }
  ```
- **Response** (Success - 200):
  ```json
  {
    "code": 0,
    "message": "Login successful",
    "data": {
      "token": "eyJhbGciOiJIUzI1...",
      "user": {
        "id": 1,
        "username": "admin",
        "nickname": "Admin User",
        "avatar": "/uploads/avatar.png"
      }
    }
  }
  ```
- **Response** (Error):
  - 400: Username and password are required
  - 401: Invalid credentials

#### 1.2 Get Current User Info
- **URL**: `/auth/info`
- **Method**: `GET`
- **Auth Required**: Yes
- **Response** (Success - 200):
  ```json
  {
    "code": 0,
    "message": "Success",
    "data": {
      "id": 1,
      "username": "admin",
      "nickname": "Admin User",
      "avatar": "/uploads/avatar.png"
    }
  }
  ```
- **Response** (Error):
  - 401: Authentication required / Invalid token

---

### 2. Articles

#### 2.1 Get Article List
- **URL**: `/articles`
- **Method**: `GET`
- **Auth Required**: No
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `categoryId`: Filter by category ID (optional)
  - `tagId`: Filter by tag ID (optional)
- **Response** (Success - 200):
  ```json
  {
    "code": 0,
    "message": "Success",
    "data": {
      "total": 50,
      "items": [
        {
          "id": 1,
          "title": "My First Blog Post",
          "summary": "This is a summary...",
          "content": "Markdown content...",
          "cover_image": "/uploads/cover.jpg",
          "view_count": 100,
          "status": 1,
          "createdAt": "2024-01-01T12:00:00.000Z",
          "category": { "id": 1, "name": "Tech", "code": "tech" },
          "author": { "id": 1, "username": "admin", "nickname": "Admin", "avatar": "..." },
          "tags": [ { "id": 1, "name": "React" } ]
        }
      ]
    }
  }
  ```

#### 2.2 Get Article Detail
- **URL**: `/articles/:id`
- **Method**: `GET`
- **Auth Required**: No
- **Description**: Automatically increments `view_count`.
- **Response** (Success - 200):
  ```json
  {
    "code": 0,
    "message": "Success",
    "data": {
      "id": 1,
      "title": "My First Blog Post",
      "content": "Markdown content...",
      // ... other fields
      "category": { ... },
      "author": { ... },
      "tags": [ ... ]
    }
  }
  ```
- **Response** (Error):
  - 404: Article not found

#### 2.3 Create Article
- **URL**: `/articles`
- **Method**: `POST`
- **Auth Required**: Yes
- **Body**:
  ```json
  {
    "title": "New Article",
    "content": "# Hello World",
    "summary": "Brief summary",
    "categoryId": 1,
    "tags": [1, 2],
    "cover_image": "/uploads/image.jpg",
    "status": 1
  }
  ```
  - `status`: 0 for Draft, 1 for Published
- **Response** (Success - 201):
  ```json
  {
    "code": 0,
    "message": "Article created successfully",
    "data": { ...article object... }
  }
  ```

#### 2.4 Update Article
- **URL**: `/articles/:id`
- **Method**: `PUT`
- **Auth Required**: Yes
- **Body**: (Same fields as Create, optional)
- **Response** (Success - 200):
  ```json
  {
    "code": 0,
    "message": "Article updated successfully",
    "data": { ...updated article object... }
  }
  ```

#### 2.5 Delete Article
- **URL**: `/articles/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes
- **Response** (Success - 200):
  ```json
  {
    "code": 0,
    "message": "Article deleted successfully"
  }
  ```

---

### 3. Categories

#### 3.1 Get All Categories
- **URL**: `/categories`
- **Method**: `GET`
- **Auth Required**: No
- **Response** (Success - 200):
  ```json
  {
    "code": 0,
    "message": "Success",
    "data": [
      { "id": 1, "name": "Technology", "code": "tech" },
      { "id": 2, "name": "Life", "code": "life" }
    ]
  }
  ```

#### 3.2 Create Category
- **URL**: `/categories`
- **Method**: `POST`
- **Auth Required**: Yes
- **Body**:
  ```json
  {
    "name": "Frontend",
    "code": "frontend"
  }
  ```
- **Response** (Success - 201):
  ```json
  {
    "code": 0,
    "message": "Category created successfully",
    "data": { "id": 3, "name": "Frontend", "code": "frontend" }
  }
  ```
- **Response** (Error):
  - 400: Category name already exists / Category code already exists

---

### 4. Tags

#### 4.1 Get All Tags
- **URL**: `/tags`
- **Method**: `GET`
- **Auth Required**: No
- **Response** (Success - 200):
  ```json
  {
    "code": 0,
    "message": "Success",
    "data": [
      { "id": 1, "name": "React" },
      { "id": 2, "name": "Node.js" }
    ]
  }
  ```

#### 4.2 Create Tag
- **URL**: `/tags`
- **Method**: `POST`
- **Auth Required**: Yes
- **Body**:
  ```json
  {
    "name": "Vue.js"
  }
  ```
- **Response** (Success - 201):
  ```json
  {
    "code": 0,
    "message": "Tag created successfully",
    "data": { "id": 3, "name": "Vue.js" }
  }
  ```

---

### 5. Upload

#### 5.1 Upload File
- **URL**: `/upload`
- **Method**: `POST`
- **Auth Required**: Yes
- **Content-Type**: `multipart/form-data`
- **Form Data**:
  - `file`: (Binary file data)
- **Response** (Success - 200):
  ```json
  {
    "code": 0,
    "message": "File uploaded successfully",
    "data": {
      "url": "/uploads/file-123456789.jpg"
    }
  }
  ```
- **Response** (Error):
  - 400: No file uploaded

---

### 6. Users (Admin Management)

#### 6.1 Get User List
- **URL**: `/users`
- **Method**: `GET`
- **Auth Required**: No (Currently public, consider securing if needed)
- **Response** (Success - 200):
  ```json
  {
    "code": 0,
    "message": "Success",
    "data": [ ...users... ]
  }
  ```

#### 6.2 Get User Detail
- **URL**: `/users/:id`
- **Method**: `GET`
- **Auth Required**: No
- **Response** (Success - 200):
  ```json
  {
    "code": 0,
    "message": "Success",
    "data": { ...user... }
  }
  ```

#### 6.3 Create User
- **URL**: `/users`
- **Method**: `POST`
- **Auth Required**: No (Currently public for initialization)
- **Body**:
  ```json
  {
    "username": "newuser",
    "password": "password",
    "nickname": "New User",
    "avatar": "url..."
  }
  ```
- **Response** (Success - 201):
  ```json
  {
    "code": 0,
    "message": "User created successfully",
    "data": { ...user... }
  }
  ```

---

### 7. System

#### 7.1 Health Check
- **URL**: `/health`
- **Method**: `GET`
- **Auth Required**: No
- **Response**:
  ```json
  {
    "code": 0,
    "message": "Server is healthy",
    "data": null
  }
  ```
