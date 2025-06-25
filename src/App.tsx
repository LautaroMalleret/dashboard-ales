
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./features/login/Login";
import Dashboard from "./features/dashboard/Dashboard"; // lo creamos luego


//funcion principal de la aplicación
// que renderiza el router y las rutas
// la ruta principal es el login
// y la ruta del dashboard es protegida
// solo se puede acceder si el usuario está logueado
export default function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        { <Route path="/dashboard" element={<Dashboard />} /> }
      </Routes>
    </Router>

  );
}

