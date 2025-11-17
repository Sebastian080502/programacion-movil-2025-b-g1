import React from "react";
import { IonPage, IonContent, IonText, IonList, IonItem, IonLabel } from "@ionic/react";
import { useParams } from "react-router-dom";
import { getSchedulesByRoute, Schedule } from "../../api/schedule.api";
import { useFetch } from "../../hooks/useFetch";
import AppLoading from "../../components/UI/AppLoading";

interface Params {
  routeId: string;
}

const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const RouteSchedulePage: React.FC = () => {
  const { routeId } = useParams<Params>();
  const { data, loading } = useFetch<Schedule[]>(
    () => getSchedulesByRoute(routeId),
    [routeId]
  );

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonText>
          <h2>Horarios de la ruta</h2>
        </IonText>

        {loading && <AppLoading message="Cargando horarios..." />}

        {!loading && data && (
          <IonList>
            {data.map((s) => (
              <IonItem key={s.id}>
                <IonLabel>
                  <h2>{dayNames[s.dayOfWeek]}</h2>
                  <p>
                    {s.startTime} - {s.endTime} · cada {s.frequencyMin} min
                  </p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}

        {!loading && data && data.length === 0 && (
          <p>No se encontraron horarios configurados.</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default RouteSchedulePage;
