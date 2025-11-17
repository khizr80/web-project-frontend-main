# CodeInsight
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/khizr80/web-project-frontend-main)

CodeInsight is a web-based Integrated Development Environment (IDE) designed to help you write, analyze, and optimize your code. It provides a seamless experience for developers with features like a powerful code editor, real-time complexity analysis, and smart suggestions to improve code quality.

## Features

-   **Online Code Editor**: A rich, responsive code editor powered by Monaco Editor, supporting multiple languages including JavaScript, Python, Java, and C++.
-   **File Management**: A built-in file explorer to create, delete, and manage your project files within a personal workspace. Unsaved changes are tracked visually.
-   **Code Execution**: Run your code directly within the IDE and view the output instantly.
-   **Code Analysis**: For JavaScript files, get real-time feedback on time and space complexity, along with actionable suggestions and best practices to optimize your code.
-   **User Authentication**: Secure sign-up, login, and session management to keep your workspace private.
-   **Account Settings**: Users can update their profile picture and change their password.
-   **Responsive Design**: A user-friendly interface that adapts to both desktop and mobile devices.

## Tech Stack

-   **Framework**: React (with Vite)
-   **State Management**: Redux Toolkit
-   **Routing**: React Router
-   **Styling**: Tailwind CSS
-   **Code Editor**: Monaco Editor
-   **Form Validation**: Zod
-   **HTTP Client**: Axios
-   **Linting**: ESLint

## Project Structure

The project follows a standard React application structure:

```
src/
├── api/          # Functions for making API calls
├── axios/        # Axios instance configuration
├── components/   # Reusable React components
├── config/       # Application configuration and constants
├── layouts/      # Main layout components (Navbar, Footer)
├── pages/        # Top-level page components for each route
├── redux/        # Redux store and feature slices
├── utils/        # Utility functions
└── zod/          # Zod schemas for data validation
```

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm or yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/khizr80/web-project-frontend-main.git
    cd web-project-frontend-main
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add the URL of your backend server:
    ```env
    VITE_BACKEND_URL=http://localhost:8000
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Available Scripts

In the project directory, you can run:

-   `npm run dev`: Starts the development server with Hot Module Replacement (HMR).
-   `npm run build`: Builds the app for production to the `dist` folder.
-   `npm run lint`: Lints the project files using ESLint.
-   `npm run preview`: Serves the production build locally to preview it.

## Deployment

This project is configured for easy deployment on Vercel. The `vercel.json` file includes a rewrite rule to handle client-side routing correctly.
