import React from "react";
import { IonItem, IonLabel, IonNote } from "@ionic/react";
import { Stop } from "../../api/route.api";

const StopItem: React.FC<{ stop: Stop }> = ({ stop }) => {
  return (
    <IonItem>
      <IonLabel>
        <h2>
          #{stop.orderNo} - {stop.name}
        </h2>
        {(stop.lat || stop.lng) && (
          <IonNote>
            {stop.lat},{stop.lng}
          </IonNote>
        )}
      </IonLabel>
    </IonItem>
  );
};

export default StopItem;
