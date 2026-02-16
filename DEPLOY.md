# Guestbook Project Deployment Guide

This project is set up as a monorepo containing both a NestJS backend and a React/Vite frontend.

## 1. Backend Deployment (Render)

We will deploy the `backend-api` folder to Render.

1.  Push your code to a GitHub repository.
2.  Log in to [Render](https://render.com/).
3.  Click **New +** -> **Web Service**.
4.  Connect your GitHub repository.
5.  Render will detect the `render.yaml` file in the root. Click **Apply**.
6.  Go to the **Environment** tab of your new service and add the following Environment Variables:
    -   `SUPABASE_URL`: (Your Supabase Project URL)
    -   `SUPABASE_KEY`: (Your Supabase Anon Key)
7.  Wait for the deployment to finish.
8.  **Copy the URL** of your deployed backend service (e.g., `https://guestbook-backend.onrender.com`). You will need this for the frontend.

## 2. Frontend Deployment (Vercel)

We will deploy the `frontend-ui` folder to Vercel.

1.  Log in to [Vercel](https://vercel.com/).
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  **Configure Project**:
    -   **Root Directory**: Click `Edit` and select `frontend-ui`.
    -   **Framework Preset**: It should automatically detect `Vite`.
    -   **Build Command**: `npm run build` (default).
    -   **Output Directory**: `dist` (default).
5.  **Environment Variables**:
    -   Expand the Environment Variables section.
    -   Add a new variable:
        -   **Key**: `VITE_API_URL`
        -   **Value**: The backend URL you copied from Render (e.g., `https://guestbook-backend.onrender.com`). *Do not include a trailing slash.*
6.  Click **Deploy**.

## Local Development

If you want to run this locally:

1.  **Backend**:
    ```bash
    cd backend-api
    npm install
    # Create a .env file with SUPABASE_URL and SUPABASE_KEY
    npm run start:dev
    ```

2.  **Frontend**:
    ```bash
    cd frontend-ui
    npm install
    # Create a .env file with VITE_API_URL=http://localhost:3000
    npm run dev
    ```
