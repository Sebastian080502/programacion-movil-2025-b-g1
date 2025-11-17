import React from "react";
import { IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import { APP_NAME } from "../config/constants";

interface Props {
  title?: string;
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title || APP_NAME}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
