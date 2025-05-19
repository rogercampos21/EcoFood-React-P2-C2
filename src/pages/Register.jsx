import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../services/firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { saveUserData } from "../services/userService";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [comuna, setComuna] = useState("");
  const [telefono, setTelefono] = useState("");
  const navigate = useNavigate();
  const tipo = "cliente"; 

  const validatePassword = (password) => {
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    return password.length >= 6 && hasNumber && hasLetter;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      Swal.fire("Error", "La contraseña debe tener 6+ caracteres, incluyendo letras y números", "error");
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(cred.user); 

      await saveUserData(cred.user.uid, {
        nombre,
        email,
        direccion,
        comuna,
        telefono,
        tipo,
      });

      Swal.fire("Registrado", "Usuario creado correctamente. Verifica tu correo antes de iniciar sesión.", "success");
      navigate("/login");
    } catch (error) {
      Swal.fire("Error", "No se pudo registrar el usuario", "error");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro de Cliente</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre completo</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            id="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="comuna" className="form-label">Comuna</label>
          <input
            type="text"
            className="form-control"
            id="comuna"
            value={comuna}
            onChange={(e) => setComuna(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono (opcional)</label>
          <input
            type="text"
            className="form-control"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo de usuario</label>
          <input type="text" className="form-control" value={tipo} disabled />
        </div>
        <button type="submit" className="btn btn-success">Registrar</button>
      </form>
    </div>
  );
}
