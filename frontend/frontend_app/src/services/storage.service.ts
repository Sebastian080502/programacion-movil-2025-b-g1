import { Preferences } from "@capacitor/preferences";

export const storage = {
  set: async (key: string, value: string) =>
    await Preferences.set({ key, value }),

  get: async (key: string) => {
    const res = await Preferences.get({ key });
    return res.value;
  },

  remove: async (key: string) => await Preferences.remove({ key }),

  clear: async () => await Preferences.clear(),
};
