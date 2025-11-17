import React from "react";
import { IonPage, IonContent, IonButton, IonText } from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import { getFeedbackByRoute, Feedback } from "../../api/feedback.api";
import { useFetch } from "../../hooks/useFetch";
import AppLoading from "../../components/UI/AppLoading";
import FeedbackItem from "../../components/Feedback/FeedbackItem";

interface Params {
  routeId: string;
}

const FeedbackListPage: React.FC = () => {
  const { routeId } = useParams<Params>();
  const history = useHistory();
  const { data, loading } = useFetch<Feedback[]>(
    () => getFeedbackByRoute(routeId),
    [routeId]
  );

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonText>
          <h2>Comentarios de la ruta</h2>
        </IonText>

        <IonButton
          expand="block"
          className="ion-margin-vertical"
          onClick={() => history.push(`/routes/${routeId}/feedback/new`)}
        >
          Agregar comentario
        </IonButton>

        {loading && <AppLoading message="Cargando comentarios..." />}

        {!loading && data && data.map((f) => <FeedbackItem key={f.id} feedback={f} />)}

        {!loading && data && data.length === 0 && (
          <p>Aún no hay comentarios para esta ruta. ¡Sé el primero en opinar!</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default FeedbackListPage;
