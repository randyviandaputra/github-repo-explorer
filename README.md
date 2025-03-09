# GitHub Repositories Explorer

## 📖 Overview
**GitHub Repositories Explorer** is a **React-based web application** that allows users to search for GitHub users and explore their repositories. The app is built using **React, TypeScript, React Query, React Hook Form, Tailwind CSS, and Jest** for testing.

---

## 🚀 Features
- 🔍 **Search GitHub users** using the **GitHub REST API**.
- 📂 **View repositories** of a selected user.
- 📌 **Displays repository details**, including **stars count** and description.
- ⚡ **Optimized data fetching** with **React Query** for caching and performance.
- 🎨 **Styled with Tailwind CSS** for a responsive UI.
- ✅ **Unit & integration tests** with Jest and React Testing Library.


---

## 📂 Project Structure
```plaintext
github-repo-explorer
│── src
│   ├── components
│   │   ├── SearchForm/         
│   │   ├── UserRepoAccordion/ 
│   ├── services/
│   │   ├── api.ts              
│   ├── tests/
│   ├── types/                  
│   ├── App.tsx                 
│── public/
│── .env                        
│── package.json
│── vite.config.ts
│── README.md
```

## 🔧 Installation & Setup

### Clone the Repository
```sh
git clone https://github.com/randyviandaputra/github-repo-explorer.git
cd github-repo-explorer
npm install
```

### Set Up Environment Variables
Create a `.env` file in the root directory and add:
```ini
VITE_GITHUB_API_URL=https://api.github.com
```

### Start the Development Server
```sh
npm run dev
```

### Running Tests
To run unit and integration tests:
```sh
npm run test
```
