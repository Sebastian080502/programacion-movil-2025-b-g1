import { http } from "./http";

export interface City {
  id: string;
  name: string;
}

export const getCities = async (): Promise<City[]> => {
  const res = await http.get<City[]>("/cities");
  return res.data;
};
