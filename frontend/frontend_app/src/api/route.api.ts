import { httpGet } from "./http";

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
  return httpGet<Route[]>("/routes", {
    params: { cityId },
  });
};

export const getRouteById = async (routeId: string): Promise<Route> => {
  return httpGet<Route>(`/routes/${routeId}`);
};

export const getStopsByRoute = async (routeId: string): Promise<Stop[]> => {
  return httpGet<Stop[]>("/stops", {
    params: { routeId },
  });
};
