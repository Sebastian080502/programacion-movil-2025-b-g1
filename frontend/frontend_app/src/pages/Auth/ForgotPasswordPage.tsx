import React, { useState } from "react";
import {IonPage,IonContent,IonButton,IonText,} from "@ionic/react";
import AppInput from "../../components/UI/AppInput";
import { requestPasswordResetApi } from "../../api/auth.api";
import { AxiosError } from "axios";
import { useHistory } from "react-router";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();

  const onSubmit = async () => {
    if (!email) {
      alert("Por favor ingresa tu correo electrónico");
      return;
    }

    try {
      await requestPasswordResetApi(email);
      alert("Te hemos enviado un código a tu correo.");
      history.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error) {
      const err = error as AxiosError<any>;
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "No pudimos enviar el correo. Intenta de nuevo.";
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
            <h2 className="login-subtitle">Recuperar contraseña</h2>
          </header>

          <section className="login-card">
            <IonText>
              <p style={{ fontSize: 14, marginBottom: 16 }}>
                Ingresa tu correo. Te enviaremos un código para restablecer tu
                contraseña.
              </p>
            </IonText>

            <AppInput
              label="Correo electrónico"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="correoelectrónico@dominio.com"
            />

            <IonButton
              expand="block"
              className="btn-login-light ion-margin-top"
              onClick={onSubmit}
            >
              Enviar código
            </IonButton>
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPasswordPage;
