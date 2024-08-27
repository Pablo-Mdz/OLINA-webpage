### Index

1. [Project Overview](#project-overview)
2. [How to Use the App](#how-to-use-the-app)
   - [Clone the Repository](#clone-the-repository)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
   - [Environment Variables](#environment-variables)
3. [Development Environment Setup](#development-environment-setup)
   - [Docker Installation](#docker-installation)
   - [Environment Variable Configuration](#environment-variable-configuration)
   - [Starting the Docker Container](#starting-the-docker-container)
4. [Deployment](#deployment)
5. [Additional Documentation](#additional-documentation)
6. [Participants](#participants)

## Project Overview

This project was primarily developed using **JavaScript**. For the backend, we utilized [Express](https://expressjs.com/), and [MongoDB](https://www.mongodb.com/) was employed as the non-relational database. The frontend was built using [React](https://react.dev/).

The general idea behind this project was to approach it as closely as possible to a professional workflow. **We collaborated with two UX/UI designers** whose work can be found on this [Figma link](https://www.figma.com/design/Y6sBPY04gNVRd69kBeNTQt/OLINA'S-BLOG---Janine%2C-Bori?node-id=18-2).

The process involved creating Pull Requests (PRs), conducting code reviews, and completing the Pull Request Template. Once approved, the changes were merged using the “Squash and merge” method.
For our commits, we have been using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (feat, refactor, docs, fix, style, chore, test).

**Design Collaboration**

We worked with two UX/UI designers to create the visual and interactive elements of this project. Their work is documented in this Figma link.

## How to Use the App

### Clone the Repository

1. First, clone the repository to your local machine:

#### Backend Setup

To set up the backend:

1.  Navigate to the backend directory.

```bash
cd OLINA-webpage
```

2.  Install the necessary dependencies:

```bash
npm install
npm run dev
```

#### Frontend Setup

To set up the frontend:

1.  Navigate to the client directory:

```bash
cd client
```

2.  Install the necessary dependencies:

```bash
npm install
```

3.  Start the frontend server in development mode

```bash
npm run dev
```

4. Environment Variables

Before running the application, ensure that you copy the **.env.template** file and rename it to **.env.** This will allow you to configure the environment variables needed for both the backend and frontend.

---

### Development Environment Setup

For development, we’ve used MongoDB through [Docker](https://www.docker.com/). This allows each developer to have a local database where they can make all the necessary changes for their tasks without affecting the production database.

Docker Installation

1.  Ensure Docker is installed on your system. If it isn’t, you can download it from this URL.

(Please note, you may need to create an account on Docker.)

Environment Variable Configuration

2.  Update your .env file: Replace the existing MongoDB URL with the following:

```js
MONGO_URI=mongodb://localhost:27017/oliinadb
```

Starting the Docker Container

3.  To start the Docker container, use the command:

```bash
docker-compose up -d
```

This will spin up a MongoDB instance that is accessible locally via mongodb://mongo:27017/oliinadb.

### Deployment

The application has been deployed on a **VPS** using [Dokku](https://dokku.com/). You can view the live app at the following URL:

[Olina](https://olina.versanetsolutions.com/)

---

### Additional Documentation

For more detailed information about the backend and frontend implementations, please refer to the respective README files located in their directories.

---

### Participants:

**Developers:**

- [Dilara Deniz Saganak](https://www.linkedin.com/in/dilara-deniz-saganak-45190b146/)
- [Pablo Cigoy](https://www.linkedin.com/in/pablo-cigoy/)
- [Antonio Saleme](https://www.linkedin.com/in/antonio-saleme-sastre/)

**UX/UI Designers:**

- [Borbala Nemes](https://www.linkedin.com/in/borinemes/)
- [Janine Wieting](https://www.linkedin.com/in/janine-wieting/)
