import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import Swal from "sweetalert2";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire("Campo vacío", "Por favor ingresa tu correo", "warning");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire(
        "Correo enviado",
        "Revisa tu bandeja de entrada para restablecer tu contraseña.",
        "success"
      );
    } catch (error) {
      Swal.fire("Error", "No se pudo enviar el correo. ¿Está registrado?", "error");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleReset}>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-warning">Enviar correo</button>
      </form>
    </div>
  );
}
