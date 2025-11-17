import React from "react";
import { IonPage, IonContent, IonText, IonList } from "@ionic/react";
import { useParams } from "react-router-dom";
import { getStopsByRoute, Stop } from "../../api/route.api";
import { useFetch } from "../../hooks/useFetch";
import AppLoading from "../../components/UI/AppLoading";
import StopItem from "../../components/Route/StopItem";

interface Params {
  routeId: string;
}

const RouteStopsPage: React.FC = () => {
  const { routeId } = useParams<Params>();
  const { data, loading } = useFetch<Stop[]>(
    () => getStopsByRoute(routeId),
    [routeId]
  );

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonText>
          <h2>Paraderos de la ruta</h2>
        </IonText>

        {loading && <AppLoading message="Cargando paraderos..." />}

        {!loading && data && (
          <IonList>
            {data.map((stop) => (
              <StopItem key={stop.id} stop={stop} />
            ))}
          </IonList>
        )}

        {!loading && data && data.length === 0 && (
          <p>No se encontraron paraderos configurados.</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default RouteStopsPage;
