# Pawmora 🐾

A TikTok-style video feed application designed specifically for pet lovers! Pawmora allows users to scroll through an endless feed of adorable pets, save their favorites, and engage with the community through comments and likes. This platform helps shelters showcase their pets to a wider audience and increase their chances of adoption.

## Features

-   **Vertical Video Feed**: Immersive, full-screen portrait video experience optimized for mobile and desktop.
-   **Interactive Engagement**:
    -   **Paw Likes**: Show your appreciation with a custom paw-print like button.
    -   **Comments**: Toggleable comment section to discuss your favorite furry friends.
    -   **Saves**: Bookmark videos to your personal collection.
-   **Canadian Content**: Featuring a curated selection of pets from across Canada (Toronto, Vancouver, Montreal, and more!).
-   **User Authentication**: Secure sign-up and login functionality powered by Supabase.

## Tech Stack

This project is built with a modern, high-performance stack:

-   **Frontend Framework**: [React](https://react.dev/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **Backend/Auth**: [Supabase](https://supabase.com/)

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

-   Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

1.  **Clone the repository**
    ```sh
    git clone <YOUR_GIT_URL>
    ```

2.  **Navigate to the project directory**
    ```sh
    cd Pawmora
    ```

3.  **Install dependencies**
    ```sh
    npm install
    ```

4.  **Start the development server**
    ```sh
    npm run dev
    ```

5.  **Open your browser**
    Navigate to `http://localhost:8080` (or the port shown in your terminal) to view the app.

## Project Structure

-   `src/pages`: Main application pages (VideoFeed, Profile, etc.).
-   `src/components`: Reusable UI components.
-   `src/data`: Mock data and static assets configuration.
-   `public/videos`: Local video assets.
