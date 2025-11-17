import React from "react";
import { IonPage, IonContent, IonText, IonButton } from "@ionic/react";
import { useAuth } from "../../hooks/useAuth";

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();

  const onLogout = async () => {
    await logout();
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonText>
          <h2>Perfil</h2>
        </IonText>

        <div className="card-modern">
          <p>
            <strong>Correo:</strong> {user?.email}
          </p>
          <p>
            <strong>ID:</strong> {user?.id}
          </p>
        </div>

        <IonButton
          expand="block"
          color="danger"
          className="ion-margin-top"
          onClick={onLogout}
        >
          Cerrar sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
