import React, { useContext, useState } from "react";
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSearchbar,
} from "@ionic/react";
import { AppContext } from "../../context/AppContext";
import { getCities, City } from "../../api/city.api";
import { useFetch } from "../../hooks/useFetch";
import AppLoading from "../../components/UI/AppLoading";
import { useHistory } from "react-router-dom";

const SelectCityPage: React.FC = () => {
  const appCtx = useContext(AppContext);
  const history = useHistory();
  const { data, loading } = useFetch<City[]>(getCities, []);
  const [search, setSearch] = useState("");

  if (!appCtx) throw new Error("SelectCityPage must be used within AppProvider");

  const { setSelectedCityId, selectedCityId } = appCtx;

  const filtered = (data || []).filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const onSelect = async (cityId: string) => {
    await setSelectedCityId(cityId);
    history.push("/routes");
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Selecciona tu ciudad</h2>

        <IonSearchbar
          value={search}
          onIonChange={(e) => setSearch(e.detail.value || "")}
          placeholder="Buscar ciudad..."
        />

        {loading && <AppLoading message="Cargando ciudades..." />}

        {!loading && (
          <IonList>
            {filtered.map((city) => (
              <IonItem
                key={city.id}
                button
                detail
                onClick={() => onSelect(city.id)}
                color={selectedCityId === city.id ? "primary" : undefined}
              >
                <IonLabel>{city.name}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SelectCityPage;
