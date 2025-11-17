import React, { useState } from "react";
import {IonPage,IonContent,IonText,IonButton,} from "@ionic/react";
import AppInput from "../../components/UI/AppInput";
import { useAuth } from "../../hooks/useAuth";
import { AxiosError } from "axios";

const RegisterPage: React.FC = () => {
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onSubmit = async () => {
    if (!email || !password) {
      alert("Por favor llena todos los campos");
      return;
    }

    if (password !== password2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await register(email, password);
      alert("Cuenta creada con éxito 🎉");
      // register ya guarda token y user y el router te mandará a /home
    } catch (err) {
      console.error(err);
      alert("Error al registrarse. Revisa los datos o intenta con otro correo.");
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
            <IonText color="primary">
              <h1>Crear cuenta</h1>
            </IonText>
            <p>Regístrate para comenzar a usar C10NA Movilidad.</p>
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
            <AppInput
              label="Confirmar contraseña"
              type="password"
              value={password2}
              onChange={setPassword2}
              placeholder="Repite la contraseña"
            />

            <IonButton
              expand="block"
              className="btn-primary-gradient ion-margin-top"
              onClick={onSubmit}
            >
              Registrarme
            </IonButton>

            <IonButton
              expand="block"
              fill="clear"
              color="light"
              routerLink="/login"
              className="ion-margin-top"
            >
              Ya tengo cuenta, iniciar sesión
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
