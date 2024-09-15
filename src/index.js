import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/home/home';
import Contact from './components/contact/contact';
import Start from './components/quiz/start/start';
import QWizard from './components/quiz/qwizard/qwizard';

const router = createBrowserRouter([
  {
    path: "/",
    element:  <App/>,
    children:[
      {
        path: "home",
        element: <Home/>
      },
      {
        path: "Start",
        element: <Start/>
      },
      {
        path: "contact",
        element: <Contact/>
      },
      {
        path: "QuizWizard",
        element: <QWizard/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
