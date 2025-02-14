import { useEffect, useState } from "react"
import t from "../Functions/LibLang"

export default function Tab({ App }) {
  const [PanelShow, setPanelShow] = useState(null)
  return (
    <>
      <div className="card mb-3">
        <div className="card-header">
          {t("Scambi disponibili")}
        </div>
        <div className="card-body">
          {Object.keys(App.Trades).length ? (
            <div className="d-flex flex-wrap gap-2 user-select-none">
              {Object.keys(App.Trades).map((IdCard) => (
                <div key={IdCard} className="cursor-pointer" onClick={() => setPanelShow(IdCard)}>
                  <img src={"https://baghe.altervista.org/bot/ptcgptrader/data/cards/" + IdCard + ".webp"}
                    alt={App.Cards[IdCard].Name} style={{ width: 64 }} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 512 512">
                <path fill="currentColor" d="M280.693 64.92c-5.164-.024-11.614 1.387-18.687 6.205c-55.605 39.039-112.172 76.494-169.584 112.826c-10.2 6.621-9.75 16.6 1.017 22.27l128.75 67.761c5.384 2.835 22.414 2.056 32.614-4.564l169.834-110.232c10.199-6.622 9.75-16.598-1.014-22.268c-44.669-23.51-85.78-45.116-130.578-68.865c0 0-4.803-3.099-12.352-3.133m6.416 27.547l-13.504 69.37l113.612-14.685l-2.84 15.22l-113.773 14.878l-13.672 70.232l-25.643 3.53l13.838-70.43l-117.033 15.305l3.205-15.655l116.865-15.105l13.668-69.565zm41.246 146.324l-65.74 42.674c-14.563 9.45-37.135 10.479-52.5 2.389L175.29 265.53l-87.236 41.375c-10.983 5.203-10.69 12.999.66 17.354l121.242 46.617v.006c11.35 4.368 29.494 3.66 40.477-1.535l166.992-79.196c10.985-5.194 10.68-12.996-.664-17.353l-88.405-34.008zm93.614 65.094l-165.393 78.44c-14.544 6.88-36.751 7.734-51.775 1.958L83.81 337.76c-6.4 4.962-4.722 11.122 4.902 14.812l121.242 46.625h.002c11.349 4.363 29.494 3.663 40.477-1.533l166.992-79.193c8.922-4.218 10.398-10.162 4.543-14.586zm0 28.318l-165.393 78.44c-14.544 6.874-36.751 7.729-51.775 1.959L83.81 366.078c-6.4 4.963-4.722 11.125 4.902 14.815l121.242 46.625h.002c11.349 4.362 29.494 3.66 40.477-1.534l166.992-79.2c8.922-4.22 10.398-10.165 4.543-14.58zm-.002 28.32l-165.393 78.434c-14.544 6.88-36.75 7.735-51.773 1.959L83.81 394.4c-6.4 4.96-4.721 11.119 4.902 14.809l121.242 46.623v-.002c11.35 4.37 29.494 3.663 40.477-1.533l166.994-79.193c8.922-4.22 10.396-10.164 4.54-14.58zm-3.871 30.153l-161.522 76.6c-14.544 6.88-36.75 7.737-51.773 1.96L87.924 424.293c-10.853 5.201-10.52 12.949.789 17.289l121.24 46.62h.002c11.35 4.366 29.492 3.66 40.475-1.534l166.996-79.193c10.534-4.98 10.684-12.363.67-16.8z"></path>
              </svg>
              <div className="fw-bold">{t("Nessun scambio disponibile.")}</div>
              <div className="small text-muted">{t("Quando altri giocatori offriranno carte che cerchi, appariranno qui.")}</div>
            </div>
          )}
        </div>
      </div>
      {PanelShow && (
        <CardSelect App={App} IdCard={PanelShow} Close={(Cards) => {
          setPanelShow(null)
          if (Cards) {
            CardsSave(PanelShow, Cards)
          }
        }} />
      )}
    </>
  )
}

function CardSelect({ App, IdCard, Close }) {
  const [Visible, setVisible] = useState(false)
  const [TradeOpen, setTradeOpen] = useState({
    IdCard: IdCard,
    IdUser: null,
    Name: null,
    PhotoUrl: null,
    IdCardIn: null,
    Visible: false
  })

  useEffect(() => {
    setVisible(true)
  }, [])

  function ThisClose(IdCard) {
    setVisible(false)
    setTimeout(() => Close(IdCard), 300)
  }

  return (
    <div className={"panel-bottom" + (Visible ? " active" : "")} onClick={() => ThisClose(null)}>
      <div className="panel-content container p-3" onClick={(e) => e.stopPropagation()}>

        <div className="d-flex flex-column h-100">
          <div className="text-center px-3">
            <div className="mx-auto shadow-lg transition" style={{
              maxWidth: 240,
              aspectRatio: "7/5",
              height: TradeOpen.Visible ? 0 : 160,
              background: "transparent url('https://baghe.altervista.org/bot/ptcgptrader/data/cards/" + IdCard + ".webp') top/cover no-repeat"
            }} />
          </div>

          <div className="card card-2 flex-grow-1 overflow-hidden">
            <div className="position-absolute top-0 w-100 h-100 card-body overflow-auto d-flex flex-column gap-2 transition"
              style={{ left: TradeOpen.Visible ? "-100%" : 0, opacity: TradeOpen.Visible ? 0 : 1 }}>
              {Object.values(App.Trades[IdCard]).map((User) => {
                return (
                  <div key={User.IdUser} className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-2">
                        {User.PhotoUrl ? (
                          <img src={User.PhotoUrl} alt={User.FriendName} className="rounded-circle" style={{ width: 24, height: 24 }} />
                        ) : (
                          <div className="rounded-circle mx-auto d-flex align-items-center justify-content-center small-12 bg-card-2 fw-bold" style={{ width: 24, height: 24 }}>
                            <div>{User.FriendName[0]}</div>
                          </div>
                        )}
                        <div className="flex-grow-1 fw-bold ms-2">{User.FriendName}</div>
                      </div>
                      <div className="d-flex gap-1 overflow-auto">
                        {User.IdCardIn.map((IdCardIn) => (
                          <div key={IdCardIn} className="cursor-pointer" onClick={() => setTradeOpen({
                            IdCard: IdCard,
                            IdUser: User.IdUser,
                            FriendName: User.FriendName,
                            PhotoUrl: User.PhotoUrl,
                            IdCardIn: IdCardIn,
                            Visible: true
                          })}>
                            <img src={"https://baghe.altervista.org/bot/ptcgptrader/data/cards/" + IdCardIn + ".webp"}
                              alt={App.Cards[IdCardIn].Name} style={{ width: 56 }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="position-absolute top-0 w-100 h-100 card-body overflow-auto d-flex flex-column gap-2 transition"
              style={{ left: TradeOpen.Visible ? 0 : "100%", opacity: TradeOpen.Visible ? 1 : 0 }}>

              {TradeOpen.IdCardIn && (
                <>
                  <div className="h4 fw-bold text-center text-white">
                    {t("Offerta di scambio")}
                  </div>

                  <div className="d-flex justify-content-center align-items-center gap-3 mb-5 flex-grow-1">
                    <div className="position-relative">
                      <div className="text-center text-muted small">{t("Ottieni")}</div>
                      <img src={"https://baghe.altervista.org/bot/ptcgptrader/data/cards/" + TradeOpen.IdCard + ".webp"}
                        alt={App.Cards[TradeOpen.IdCardIn].Name} style={{ width: 100 }} className="shadow-lg" />
                      <div className="text-center position-absolute start-50 top-100 translate-middle">
                        <div className="rounded-circle border border-3 bg-card border-white" style={{ width: 54, height: 54 }}>
                          {TradeOpen.PhotoUrl ? (
                            <img src={TradeOpen.PhotoUrl} alt={TradeOpen.FriendName} className="rounded-circle mx-auto" style={{ width: 48, height: 48 }} />
                          ) : (
                            <div className="rounded-circle mx-auto d-flex align-items-center justify-content-center fs-4 fw-bold" style={{ width: 48, height: 48 }}>
                              <div>{TradeOpen.FriendName[0]}</div>
                            </div>
                          )}
                        </div>
                        <div className="fw-bold">{TradeOpen.FriendName}</div>
                      </div>
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 24 24">
                      <path fill="none" stroke="#198754" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 7h13m0 0l-3.5-3.5M14 7l-3.5 3.5"></path>
                      <path fill="none" stroke="#dc3545" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 17h12M10 17l3.5-3.5M10 17l3.5 3.5"></path>
                    </svg>

                    <div className="position-relative">
                      <div className="text-center text-muted small">{t("Scambi")}</div>
                      <img src={"https://baghe.altervista.org/bot/ptcgptrader/data/cards/" + TradeOpen.IdCardIn + ".webp"}
                        alt={App.Cards[TradeOpen.IdCardIn].Name} style={{ width: 100 }} className="shadow-lg" />
                      <div className="text-center position-absolute start-50 top-100 translate-middle">
                        <div className="rounded-circle border border-3 bg-card border-white" style={{ width: 54, height: 54 }}>
                          {App.User.PhotoUrl ? (
                            <img src={App.User.PhotoUrl} alt={App.User.Profile.FriendName} className="rounded-circle mx-auto" style={{ width: 48, height: 48 }} />
                          ) : (
                            <div className="rounded-circle mx-auto d-flex align-items-center justify-content-center fs-4 fw-bold" style={{ width: 48, height: 48 }}>
                              <div>{App.User.Profile.FriendName[0]}</div>
                            </div>
                          )}
                        </div>
                        <div className="fw-bold">{App.User.Profile.FriendName}</div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-body">
                      <div className="text-center small text-muted">
                        {t("Stai inviando un'offerta di scambio del tuo %s per %s di %s.", App.Cards[TradeOpen.IdCardIn].Name, App.Cards[TradeOpen.IdCard].Name, TradeOpen.FriendName)}<br />
                        {t("%s valuterà la tua offerta e potrà accettarla o rifiutarla.", TradeOpen.FriendName)}<br />
                        {t("Se accetterà, riceverai una notifica e vi verranno mostrati i rispettivi Codici Amico per completare lo scambio nel gioco.")}
                      </div>
                    </div>
                  </div>


                </>
              )}
            </div>
          </div>
          <div className="pt-2 d-flex justify-content-between">
            <button className="btn btn-secondary btn-sm rounded-3" onClick={() => {
              if (TradeOpen.Visible) {
                setTradeOpen({ ...TradeOpen, Visible: false })
              } else {
                ThisClose()
              }
            }}>{t(TradeOpen.Visible ? "Indietro" : "Annulla")}</button>


            <button className="btn btn-primary btn-sm rounded-3 transition"
              style={{ opacity: TradeOpen.Visible ? 1 : 0 }}
              disabled={!TradeOpen.Visible}
              onClick={() => {
                if (TradeOpen.Visible) {
                  ThisClose()
                }
              }}>
              {t("Invia offerta")}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}