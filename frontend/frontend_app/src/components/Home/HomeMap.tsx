import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle
} from "@ionic/react";

const HomeMap: React.FC = () => {
  return (
    <IonCard className="ion-margin-top card-modern">
      <IonCardHeader>
        <IonCardSubtitle>Vista rápida</IonCardSubtitle>
        <IonCardTitle>Mapa de rutas</IonCardTitle>
      </IonCardHeader>

      <div
        style={{
          height: "260px",
          borderRadius: "16px",
          overflow: "hidden",
          background: "linear-gradient(135deg, #020617, #111827)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#9ca3af",
          fontSize: 14,
        }}
      >
        <span>🎯 Aquí irá el mapa interactivo de rutas</span>
      </div>
    </IonCard>
  );
};

export default HomeMap;
