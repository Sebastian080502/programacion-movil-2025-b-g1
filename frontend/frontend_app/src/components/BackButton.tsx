import React from "react";
import { IonButtons, IonButton, IonIcon } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useHistory } from "react-router-dom";

const BackButton: React.FC = () => {
  const history = useHistory();

  return (
    <IonButtons slot="start">
      <IonButton onClick={() => history.goBack()}>
        <IonIcon icon={chevronBack} />
      </IonButton>
    </IonButtons>
  );
};

export default BackButton;
