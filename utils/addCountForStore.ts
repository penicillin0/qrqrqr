import * as SecureStore from "expo-secure-store";

export const addCountForStore = async () => {
  const countString = (await SecureStore.getItemAsync("count")) || "0";
  const count = parseInt(countString);
  SecureStore.setItemAsync("count", (count + 1).toString());
  return count + 1;
};
