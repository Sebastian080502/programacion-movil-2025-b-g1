import { httpGet } from "./http";

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
  return httpGet<Schedule[]>("/schedules", {
    params: { routeId },
  });
};
