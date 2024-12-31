# Supa-Chat

Welcome to Supa-Chat! This is a simple chat application built with **Next.js**, **Supabase**, and **Socket.io**. The project aims to provide real-time chat functionality with an intuitive user interface.

## Table of Contents

-   [Features](#features)
-   [Technologies](#technologies)
-   [Getting Started](#getting-started)
-   [Scripts](#scripts)
-   [Dependencies](#dependencies)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   Real-time messaging using Socket.io
-   User authentication with Supabase
-   Responsive design with Tailwind CSS
-   Accessible UI components from Radix UI

## Technologies

-   **Next.js**: A React framework for building server-rendered applications.
-   **Supabase**: A backend-as-a-service that provides database and authentication functionalities.
-   **Socket.io**: A library for real-time web applications.
-   **Tailwind CSS**: A utility-first CSS framework for designing custom user interfaces.

## Getting Started

To get a local copy of this project up and running, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/akashdebnath-swe/supa-chat
    cd supa-chat
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up Supabase:**

    - Create a Supabase project and set up authentication and database.
    - Update the environment variables in `.env.local` with your Supabase credentials.

4. **Run the application:**

    ```bash
    npm run dev
    ```

5. **Open your browser and navigate to:**
    ```
    http://localhost:3000
    ```

## Scripts

The following scripts are available for use:

-   `dev`: Start the development server.
-   `build`: Build the application for production.
-   `start`: Start the production server.
-   `lint`: Lint the codebase using ESLint.

## Dependencies

This project uses the following key packages:

```json
{
    "dependencies": {
        "@radix-ui/react-alert-dialog": "^1.1.1",
        "@radix-ui/react-dialog": "^1.1.1",
        "@radix-ui/react-dropdown-menu": "^2.1.1",
        "@radix-ui/react-icons": "^1.3.0",
        "@radix-ui/react-label": "^2.1.0",
        "@radix-ui/react-separator": "^1.1.0",
        "@radix-ui/react-slot": "^1.1.0",
        "@supabase/ssr": "^0.5.1",
        "@supabase/supabase-js": "^2.45.3",
        "class-variance-authority": "^0.7.0",
        "clsx": "^2.1.1",
        "google-one-tap": "^1.0.6",
        "lucide-react": "^0.438.0",
        "next": "14.2.8",
        "next-themes": "^0.3.0",
        "react": "^18",
        "react-dom": "^18",
        "sonner": "^1.7.1",
        "tailwind-merge": "^2.5.2",
        "tailwindcss-animate": "^1.0.7",
        "uuid": "^10.0.0",
        "zustand": "^4.5.5"
    },
    "devDependencies": {
        "@types/google-one-tap": "^1.2.6",
        "@types/node": "^20",
        "@types/react": "^18",
        "@types/react-dom": "^18",
        "@types/uuid": "^10.0.0",
        "eslint": "^8",
        "eslint-config-next": "14.2.8",
        "postcss": "^8",
        "supabase": "^1.192.5",
        "tailwindcss": "^3.4.1",
        "typescript": "^5"
    }
}
```

## Contributing

Contributions are welcome! If you have suggestions for improvements or want to report bugs, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
