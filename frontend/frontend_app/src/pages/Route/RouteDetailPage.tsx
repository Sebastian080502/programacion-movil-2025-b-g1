import React from "react";
import {
  IonPage,
  IonContent,
  IonText,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import { getRouteById, Route } from "../../api/route.api";
import { useFetch } from "../../hooks/useFetch";
import AppLoading from "../../components/UI/AppLoading";

interface Params {
  routeId: string;
}

const RouteDetailPage: React.FC = () => {
  const { routeId } = useParams<Params>();
  const history = useHistory();
  const { data, loading } = useFetch<Route>(() => getRouteById(routeId), [routeId]);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        {loading && <AppLoading message="Cargando ruta..." />}

        {!loading && data && (
          <>
            <IonCard className="card-modern">
              <IonCardHeader>
                <IonCardSubtitle>{data.code}</IonCardSubtitle>
                <IonCardTitle>{data.name}</IonCardTitle>
              </IonCardHeader>
              {data.desc && <p style={{ paddingInline: 16 }}>{data.desc}</p>}
            </IonCard>

            <IonText>
              <h3>Explorar información</h3>
            </IonText>

            <IonButton
              expand="block"
              routerLink={`/routes/${routeId}/stops`}
              className="ion-margin-vertical"
            >
              Ver paraderos
            </IonButton>

            <IonButton
              expand="block"
              routerLink={`/routes/${routeId}/schedule`}
            >
              Ver horarios
            </IonButton>

            <IonButton
              expand="block"
              color="tertiary"
              routerLink={`/routes/${routeId}/feedback`}
              className="ion-margin-top"
            >
              Ver comentarios
            </IonButton>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default RouteDetailPage;
