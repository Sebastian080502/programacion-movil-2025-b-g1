import { httpGet } from "./http";

export interface City {
  id: string;
  name: string;
}

export const getCities = async (): Promise<City[]> => {
  return httpGet<City[]>("/cities");
};
