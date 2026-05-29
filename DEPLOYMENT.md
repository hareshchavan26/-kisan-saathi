# Kisan Saathi Deployment Guide 🚀

This guide provides step-by-step instructions to successfully deploy the **Kisan Saathi** application (React frontend + Node/Express backend + SQLite database).

---

## 🏛️ Architecture Overview
- **Frontend**: A React + Vite SPA. We will deploy this on **Vercel** (completely free, lightning-fast).
- **Backend & Database**: A Node/Express API with Prisma ORM. We will deploy this on **Render** (free tier supports full-stack Node.js web services with SQLite).

---

## 🔍 Why Did Your Initial Deployment Fail?
1. **Root Directory Misconfiguration**: 
   Since your project is a monorepo containing `/frontend` and `/backend` subdirectories, Vercel/Render will fail by default if they try to build from the root folder (because there is no `package.json` at the root). You **must** specify the correct subfolder as the **Root Directory**.
2. **Database Initialization**:
   Prisma requires generating the client and pushing/seeding the database. We have modified the backend `package.json` `"start"` script to automatically run `npx prisma db push && node prisma/seed.js` on startup. This makes your backend completely self-initializing!
3. **API URL Environment Variable**:
   The frontend needs to know where the backend is hosted. You must set the `VITE_API_URL` environment variable in Vercel to point to your deployed backend URL.

---

## 🛠️ Step 1: Push the Automatic Database Startup Fix
We updated the `backend/package.json` to automatically build and seed the database on every startup:
```json
"start": "npx prisma db push && node prisma/seed.js && node src/index.js"
```
To push this fix to your GitHub repo, run these commands in your local terminal:
```bash
git add backend/package.json
git commit -m "chore: make backend self-initialize database on startup"
git push
```

---

## 💻 Step 2: Deploy the Backend on Render
Render is perfect for hosting the Express backend. It will run the server and host your SQLite database inside the container.

1. Go to **[Render.com](https://render.com/)** and sign in using your GitHub account.
2. Click **New +** and select **Web Service**.
3. Select your **`-kisan-saathi`** repository.
4. Configure the Web Service settings:
   - **Name**: `kisan-saathi-backend`
   - **Environment**: `Node`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Scroll down and click **Advanced** to add **Environment Variables**:
   - `PORT`: `3001`
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: `file:./dev.db` (This stores the database in the backend container)
   - `FRONTEND_URL`: `https://your-vercel-frontend-domain.vercel.app` (You can update this after deploying the frontend)
6. Click **Create Web Service**.

Render will now build your backend, automatically generate the Prisma client, run the database migrations, seed the 10 schemes, and start the Express server.
> [!NOTE]
> Copy the generated Render URL (e.g., `https://kisan-saathi-backend.onrender.com`). You will need this for the frontend!

---

## 🌐 Step 3: Deploy the Frontend on Vercel
Vercel is the recommended platform for hosting the Vite-built React frontend.

1. Go to **[Vercel.com](https://vercel.com/)** and log in with your GitHub account.
2. Click **Add New** > **Project**.
3. Import your **`-kisan-saathi`** repository.
4. In the **Configure Project** screen, customize these settings:
   - **Framework Preset**: `Vite` (automatically detected)
   - **Root Directory**: Click *Edit* and select **`frontend`**. **(CRITICAL STEP)**
5. Expand the **Environment Variables** section and add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-render-backend-url.onrender.com` (Use the URL you copied from Render in Step 2)
6. Click **Deploy**.

Vercel will successfully build and host your frontend application!

---

## 🔄 Step 4: Link Frontend and Backend URLs
Once both are deployed, make sure they are connected:
1. Copy the Vercel deployment URL (e.g., `https://kisan-saathi-three.vercel.app`).
2. Go to your Render Dashboard for `kisan-saathi-backend`.
3. Navigate to **Environment**, find the `FRONTEND_URL` variable, update its value to your Vercel URL, and save.
4. Render will automatically redeploy the backend with the correct CORS configuration, and your app will be **fully functional**! 🎉
