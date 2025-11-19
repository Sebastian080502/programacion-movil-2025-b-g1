import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/react";

const HomeMap: React.FC = () => {
  return (
    <IonCard className="ion-margin-top home-map-card">
      <IonCardHeader>
        <IonCardSubtitle>Vista rápida</IonCardSubtitle>
        <IonCardTitle>Mapa de rutas</IonCardTitle>
      </IonCardHeader>

      <div className="home-map-container">
        <span>🎯 Aquí irá el mapa interactivo de rutas</span>
      </div>
    </IonCard>
  );
};

export default HomeMap;
