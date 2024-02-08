import React from 'react';
import ReactDOM from 'react-dom/client';
import Trade from './pages/trade.js';
import {
	createBrowserRouter,
	RouterProvider,
  } from "react-router-dom";
import './index.css';
import App from './pages/Home.js';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
	{
	  path: "/trade",
	  element: <Trade />
	},
	{
		path: "/",
		element: <App/>
	}
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       <RouterProvider router={router} />
  </React.StrictMode>
);


reportWebVitals();
