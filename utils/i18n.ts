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
    "5つ星": "5 Stars",
    "5つ星レビューをお願いします！": "Please leave a 5-star review!",
    キャンセル: "Cancel",
    "あなたの評価が\nアプリの力になります！":
      "Your review\nwill help us a lot!",
    設定からカメラの使用を許可してください:
      "Please allow camera access in settings",
    "全ての履歴を削除しますか？": "Delete all history?",
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
    "5つ星": "5つ星",
    "5つ星レビューをお願いします！": "5つ星レビューをお願いします！",
    キャンセル: "キャンセル",
    "あなたの評価が\nアプリの力になります！":
      "あなたの評価が\nアプリの力になります！",
    設定からカメラの使用を許可してください:
      "設定からカメラの使用を許可してください",
    "全ての履歴を削除しますか？": "全ての履歴を削除しますか？",
  },
});

const deviceLanguage = getLocales()[0].languageCode ?? "ja";
i18n.locale = deviceLanguage;
i18n.enableFallback = true;
i18n.defaultLocale = "ja";
