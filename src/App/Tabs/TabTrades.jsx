import { useEffect, useState } from "react"
import t from "../Functions/LibLang"
import { ApiCall } from "../Functions/ApiCall"

export default function Tab({ App }) {
  const [IdCard, setIdCard] = useState(null)
  return (
    <>
      <div className="display-6 mb-3">
        {t("Scambi disponibili")}
      </div>
      {Object.keys(App.Trades).length ? (
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-wrap gap-2 user-select-none">
              {Object.keys(App.Trades).map((IdCard) => (
                <div key={IdCard} className="cursor-pointer" onClick={() => setIdCard(IdCard)}>
                  <img src={"https://baghe.altervista.org/bot/ptcgptrader/data/cards/" + IdCard + ".webp"}
                    alt={App.Cards[IdCard].Name} style={{ width: 96 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 512 512">
              <path fill="currentColor" d="M280.693 64.92c-5.164-.024-11.614 1.387-18.687 6.205c-55.605 39.039-112.172 76.494-169.584 112.826c-10.2 6.621-9.75 16.6 1.017 22.27l128.75 67.761c5.384 2.835 22.414 2.056 32.614-4.564l169.834-110.232c10.199-6.622 9.75-16.598-1.014-22.268c-44.669-23.51-85.78-45.116-130.578-68.865c0 0-4.803-3.099-12.352-3.133m6.416 27.547l-13.504 69.37l113.612-14.685l-2.84 15.22l-113.773 14.878l-13.672 70.232l-25.643 3.53l13.838-70.43l-117.033 15.305l3.205-15.655l116.865-15.105l13.668-69.565zm41.246 146.324l-65.74 42.674c-14.563 9.45-37.135 10.479-52.5 2.389L175.29 265.53l-87.236 41.375c-10.983 5.203-10.69 12.999.66 17.354l121.242 46.617v.006c11.35 4.368 29.494 3.66 40.477-1.535l166.992-79.196c10.985-5.194 10.68-12.996-.664-17.353l-88.405-34.008zm93.614 65.094l-165.393 78.44c-14.544 6.88-36.751 7.734-51.775 1.958L83.81 337.76c-6.4 4.962-4.722 11.122 4.902 14.812l121.242 46.625h.002c11.349 4.363 29.494 3.663 40.477-1.533l166.992-79.193c8.922-4.218 10.398-10.162 4.543-14.586zm0 28.318l-165.393 78.44c-14.544 6.874-36.751 7.729-51.775 1.959L83.81 366.078c-6.4 4.963-4.722 11.125 4.902 14.815l121.242 46.625h.002c11.349 4.362 29.494 3.66 40.477-1.534l166.992-79.2c8.922-4.22 10.398-10.165 4.543-14.58zm-.002 28.32l-165.393 78.434c-14.544 6.88-36.75 7.735-51.773 1.959L83.81 394.4c-6.4 4.96-4.721 11.119 4.902 14.809l121.242 46.623v-.002c11.35 4.37 29.494 3.663 40.477-1.533l166.994-79.193c8.922-4.22 10.396-10.164 4.54-14.58zm-3.871 30.153l-161.522 76.6c-14.544 6.88-36.75 7.737-51.773 1.96L87.924 424.293c-10.853 5.201-10.52 12.949.789 17.289l121.24 46.62h.002c11.35 4.366 29.492 3.66 40.475-1.534l166.996-79.193c10.534-4.98 10.684-12.363.67-16.8z"></path>
            </svg>
            <div className="fw-bold">{t("Nessuno scambio disponibile.")}</div>
            <div className="small text-muted">{t("Quando altri giocatori offriranno carte che cerchi, appariranno qui.")}</div>
          </div>
        </div>
      )}
      {IdCard && (
        <CardSelect App={App} IdCard={IdCard} Close={(Reload) => {
          setIdCard(null)
          if (Reload) {
            //
          }
        }} />
      )}
    </>
  )
}

function CardSelect({ App, IdCard, Close }) {
  const [Visible, setVisible] = useState(false)
  const [TradeOpen, setTradeOpen] = useState({
    IdUser2: null,
    IdCard1: null,
    IdCard2: IdCard,
    Name: null,
    PhotoUrl: null,
    Visible: false
  })

  useEffect(() => {
    setVisible(true)
  }, [])

  function ThisClose() {
    setVisible(false)
    setTimeout(() => {
      Close()
    }, 200)
  }

  function TradeOfferSend() {
    ApiCall("trade-offer-send", {
      Value: {
        IdUser2: TradeOpen.IdUser2,
        IdCard1: TradeOpen.IdCard1,
        IdCard2: TradeOpen.IdCard2
      }
    }, (Data) => {
      if (Data.Result) {
        App.Reload()
        setTradeOpen({ ...TradeOpen, Visible: false })
      }
    })
  }

  function TradeOfferCancel(IdOffer) {
    ApiCall("trade-offer-cancel", {
      Value: {
        IdOffer: IdOffer
      }
    }, (Data) => {
      if (Data.Result) {
        App.Reload()
      }
    })
  }

  return (
    <div className={"panel-bottom" + (Visible ? " active" : "")} onClick={() => ThisClose()}>
      <div className="panel-content container p-3" onClick={(e) => e.stopPropagation()}>

        <div className="d-flex flex-column h-100">
          <div className="d-flex justify-content-center align-items-center mb-3">
            <div>
              <div className="text-center text-muted small-10 fw-bold">{t("SCAMBI")}</div>
              {TradeOpen.Visible && TradeOpen.IdCard1 ? (
                <div className="border border-4 border-danger rounded">
                  <img src={"https://baghe.altervista.org/bot/ptcgptrader/data/cards/" + TradeOpen.IdCard1 + ".webp"}
                    alt={App.Cards[TradeOpen.IdCard1].Name} style={{ width: 96 }} />
                </div>
              ) : (
                <div className="border border-4 border-danger rounded" style={{ "--bs-border-style": "dashed" }}>
                  <div className="bg-card-2 d-flex align-items-center justify-content-center" style={{ width: 96, height: 134 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 512 512" className="opacity-25">
                      <path fill="currentColor" d="M272.824 24.318c-14.929.312-25.66 3.246-32.767 8.446L142.899 84.91l-54.106 73.514C77.42 175.98 85.518 210 121.112 188.197l38.9-51.351c49.476-42.711 150.484-23.032 102.586 62.591c-23.53 49.582-12.457 73.79 17.76 83.95l13.812-46.381c23.95-53.825 68.502-63.51 66.684-106.905l107.303 7.725l-.866-112.045zm-54.09 103.338c-17.41-.3-34.485 6.898-46.92 17.375l-39.044 51.33c10.713 8.506 21.413 3.959 32.125-6.363c12.626 6.394 22.365-3.522 30.365-23.297c3.317-13.489 8.21-23.037 23.475-39.045zm-32.617 88.324a13.5 13.5 0 0 0-5.232 1.235l-129.164 59.51c-6.784 3.13-9.763 11.202-6.633 17.992l85.27 185.08c3.132 6.783 11.205 9.779 18 6.635l129.15-59.504c6.796-3.137 9.777-11.198 6.647-18L198.87 223.86c-2.343-5.097-7.473-8.043-12.754-7.88zm-29.767 50.06c7.794.113 14.913 2.053 21.092 5.847c10.758 6.604 18.63 20.93 19.644 35.754c.698 10.184-1.712 17.837-12.553 39.873c-3.879 7.885-5.634 15.27-5.072 21.355c.46 4.973.786 5.855 3.639 9.844l3.135 4.38l-1.754.98c-.965.538-7.097 3.1-13.627 5.693c-6.918 2.746-12.316 4.496-12.934 4.193c-.583-.286-2.352-2.62-3.931-5.188c-7.525-12.227-7.225-27.53.878-44.627c6.655-14.04 8.47-19.966 7.952-25.974c-.815-9.44-6.743-16.478-14.834-17.617c-6.021-.848-10.668.553-18.912 5.703c-8.298 5.183-13.941 10.708-19.055 18.656c-1.8 2.797-3.407 5.053-3.57 5.014c-.164-.04-3.206-7.256-6.758-16.037l-6.46-15.967l3.23-3.666c5.809-6.598 11.758-11.166 22.226-17.065c13.44-7.573 26.273-11.314 37.664-11.15zm33.308 133.048c6.463.125 12.18 3.215 15.7 8.963c4.296 7.015 4.185 13.838-.334 20.752c-2.89 4.42-8.953 8.313-15.04 9.654c-15.132 3.335-28.038-9.343-23.726-23.307c1.817-5.885 5.325-9.937 11.273-13.02c4.104-2.125 8.25-3.117 12.127-3.042"></path>
                    </svg>
                  </div>
                </div>
              )}
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 24 24">
              <path fill="none" stroke="#dc3545" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M-1 7h13m0 0l-3.5-3.5M12 7l-3.5 3.5"></path>
              <path fill="none" stroke="#198754" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17h12M12 17l3.5-3.5M12 17l3.5 3.5"></path>
            </svg>

            <div>
              <div className="text-center text-muted small-10 fw-bold">{t("OTTIENI")}</div>
              <div className="border border-4 border-success rounded">
                <img src={"https://baghe.altervista.org/bot/ptcgptrader/data/cards/" + IdCard + ".webp"}
                  alt={App.Cards[IdCard].Name} style={{ width: 96 }} />
              </div>
            </div>
          </div>

          <div className="card card-2 flex-grow-1 overflow-hidden">

            <div className="d-flex transition" style={{ width: "200%", marginLeft: TradeOpen.Visible ? "-100%" : 0 }}>
              <div className="w-50 card-body transition" style={{ maxHeight: TradeOpen.Visible ? 0 : "100%" }}>
                <div className="text-center text-muted small">
                  {t("Scegli una carta da scambiare per ottenere %s.", App.Cards[IdCard].Name)}
                </div>
                {Object.values(App.Trades[IdCard]).map((User) => {
                  const HasOffer = Object.values(App.Offers).find((Offer) => Offer.IdCard2 === IdCard && Offer.User.IdUser === User.IdUser)
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
                        {HasOffer ? (
                          <div>
                            <div className="d-flex align-items-center">
                              <div className="border border-2 border-danger rounded">
                                <img src={"https://baghe.altervista.org/bot/ptcgptrader/data/cards/" + HasOffer.IdCard1 + ".webp"}
                                  alt={App.Cards[HasOffer.IdCard1].Name} style={{ width: 56 }} />
                              </div>

                              <div className="spinner-border spinner-border-sm text-primary mx-2" role="status"></div>

                              <div className="border border-2 border-success rounded">
                                <img src={"https://baghe.altervista.org/bot/ptcgptrader/data/cards/" + IdCard + ".webp"}
                                  alt={App.Cards[IdCard].Name} style={{ width: 56 }} />
                              </div>
                            </div>

                            <div className="small text-muted">
                              {t("In attesa di risposta da %s.", User.FriendName)}
                            </div>
                            <div className="d-flex justify-content-between">
                              <button className="btn btn-sm btn-link text-danger px-0" onClick={() => TradeOfferCancel(HasOffer.IdOffer)}>
                                {t("Annulla offerta")}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="d-flex gap-1 overflow-auto">
                            {User.IdCardIn.map((IdCardIn) => (
                              <div key={IdCardIn} className="cursor-pointer border border-danger rounded overflow-hidden" onClick={() => setTradeOpen({
                                IdCard1: IdCardIn,
                                IdUser2: User.IdUser,
                                IdCard2: IdCard,
                                FriendName: User.FriendName,
                                PhotoUrl: User.PhotoUrl,
                                Visible: true
                              })}>
                                <img src={"https://baghe.altervista.org/bot/ptcgptrader/data/cards/" + IdCardIn + ".webp"}
                                  alt={App.Cards[IdCardIn].Name} style={{ width: 56 }} />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="w-50 card-body transition" style={{ maxHeight: TradeOpen.Visible ? "100%" : 0 }}>
                {TradeOpen.IdCard1 && (
                  <>
                    <div className="h4 fw-bold text-center text-white">
                      {t("Offerta di scambio")}
                    </div>

                    <div className="card">
                      <div className="card-body">
                        <div className="text-center small text-muted">
                          {t("Stai inviando un'offerta di scambio del tuo %s per %s di %s.", App.Cards[TradeOpen.IdCard1].Name, App.Cards[TradeOpen.IdCard2].Name, TradeOpen.FriendName)}<br />
                          {t("%s valuterà la tua offerta e potrà accettarla o rifiutarla.", TradeOpen.FriendName)}<br />
                          {t("Se accetterà, riceverai una notifica e vi verranno mostrati i rispettivi Codici Amico per completare lo scambio nel gioco.")}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="pt-2 d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={() => {
              if (TradeOpen.Visible) {
                setTradeOpen({ ...TradeOpen, Visible: false })
              } else {
                ThisClose()
              }
            }}>{t(TradeOpen.Visible ? "Indietro" : "Annulla")}</button>

            <button className="btn btn-primary transition"
              style={{ opacity: TradeOpen.Visible ? 1 : 0 }}
              disabled={!TradeOpen.Visible}
              onClick={() => {
                if (TradeOpen.Visible) {
                  TradeOfferSend()
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