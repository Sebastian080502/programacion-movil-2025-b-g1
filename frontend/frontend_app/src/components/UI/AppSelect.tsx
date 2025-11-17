import React from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value?: string;
  options: Option[];
  onChange?: (value: string) => void;
}

const AppSelect: React.FC<Props> = ({ label, value, options, onChange }) => {
  return (
    <IonItem className="ion-margin-vertical">
      <IonLabel position="stacked">{label}</IonLabel>
      <IonSelect
        value={value}
        onIonChange={(e) => onChange?.(e.detail.value)}
        interface="popover"
      >
        {options.map((opt) => (
          <IonSelectOption key={opt.value} value={opt.value}>
            {opt.label}
          </IonSelectOption>
        ))}
      </IonSelect>
    </IonItem>
  );
};

export default AppSelect;
