import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

export const i18n = new I18n({
  en: {
    読み取り: "Scan",
    読み取り内容: "Scan Result",
    読み取り結果: "Scan Result",
    履歴: "History",
    QRコードを配置を配置してください: "Please place the QR code",
    画像を選択してください: "Please select an image",
    戻る: "Back",
    アクション: "Action",
    コピーしました: "Copied",
    コピーする: "Copy",
    共有する: "Share",
    削除: "Delete",
  },
  ja: {
    読み取り: "読み取り",
    読み取り内容: "読み取り内容",
    読み取り結果: "読み取り結果",
    履歴: "履歴",
    QRコードを配置を配置してください: "QRコードを配置してください",
    画像を選択してください: "画像を選択してください",
    戻る: "戻る",
    アクション: "アクション",
    コピーしました: "コピーしました",
    コピーする: "コピーする",
    共有する: "共有する",
    削除: "削除",
  },
});

const deviceLanguage = getLocales()[0].languageCode ?? "ja";
i18n.locale = deviceLanguage;
i18n.enableFallback = true;
i18n.defaultLocale = "ja";