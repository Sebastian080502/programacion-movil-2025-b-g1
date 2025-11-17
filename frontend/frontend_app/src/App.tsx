import React from "react";
import { IonApp } from "@ionic/react";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import { AppRouter } from "./navigation/AppRouter";

const App: React.FC = () => {
  return (
    <IonApp>
      <AuthProvider>
        <AppProvider>
          <AppRouter />
        </AppProvider>
      </AuthProvider>
    </IonApp>
  );
};

export default App;
