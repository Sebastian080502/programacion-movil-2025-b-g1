import React from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from "@ionic/react";
import { Feedback } from "../../api/feedback.api";

const FeedbackItem: React.FC<{ feedback: Feedback }> = ({ feedback }) => {
  const date = new Date(feedback.createdAt);

  return (
    <IonCard className="ion-margin-vertical">
      <IonCardHeader>
        <IonCardTitle>{feedback.title}</IonCardTitle>
        <IonCardSubtitle>
          {feedback.createdBy || "Anónimo"} ·{" "}
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </IonCardSubtitle>
      </IonCardHeader>
      {feedback.body && <p style={{ paddingInline: 16 }}>{feedback.body}</p>}
    </IonCard>
  );
};

export default FeedbackItem;
