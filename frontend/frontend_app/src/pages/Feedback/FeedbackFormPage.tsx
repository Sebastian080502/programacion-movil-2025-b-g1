import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonText,
  IonButton,
  IonTextarea,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import { createFeedback } from "../../api/feedback.api";
import AppInput from "../../components/UI/AppInput";

interface Params {
  routeId: string;
}

const FeedbackFormPage: React.FC = () => {
  const { routeId } = useParams<Params>();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onSubmit = async () => {
    try {
      await createFeedback(routeId, { title, body });
      alert("Comentario enviado. ¡Gracias por tu aporte!");
      history.push(`/routes/${routeId}/feedback`);
    } catch (err) {
      console.error(err);
      alert("Error al enviar comentario");
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonText>
          <h2>Nuevo comentario</h2>
        </IonText>

        <div className="card-modern">
          <AppInput
            label="Título"
            value={title}
            onChange={setTitle}
            placeholder="Ej: Buen servicio en horas pico"
          />

          <IonItem className="ion-margin-vertical">
            <IonLabel position="stacked">Comentario</IonLabel>
            <IonTextarea
              value={body}
              autoGrow
              placeholder="Describe tu experiencia..."
              onIonChange={(e) => setBody(e.detail.value || "")}
            />
          </IonItem>

          <IonButton expand="block" onClick={onSubmit}>
            Enviar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FeedbackFormPage;
