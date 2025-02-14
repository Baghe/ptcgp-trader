import { retrieveLaunchParams } from "@telegram-apps/bridge"

export default function t(string, ...params) {
  const { initData: Auth } = retrieveLaunchParams()
  if (typeof string === "string" && !string.length) {
    return ""
  }
  let IdLang = Auth.user?.languageCode || "it"
  IdLang = "en"
  if (IdLang !== "it") {
    if (window.AppTranslations && window.AppTranslations[string]) {
      string = window.AppTranslations[string]
    } else {
      window.AppMissingTranslations = window.AppMissingTranslations || {}
      if (!window.AppMissingTranslations[string]) {
        console.log("Missing translation for", string)
      }
      window.AppMissingTranslations[string] = true
    }
  }

  if (params && params.length > 0) {
    params.forEach((param) => {
      string = string.replace(/%s/, param)
    })
  }
  return string
}