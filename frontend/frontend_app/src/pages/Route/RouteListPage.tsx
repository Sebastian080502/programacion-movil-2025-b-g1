import React, { useContext, useEffect } from "react";
import { IonPage, IonContent, IonText } from "@ionic/react";
import { AppContext } from "../../context/AppContext";
import { useHistory } from "react-router-dom";
import { getRoutesByCity, Route } from "../../api/route.api";
import { useFetch } from "../../hooks/useFetch";
import AppLoading from "../../components/UI/AppLoading";
import RouteCard from "../../components/Route/RouteCard";

const RouteListPage: React.FC = () => {
  const appCtx = useContext(AppContext);
  const history = useHistory();

  if (!appCtx) throw new Error("RouteListPage must be used within AppProvider");
  const { selectedCityId } = appCtx;

  useEffect(() => {
    if (!selectedCityId) {
      history.push("/city/select");
    }
  }, [selectedCityId, history]);

  const { data, loading, error } = useFetch<Route[]>(
    () => getRoutesByCity(selectedCityId || ""),
    [selectedCityId]
  );

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonText>
          <h2>Rutas disponibles</h2>
        </IonText>

        {loading && <AppLoading message="Cargando rutas..." />}

       {Boolean(error) && <p>Error al cargar rutas</p>}


        {!loading &&
          data &&
          data.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              onClick={() => history.push(`/routes/${route.id}`)}
            />
          ))}

        {!loading && data && data.length === 0 && (
          <p>No hay rutas configuradas para esta ciudad.</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default RouteListPage;
