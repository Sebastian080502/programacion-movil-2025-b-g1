import { http } from "./http";

export interface Route {
  id: string;
  code: string;
  name: string;
  cityId: string;
  desc?: string | null;
}

export interface Stop {
  id: string;
  routeId: string;
  orderNo: number;
  name: string;
  lat?: number | null;
  lng?: number | null;
}

export const getRoutesByCity = async (cityId: string): Promise<Route[]> => {
  const res = await http.get<Route[]>("/routes", {
    params: { cityId },
  });
  return res.data;
};

export const getRouteById = async (routeId: string): Promise<Route> => {
  const res = await http.get<Route>(`/routes/${routeId}`);
  return res.data;
};

export const getStopsByRoute = async (routeId: string): Promise<Stop[]> => {
  const res = await http.get<Stop[]>("/stops", {
    params: { routeId },
  });
  return res.data;
};
