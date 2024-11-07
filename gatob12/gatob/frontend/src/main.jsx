// JS
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

// Components

// Styles
import './index.css';

// Project
import router from "@/router/router.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)