// src/pages/Auth/LoginPage.tsx
import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonToggle,
  IonRow,
  IonCol,
} from "@ionic/react";
import { useHistory } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import AppInput from "../../components/UI/AppInput";
import { AxiosError } from "axios";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const onSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Por favor ingresa correo y contraseña");
      return;
    }

    try {
      await login(email.trim(), password.trim());

      // ✅ Después de un login exitoso navega al Home
      history.push("/home");

      // TODO: aquí podrías usar rememberMe para decidir
      // cómo guardar el token (persistente o solo sesión)
    } catch (error) {
      const err = error as AxiosError<any>;
      const rawMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Correo o contraseña incorrectos";

      const msg = Array.isArray(rawMsg) ? rawMsg.join("\n") : String(rawMsg);
      alert(msg);
      console.error(err.response?.data || err);
    }
  };

  return (
    <IonPage>
      <IonContent className="login-light" fullscreen>
        <div className="login-wrapper">
          {/* Cabecera */}
          <header className="login-header">
            <h1 className="login-title">C10NA</h1>
            <h2 className="login-subtitle">Iniciar sesión</h2>
          </header>

          {/* Tarjeta principal */}
          <section className="login-card">
            <AppInput
              label="Correo electrónico / Nombre de usuario"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="correoelectrónico@dominio.com"
            />

            <AppInput
              label="Contraseña"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="********"
            />

            <IonButton
              expand="block"
              className="btn-login-light ion-margin-top"
              onClick={onSubmit}
            >
              Iniciar sesión
            </IonButton>

            {/* Recordarme + Olvidaste tu contraseña */}
            <IonRow className="login-options ion-margin-top">
              <IonCol size="6" className="login-remember">
                <IonToggle
                  checked={rememberMe}
                  onIonChange={(e) => setRememberMe(e.detail.checked)}
                />
                <span>Recordarme</span>
              </IonCol>

              <IonCol size="6" className="login-forgot">
                <button
                  type="button"
                  className="link-button"
                  onClick={() => history.push("/forgot-password")}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </IonCol>
            </IonRow>

            {/* Divider */}
            <div className="login-divider">
              <span className="line" />
              <span className="dot" />
              <span className="line" />
            </div>

            {/* Registro */}
            <p className="login-register">
              ¿No eres usuario?{" "}
              <button
                type="button"
                className="link-button-strong"
                onClick={() => history.push("/register")}
              >
                Regístrate aquí
              </button>
            </p>

            {/* Términos */}
            <p className="login-terms">
              Al hacer clic en continuar, aceptas nuestros{" "}
              <span className="link-inline">Términos de servicio</span> y{" "}
              <span className="link-inline">Política de privacidad</span>.
            </p>
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
