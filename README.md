# 📝 Blog Application

A full-stack blogging platform built with **React.js, Appwrite, Redux Toolkit, and TinyMCE**. It allows users to create, edit, and manage blog posts with a rich text editor and secure authentication.

---

## 🚀 Features

- 📝 Create, edit, and delete blog posts (CRUD)
- 🔐 User authentication with Appwrite
- 🧠 Global state management using Redux Toolkit
- 🖼️ Image upload support
- 🔗 Automatic slug generation
- ✍️ Rich text editor (TinyMCE)
- 🎨 Responsive UI

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Redux Toolkit  
- **Backend:** Appwrite  
- **Editor:** TinyMCE  
- **Styling:** CSS / Tailwind   

---

## ⚙️ Installation & Setup

```bash
git clone https://github.com/kunal-lagad/BlogApp.git
cd BlogApp
npm install
npm run dev

##Setup Environment Variables 

VITE_APPWRITE_URL=your_appwrite_url
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id