import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
} from "@ionic/react";
import AppInput from "../../components/UI/AppInput";
import { resetPasswordApi } from "../../api/auth.api";
import { AxiosError } from "axios";
import { useHistory, useLocation } from "react-router";

const ResetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");
    if (emailParam) setEmail(emailParam);
  }, [location.search]);

  const onSubmit = async () => {
    if (!email || !code || !password) {
      alert("Completa todos los campos");
      return;
    }
    if (password !== password2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await resetPasswordApi(email, code, password);
      alert("Contraseña actualizada correctamente. Ahora puedes iniciar sesión.");
      history.push("/login");
    } catch (error) {
      const err = error as AxiosError<any>;
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "No pudimos actualizar la contraseña.";
      alert(Array.isArray(msg) ? msg.join("\n") : String(msg));
      console.error(err.response?.data || err);
    }
  };

  return (
    <IonPage>
      <IonContent className="login-light" fullscreen>
        <div className="login-wrapper">
          <header className="login-header">
            <h1 className="login-title">C10NA</h1>
            <h2 className="login-subtitle">Restablecer contraseña</h2>
          </header>

          <section className="login-card">
            <AppInput
              label="Correo electrónico"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="correoelectrónico@dominio.com"
            />
            <AppInput
              label="Código recibido"
              type="text"
              value={code}
              onChange={setCode}
              placeholder="Ingresa el código"
            />
            <AppInput
              label="Nueva contraseña"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="********"
            />
            <AppInput
              label="Confirmar contraseña"
              type="password"
              value={password2}
              onChange={setPassword2}
              placeholder="********"
            />

            <IonButton
              expand="block"
              className="btn-login-light ion-margin-top"
              onClick={onSubmit}
            >
              Cambiar contraseña
            </IonButton>
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ResetPasswordPage;
