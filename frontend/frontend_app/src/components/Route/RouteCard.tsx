import React from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from "@ionic/react";
import { Route } from "../../api/route.api";

interface Props {
  route: Route;
  onClick?: () => void;
}

const RouteCard: React.FC<Props> = ({ route, onClick }) => {
  return (
    <IonCard button onClick={onClick} className="card-modern ion-margin-vertical">
      <IonCardHeader>
        <IonCardSubtitle>{route.code}</IonCardSubtitle>
        <IonCardTitle>{route.name}</IonCardTitle>
      </IonCardHeader>
      {route.desc && <p style={{ paddingInline: 16 }}>{route.desc}</p>}
    </IonCard>
  );
};

export default RouteCard;
