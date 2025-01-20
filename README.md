## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Documentation](#api-documentation)
6. [Testing](#testing)
7. [Contributing](#contributing)
8. [License](#license)

## Project Overview

The Node.js backend API serves as the backend for room_sim_web.

Key Features:
- **CRUD Operations**: Create, Read, Update, and Delete operations for items.
- **Database Integration**: Unsure yet

## Tech Stack

- **Backend**: Node.js
- **Environment Variables**: dotenv
- **API Testing**: Supertest

## Installation

Follow these steps to set up the backend locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dangkyle64/simulate_room_nodejs
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Usage

To use the API, you can make HTTP requests to the endpoints.

- **Test the API**:
  - You can use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to interact with the API.
  - https://simulate-room-nodejs.onrender.com/ 
## API Documentation

### Get Object
- **Endpoint**: `GET /home`
- **Description**: Retrieves an object with a message property
- **Response**:
  ```json
    {
      "message": "Hello from the backend.",
    }
  ```

## Testing

To run the tests:

1. Ensure that all dependencies are installed:
   ```bash
   npm install
   ```

2. Run the tests:
   ```bash
   npm test
   ```

Tests will run and show results in the console.

## Contributing

We welcome contributions to this project! Here's how you can help:

1. **Fork** the repository and clone it to your local machine.
2. **Create a new branch** for your changes.
3. **Make your changes** and write tests if applicable.
4. **Commit** your changes.
5. **Push** your changes and create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
