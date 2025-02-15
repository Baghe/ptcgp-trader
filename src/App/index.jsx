import { useEffect, useState } from "react"
import { ApiCall } from "./Functions/ApiCall"
import t from "./Functions/LibLang"
import TabTrades from "./Tabs/TabTrades"
import TabOffers from "./Tabs/TabOffers"
import TabProfile from "./Tabs/TabProfile"
import "./app.css"

export default function App() {
  const [App, setApp] = useState(null)
  const [Tab, setTab] = useState("Trades")

  const Tabs = {
    Trades: {
      Label: t("Scambi disponibili"),
      Icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m3.604 7.197l7.138-3.109a.96.96 0 0 1 1.27.527l4.924 11.902a1 1 0 0 1-.514 1.304L9.285 20.93a.96.96 0 0 1-1.271-.527L3.09 8.5a1 1 0 0 1 .514-1.304zM15 4h1a1 1 0 0 1 1 1v3.5M20 6q.396.168.768.315a1 1 0 0 1 .53 1.311L19 13"></path>
        </svg>
      )
    },
    Offers: {
      Label: t("Offerte"),
      Icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 17h12M4 17l3.5-3.5M4 17l3.5 3.5M7 7h13m0 0l-3.5-3.5M20 7l-3.5 3.5"></path>
        </svg>
      ),
      Alert: App ? Object.values(App.Offers).filter((Offer) => Offer.IdStatus === "accepted").length : 0
    },
    Profile: {
      Label: t("Profilo"),
      Icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
          <path fill="currentColor" fillRule="evenodd" d="M12 4a8 8 0 0 0-6.96 11.947A4.99 4.99 0 0 1 9 14h6a4.99 4.99 0 0 1 3.96 1.947A8 8 0 0 0 12 4m7.943 14.076q.188-.245.36-.502A9.96 9.96 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.96 9.96 0 0 0 2.057 6.076l-.005.018l.355.413A9.98 9.98 0 0 0 12 22q.324 0 .644-.02a9.95 9.95 0 0 0 5.031-1.745a10 10 0 0 0 1.918-1.728l.355-.413zM12 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6" clipRule="evenodd"></path>
        </svg>
      )
    }

  }

  useEffect(() => {
    AppLoad()
  }, [])

  function AppLoad() {
    ApiCall("app", null, (Data) => {
      if (Data.Result) {
        setApp({
          ...Data.Data,
          Reload: AppLoad
        })
      } else {
        setApp(false)
      }
    })
  }

  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      <div className="menu">
        <div className="container d-flex">
          {Object.keys(Tabs).map((IdTab) => (
            <div key={IdTab} className={"item" + (IdTab === Tab ? " active" : "")} onClick={() => setTab(IdTab)} style={{ width: 100 / Object.keys(Tabs).length + "%" }}>
              <div className="icon">{Tabs[IdTab].Icon}</div>
              <div className="lh-1 mt-1 position-relative">
                {Tabs[IdTab].Label}
                {Tabs[IdTab].Alert > 0 && (
                  <span className="badge rounded-pill bg-danger ms-1">
                    {Tabs[IdTab].Alert}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-grow-1 overflow-auto">
        {App === null ? (
          <div className="container py-3">
            <div className="card">
              <div className="card-body text-center">
                <div className="spinner-border text-primary" role="status"></div>
              </div>
            </div>
          </div>
        ) : App === false ? (
          <div className="container py-3">
            <div className="card">
              <div className="card-body">
                <div className="h5 fw-bold mb-0">{t("Errore")}</div>
                <div>{t("Si è verificato un errore durante il caricamento dell'app.")}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container py-3">
            {Tab === "Trades" && <TabTrades App={App} />}
            {Tab === "Offers" && <TabOffers App={App} />}
            {Tab === "Profile" && <TabProfile App={App} />}
          </div>
        )}
      </div>
    </div>
  )
}