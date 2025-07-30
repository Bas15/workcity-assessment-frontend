# WorkCity Assessment – Frontend

This is the **frontend dashboard** for the WorkCity Assessment project. It provides a modern, responsive admin interface for managing clients and their projects. Built with **React**, **Vite**, **Tailwind CSS**, and **Redux Toolkit**, it connects to a RESTful backend for real-time data management.
website link: (https://workcity-assessment-frontend-opal.vercel.app)
Note: The backend server may take 25-40 seconds to wind up

---

## 🚀 Features

- 🔐 User authentication (login/signup)
- 🧑 Client management (create, edit, delete, view)
- 📁 Project management (create, edit, delete, view)
- 📊 Dashboard UI with dark mode styling
- 🌐 Connected to a secure backend via Axios
- ⚡ Fast development with Vite
- 🎨 Fully responsive and styled with Tailwind CSS
- 🧰 Centralized state management with Redux Toolkit

---

## 🛠️ Tech Stack

- **Frontend Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Icons:** Heroicons
- **Form Handling:** React Hook Form (optional)

---

## 📁 Project Structure

src/
│
├── assets/ # Images, logos, etc.
├── components/ # Reusable UI components
├── features/ # Redux slices and logic
├── pages/ # Page views (Login, Dashboard, etc.)
├── routes/ # Route definitions
├── store/ # Redux store configuration
├── utils/ # Utility functions
├── App.tsx # Root component
└── main.tsx # App entry point


---

## 🔧 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/workcity-assessment-frontend.git
cd workcity-assessment-frontend
```
npm install
# or
yarn

### 2. Create .env
VITE_API_BASE_URL=https://workcity-assessment-backend-mbvl.onrender.com

### 3. Run App
npm run dev


## Ui Preview

<img width="1059" height="554" alt="image" src="https://github.com/user-attachments/assets/276db25e-6cf7-459b-9835-a0d137887037" />
<img width="1357" height="551" alt="image" src="https://github.com/user-attachments/assets/b9c91c8d-45e9-4dd4-979d-ff4ea4f9c776" />
<img width="1355" height="633" alt="image" src="https://github.com/user-attachments/assets/720eab0f-0f06-4bc0-a551-9f4dca073f85" />














# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
