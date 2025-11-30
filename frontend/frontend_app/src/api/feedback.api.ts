import { httpGet, httpPost } from "./http";

export interface Feedback {
  id: string;
  routeId: string;
  title: string;
  body?: string | null;
  createdAt: string;
  createdBy?: string | null;
}

export const getFeedbackByRoute = async (
  routeId: string
): Promise<Feedback[]> => {
  return httpGet<Feedback[]>("/feedback", {
    params: { routeId },
  });
};

export const createFeedback = async (
  routeId: string,
  data: { title: string; body?: string }
): Promise<Feedback> => {
  return httpPost<Feedback>("/feedback", {
    routeId,
    ...data,
  });
};
