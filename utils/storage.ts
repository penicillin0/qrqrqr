import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "react-native-storage";

export type UrlHistory = {
  url: string;
  timestamp: number;
};

const storage: Storage = new Storage({
  storageBackend: AsyncStorage,
});

export const saveHistory = async (history: UrlHistory) => {
  try {
    const value = await storage.load({ key: "history" });
    const newValue = [...value, history];
    console.log("newValue", newValue);
    await storage.save({ key: "history", data: newValue });
  } catch (e) {
    console.info("No history found", e);
    await storage.save({ key: "history", data: [history] });
  }
};

export const loadHistory = async (): Promise<UrlHistory[]> => {
  try {
    const value = await storage.load({ key: "history" });
    return value;
  } catch (e) {
    console.info("No history found", e);
    return [];
  }
};

export const clearHistory = async () => {
  await storage.remove({ key: "history" });
};

export const deleteHistory = async (history: UrlHistory) => {
  const histories = await loadHistory();
  const newHistories = histories.filter(
    (h) => h.timestamp !== history.timestamp
  );
  await storage.save({ key: "history", data: newHistories });
};
