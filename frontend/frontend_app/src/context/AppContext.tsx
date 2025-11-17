import React, { createContext, useEffect, useState } from "react";
import { storage } from "../services/storage.service";
import { STORAGE_KEYS } from "../config/constants";

export interface AppContextType {
  selectedCityId: string | null;
  setSelectedCityId: (id: string | null) => Promise<void>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedCityId, setSelectedCityIdState] = useState<string | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const cityId = await storage.get(STORAGE_KEYS.SELECTED_CITY_ID);
      if (cityId) setSelectedCityIdState(cityId);
    })();
  }, []);

  const setSelectedCityId = async (id: string | null) => {
    setSelectedCityIdState(id);
    if (id) {
      await storage.set(STORAGE_KEYS.SELECTED_CITY_ID, id);
    } else {
      await storage.remove(STORAGE_KEYS.SELECTED_CITY_ID);
    }
  };

  return (
    <AppContext.Provider value={{ selectedCityId, setSelectedCityId }}>
      {children}
    </AppContext.Provider>
  );
};
