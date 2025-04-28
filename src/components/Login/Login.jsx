import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const apiUrl = `${import.meta.env.VITE_API_URL}/Colaboradores/login`;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(apiUrl, {
        username,
        password,
      });

      // Extraer datos de la respuesta
      const { token, userType, roles } = response.data;

      // Guardar los datos en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userType", userType);
      localStorage.setItem("roles", JSON.stringify(roles));

      // Navegar a la página principal
      navigate("/home");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      // Redirigir a la página de inicio en caso de error
      navigate("/");
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center">
      <div className="card shadow-lg p-6 w-96 ">
        <h2 className="text-center text-2xl font-bold mb-4">Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Usuario</span>
            </label>
            <input
              type="text"
              placeholder="Ingresa tu usuario"
              className="input input-bordered w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Contraseña</span>
            </label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-4">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
