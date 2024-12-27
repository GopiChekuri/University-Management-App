import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js"; // Main App Component
import "./App.css"; // General styles for the app

// Render the App component into the DOM
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root") // Mounts the App to the element with id 'root'
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
