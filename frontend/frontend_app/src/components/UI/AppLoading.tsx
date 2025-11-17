import React from "react";
import { IonSpinner, IonText } from "@ionic/react";

const AppLoading: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div
      style={{
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IonSpinner />
      {message && (
        <IonText color="medium">
          <p>{message}</p>
        </IonText>
      )}
    </div>
  );
};

export default AppLoading;
