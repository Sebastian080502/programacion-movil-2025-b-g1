// src/pages/Auth/LoginPage.tsx
import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonText,
  IonButton,
  IonImg,
} from "@ionic/react";
import { useAuth } from "../../hooks/useAuth";
import AppInput from "../../components/UI/AppInput";

const LoginPage: React.FC = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    try {
      await login(email, password);
    } catch (err) {
      console.error(err);
      alert("Credenciales incorrectas");
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 24,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <IonImg
              src="/assets/logo.png"
              alt="Logo"
              style={{ maxWidth: 160, margin: "0 auto 16px" }}
            />
            <IonText color="primary">
              <h1>C10NA Movilidad</h1>
            </IonText>
            <p>Inicia sesión para explorar rutas, paraderos y horarios.</p>
          </div>

          <div className="card-modern">
            <AppInput
              label="Correo electrónico"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="ejemplo@correo.com"
            />
            <AppInput
              label="Contraseña"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
            />

            <IonButton
              expand="block"
              className="btn-primary-gradient ion-margin-top"
              onClick={onSubmit}
            >
              INGRESAR
            </IonButton>

            <IonButton
              expand="block"
              fill="clear"
              color="primary"
              routerLink="/register"
              className="ion-margin-top"
            >
              ¿No tienes cuenta? Regístrate
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
