import { http } from "./http";

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
  const res = await http.get<Feedback[]>("/feedback", {
    params: { routeId },
  });
  return res.data;
};

export const createFeedback = async (
  routeId: string,
  data: { title: string; body?: string }
): Promise<Feedback> => {
  const res = await http.post<Feedback>("/feedback", {
    routeId,
    ...data,
  });
  return res.data;
};
