import React from "react";
import { IonButton } from "@ionic/react";

interface Props {
  children: React.ReactNode;
  expand?: "block" | "full";
  onClick?: () => void;
  routerLink?: string;
  color?: string;
}

const AppButton: React.FC<Props> = ({
  children,
  expand = "block",
  onClick,
  routerLink,
  color = "primary",
}) => {
  return (
    <IonButton
      className="btn-primary-gradient"
      expand={expand}
      onClick={onClick}
      routerLink={routerLink}
      color={color as any}
    >
      {children}
    </IonButton>
  );
};

export default AppButton;
