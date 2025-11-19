import React, { useState } from "react";
import {IonPage,IonContent,IonButton,} from "@ionic/react";
import { useHistory } from "react-router";
import AppInput from "../../components/UI/AppInput";
import { registerApi } from "../../api/auth.api"; 
import { AxiosError } from "axios";

const RegisterPage: React.FC = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onSubmit = async () => {
    console.log("onSubmit values:", {
    email,
    password,
    password2,
    pwd: password.trim(),
    pwd2: password2.trim(),
  });
    const pwd = password.trim();
    const pwd2 = password2.trim();

    if (!email || !pwd || !pwd2) {
      alert("Completa todos los campos");
      return;
    }

    if (pwd !== pwd2) {
      console.log("password:", JSON.stringify(pwd));
      console.log("password2:", JSON.stringify(pwd2));
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await registerApi(email, pwd); 
      alert("Usuario registrado correctamente. Ahora puedes iniciar sesión.");
      history.push("/login");
    } catch (error) {
      const err = error as AxiosError<any>;
      const raw =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Error al registrarse. Intenta con otro correo.";
      const msg = Array.isArray(raw) ? raw.join("\n") : String(raw);
      alert(msg);
      console.error(err.response?.data || err);
    }
  };

  return (
    <IonPage>
      <IonContent className="login-light" fullscreen>
        <div className="login-wrapper">
          <header className="login-header">
            <h1 className="login-title">Crear cuenta</h1>
            <h2 className="login-subtitle">
              Regístrate para comenzar a usar C10NA Movilidad.
            </h2>
          </header>

          <section className="login-card">
            <AppInput
              label="Correo electrónico"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="tucorreo@dominio.com"
            />

            <AppInput
              label="Contraseña"
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
              Registrarme
            </IonButton>

            <p
              className="login-register"
              style={{ marginTop: 16 }}
            >
              Ya tengo cuenta,{" "}
              <button
                type="button"
                className="link-button-strong"
                onClick={() => history.push("/login")}
              >
                iniciar sesión
              </button>
            </p>
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
