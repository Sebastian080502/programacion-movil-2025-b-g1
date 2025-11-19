import React from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonInput,
  IonFooter,
} from "@ionic/react";
import {
  menuOutline,
  homeOutline,
  chatbubbleEllipsesOutline,
  personCircleOutline,
} from "ionicons/icons";
import { useIonRouter } from "@ionic/react";

import { useAuth } from "../../hooks/useAuth";
import HomeMap from "../../components/Home/HomeMap";

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const router = useIonRouter();

  const displayName = user?.email?.split("@")[0] ?? "usuario";

  const goToMenu = () => router.push("/menu");        // ajusta si tu ruta es otra
  const goToHome = () => router.push("/home");        // esta misma pantalla
  const goToFeedback = () => router.push("/feedback"); // ajusta si tu ruta es otra
  const goToProfile = () => router.push("/profile");

  return (
    <IonPage>
      {/* ===== HEADER estilo iOS ===== */}
      <IonHeader translucent>
        <IonToolbar className="routes-toolbar">
          {/* Menú hamburguesa */}
          <IonButtons slot="start">
            <IonButton onClick={goToMenu}>
              <IonIcon icon={menuOutline} />
            </IonButton>
          </IonButtons>

          {/* Saludo */}
          <div className="routes-header-title">
            Hola, <span className="routes-username">{displayName}</span>
          </div>

          {/* Icono perfil */}
          <IonButtons slot="end">
            <IonButton onClick={goToProfile}>
              <IonIcon icon={personCircleOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* ===== CONTENIDO ===== */}
      <IonContent fullscreen className="routes-content">
        <div className="routes-body">
          {/* Pregunta */}
          <p className="routes-question">¿A dónde quieres ir?</p>

          {/* Input Origen */}
          <IonInput
            className="routes-input"
            placeholder="Origen"
            clearInput
          ></IonInput>

          {/* Input Destino */}
          <IonInput
            className="routes-input"
            placeholder="Destino"
            clearInput
          ></IonInput>

          {/* Mapa (tu componente, estilo imagen grande) */}
          <div className="routes-map-container">
  <iframe
    title="Mapa de rutas"
    src="https://www.openstreetmap.org/export/embed.html?bbox=-75.315%2C2.87%2C-75.26%2C2.96&layer=mapnik&marker=2.93%2C-75.29"
    loading="lazy"
  />
          </div>
        </div>
      </IonContent>

      {/* ===== BARRA INFERIOR ===== */}
      <IonFooter className="routes-bottom-nav">
        <div className="routes-nav-bar">
          {/* Menú */}
          <button onClick={goToMenu}>
            <IonIcon icon={menuOutline} />
          </button>

          {/* Home (activo) */}
          <button onClick={goToHome} className="active">
            <IonIcon icon={homeOutline} />
          </button>

          {/* Feedback */}
          <button onClick={goToFeedback}>
            <IonIcon icon={chatbubbleEllipsesOutline} />
          </button>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default HomePage;
