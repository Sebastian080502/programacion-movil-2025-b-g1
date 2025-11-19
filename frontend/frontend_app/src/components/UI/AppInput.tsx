import React from "react";
import { IonItem, IonLabel, IonInput, IonInputPasswordToggle } from "@ionic/react";

interface Props {
  label: string;
  type?: "text" | "email" | "password";
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const AppInput: React.FC<Props> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}) => {
  const isPassword = type === "password";

  return (
    <IonItem className="ion-margin-vertical">
      <IonLabel position="stacked">{label}</IonLabel>
      <IonInput
  type={isPassword ? "password" : type}
  value={value}
  placeholder={placeholder}
  onIonChange={(e) => {
    const val = e.detail.value || "";
    console.log("AppInput change:", label, "=>", val);
    onChange?.(val);
  }}
>
        {isPassword && <IonInputPasswordToggle slot="end" />}
      </IonInput>
    </IonItem>
  );
};

export default AppInput;
