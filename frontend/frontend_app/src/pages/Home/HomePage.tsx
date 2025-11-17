import React from "react";
import {
  IonPage,
  IonContent,
  IonText,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { useAuth } from "../../hooks/useAuth";
import HomeMap from "../../components/Home/HomeMap";

const HomePage: React.FC = () => {
  const { user, logout } = useAuth();

  const onLogout = async () => {
    await logout();
  };

  const displayName = user?.email?.split("@")[0] ?? "usuario";

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonText>
          <h2>Hola, {displayName} 👋</h2>
        </IonText>
        <p>
          Elige una ciudad, revisa las rutas disponibles, consulta paraderos,
          horarios y comparte tu experiencia con el servicio.
        </p>

        <IonGrid className="ion-margin-vertical">
          <IonRow>
            <IonCol size="12">
              <IonButton
                expand="block"
                className="btn-primary-gradient"
                routerLink="/city/select"
              >
                SELECCIONAR CIUDAD
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="6">
              <IonButton expand="block" routerLink="/routes">
                VER RUTAS
              </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonButton expand="block" color="medium" routerLink="/profile">
                PERFIL
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Sección de mapa */}
        <HomeMap />

        <IonButton
          expand="block"
          fill="outline"
          color="medium"
          onClick={onLogout}
          className="ion-margin-top"
        >
          CERRAR SESIÓN
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
