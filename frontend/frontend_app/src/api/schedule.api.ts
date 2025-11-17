import { http } from "./http";

export interface Schedule {
  id: string;
  routeId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  frequencyMin: number;
}

export const getSchedulesByRoute = async (
  routeId: string
): Promise<Schedule[]> => {
  const res = await http.get<Schedule[]>("/schedules", {
    params: { routeId },
  });
  return res.data;
};
