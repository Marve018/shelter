# Shelter

Shelter is a web application designed to help users find and book properties. It provides a wide range of properties for lease and purchase, ensuring there's something for everyone. The project is built using the MERN stack (MongoDB, Express.js, React, Node.js).

## Table of Contents

- [Shelter](#shelter)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Start the backend server](#start-the-backend-server)
  - [Frontend Setup](#frontend-setup)
  - [Usage](#usage)
  - [Routes](#routes)
  - [Backend Routes](#backend-routes)
    - [Auth Routes](#auth-routes)
    - [Booking Routes](#booking-routes)
    - [Frontend Routes](#frontend-routes)
  - [Contributing](#contributing)

## Features

- User authentication and authorization
- Property listing with detailed information
- Booking functionality for logged-in users
- Responsive and visually appealing UI
- Role-based access control

## Tech Stack

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Cloudinary (for image storage)
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: CSS, Animations

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MongoDB instance running
- A Cloudinary account for storing property images

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/shelter.git
   cd shelter

2. Install dependencies:
   cd backend
   npm install

3. Set up environment variables:
   Create a .env file in the backend directory and add the following variables:

```text
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   ```

## Start the backend server

```bash
node server.js
```

## Frontend Setup

Navigate to the frontend directory:

```bash
cd ../frontend
npm install
npm start
```

## Usage

. Open your browser and navigate to <http://localhost:3000>.
. Register a new user or log in with an existing account.
. Browse the available properties.
. View property details by clicking on a property card.
. Book a property by filling out the booking form.

## Routes

## Backend Routes

### Auth Routes

POST /api/auth/register - Register a new user
POST /api/auth/login - Log in a user
Property Routes

GET /api/properties - Get all properties
GET /api/properties/:id - Get a property by ID
POST /api/properties - Create a new property (admin only)
PUT /api/properties/:id - Update a property (admin only)
DELETE /api/properties/:id - Delete a property (admin only)

### Booking Routes

POST /api/bookings/property/:id - Book a property

### Frontend Routes

/ - Landing page
/login - Login page
/register - Registration page
/properties - Property listing page
/property/:id - Property detail page

## Contributing

We welcome contributions to Shelter! To contribute, follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature-name).
Make your changes.
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/your-feature-name).
Open a pull request.
@Yuntech (www.github.com/Yuntech1)
