import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth"; // Importa la función de login desde tu API

// login del usuario
// muestra un formulario para ingresar email y contraseña
// al enviar el formulario, hace una petición a la API para iniciar sesión
//verifica si el usuario existe y las credenciales son correctas
// si es así, guarda el token en localStorage y redirige al dashboard
// si no, muestra un mensaje de error

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // try {
    //   const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, password })
    //   });

    //   if (!res.ok) {
    //     const err = await res.json();
    //     throw new Error(err.error || "Error al iniciar sesión");
    //   }

    //   const data = await res.json();
    //   localStorage.setItem("token", data.token);
    //   navigate("/dashboard");
    // } catch (err: unknown) {
    //   if (err instanceof Error) {
    //     setError(err.message);
    //   } else {
    //     setError("Error al iniciar sesión");
    //   }
    // }
    try {
    const token = await login(email, password);
    localStorage.setItem("token", token);
    navigate("/dashboard");
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Error al iniciar sesión");
    }
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Iniciar sesión</h2>
        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}




