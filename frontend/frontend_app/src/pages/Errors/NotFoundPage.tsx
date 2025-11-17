import React from "react";
import { IonPage, IonContent, IonText, IonButton } from "@ionic/react";

const NotFoundPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding ion-text-center">
        <IonText color="danger">
          <h2>404</h2>
        </IonText>
        <p>Página no encontrada</p>

        <IonButton routerLink="/home" className="ion-margin-top">
          Ir al inicio
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default NotFoundPage;
