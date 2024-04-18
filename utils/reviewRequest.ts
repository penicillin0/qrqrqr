import * as SecureStore from "expo-secure-store";

// SecureStoreは容量が小さいので、key名は短くしておく
const KEY_NAME = "revReq";

export const isAlreadyReviewRequest = async (): Promise<boolean> => {
  try {
    const isDone: boolean =
      (await SecureStore.getItemAsync(KEY_NAME)) === "1" ? true : false;
    return isDone;
  } catch (error) {
    console.log(error);
    await SecureStore.setItemAsync(KEY_NAME, "0");
    return false;
  }
};

export const doneReviewRequest = async (): Promise<void> => {
  try {
    await SecureStore.setItemAsync(KEY_NAME, "1");
  } catch (error) {
    console.log(error);
  }
};
