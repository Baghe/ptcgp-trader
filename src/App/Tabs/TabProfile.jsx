import { useEffect, useState } from "react"
import t from "../Functions/LibLang"
import { ApiCall } from "../Functions/ApiCall"
import { StrInclude } from "../Functions/LibCommon"

export default function Tab({ App }) {
  const [UserProfile, setUserProfile] = useState(App.User.Profile)
  const [PanelShow, setPanelShow] = useState(null)

  function ProfileSave(UserProfileNew) {
    const UserProfile = { ...App.User.Profile, ...UserProfileNew }
    ApiCall("profile-save", {
      Value: UserProfile
    }, (Data) => {
      if (Data.Result) {
        App.Reload()
      }
    })
  }

  function CardsSave(Type, Cards) {
    ApiCall("cards-save", {
      Value: {
        Type: Type,
        Cards: Cards
      }
    }, (Data) => {
      if (Data.Result) {
        App.Reload()
      }
    })
  }

  return (
    <>
      <div className="card mb-3">
        <div className="card-header">
          {t("Profilo")}
        </div>
        <div className="card-body">
          <div className="d-flex mb-3">
            <div className="me-3">
              <img src={App.User.PhotoUrl} className="rounded-circle" width={56} height={56} alt={App.User.FirstName} />
            </div>
            <div>
              <div className="h3 mb-0 fw-bold">{App.User.FirstName} {App.User.LastName}</div>
              <div>
                <span className="text-muted">{App.User.Username && ("@" + App.User.Username)}</span>
                <span className="cursor-pointer" onClick={() => {
                  setUserProfile({ ...UserProfile, SetShowUsername: !UserProfile.SetShowUsername })
                  ProfileSave({ ...App.User.Profile, SetShowUsername: !UserProfile.SetShowUsername })
                }}>
                  {UserProfile.SetShowUsername ? (
                    <span className="badge bg-primary ms-2">{t("Visibile")}</span>
                  ) : (
                    <span className="badge bg-secondary ms-2">{t("Nascosto")}</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="card card-2 rounded-3 mb-1">
            <div className="card-body">
              <div className="row g-2">
                <div className="col-md-6">
                  <div className="text-muted small">{t("Nickname")}</div>
                  <input type="text" className="form-control bg-card border-0"
                    value={UserProfile.FriendName} onChange={(e) => setUserProfile({ ...UserProfile, FriendName: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <div className="text-muted small">{t("Codice amico")}</div>
                  <input type="text" className={"form-control bg-card border-0" + (UserProfile.FriendCode.length === 16 ? " is-valid" : " is-invalid")}
                    value={UserProfile.FriendCode.replace(/(\d{4})/g, '$1-').replace(/-$/, '')} onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setUserProfile({ ...UserProfile, FriendCode: value })
                    }} />
                </div>
              </div>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => ProfileSave(UserProfile)}>{t("Salva profilo")}</button>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-header d-flex align-items-center py-1">
          <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24">
            <path fill="none" stroke="#198754" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 10H3l4-4"></path>
            <path fill="none" stroke="#6c757d" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M0 14h14l-4 4"></path>
          </svg>
          <div>{t("Carte che cerco")}</div>
        </div>
        <div className="card-body">
          {App.CardsIn.length === 0 ? (
            <div className="text-center py-3">
              <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 512 512">
                <path fill="currentColor" d="m331.088 488.95l-101.23-47.053c-6.698-3.122-9.62-11.094-6.503-17.815l71.63-154.11c3.117-6.71 11.1-9.624 17.804-6.508l101.23 47.066c6.71 3.115 9.62 11.088 6.51 17.797l-71.64 154.11c-3.12 6.714-11.098 9.618-17.802 6.514zM86.8 472.134L19.596 316.04c-2.927-6.797.218-14.686 7.004-17.607l33.275-14.328l41.578 156.25c3.99 14.937 19.32 23.84 34.267 19.864l33.14-8.823l-64.445 27.752c-6.798 2.92-14.687-.22-17.614-7.017zm28.774-35.535L71.87 272.362c-1.905-7.152 2.362-14.498 9.502-16.398l28.89-7.683l-3.475 25.864c-2.06 15.313 8.68 29.423 24.01 31.488l67.774 9.135l-27.586 92.934c-2.845 9.578-.313 19.486 5.83 26.472L131.968 446.1c-7.146 1.906-14.493-2.35-16.393-9.5zm92.055-4.043l-13.603-4.042c-7.1-2.112-11.14-9.565-9.034-16.664l48.364-162.92c2.112-7.1 9.577-11.14 16.658-9.04l41.667 12.38l.006-.006l.112.035l-.118-.03a27.8 27.8 0 0 0-9.937 11.547L210.1 417.944a27.96 27.96 0 0 0-2.47 14.61zm-4.846-131.957l-70.033-9.44c-7.328-.992-12.48-7.743-11.494-15.078l22.695-168.43c.987-7.33 7.75-12.48 15.06-11.496l110.65 14.912c7.322.99 12.48 7.748 11.488 15.07l-13.96 103.622l-13.02-3.866c-14.828-4.408-30.412 4.066-34.808 18.878l-16.576 55.828zm253.322-8.668l-7.253-15.94l37.418-16.98l7.23 15.95l-37.394 16.97zm-9.353-27.805l-32.792-72.222a93.5 93.5 0 0 0 32.026-14.41l32.726 72.133l-31.96 14.5zm-83.41-88.155c-41.006-16.174-61.152-62.585-44.977-103.603c16.18-40.993 62.603-61.15 103.603-44.977c41.01 16.18 61.15 62.604 44.982 103.62c-16.187 40.995-62.604 61.147-103.61 44.96zm86.378-51.78c12.434-31.488-3.038-67.135-34.55-79.563c-31.493-12.427-67.14 3.045-79.58 34.544c-12.427 31.5 3.05 67.16 34.557 79.58c31.5 12.43 67.146-3.043 79.574-34.56zm-30.106-16.96c1.96-22.547-12.634-42.758-33.676-48.653c3.86-.732 7.9-.956 12.014-.602c24.27 2.1 42.292 23.492 40.197 47.768c-2.078 23.94-22.914 41.79-46.766 40.274c15.366-6.48 26.702-21.03 28.23-38.787z"></path>
              </svg>
              <div className="fw-bold">{t("Non cerchi nessuna carta")}</div>
              <div className="small text-muted">{t("Seleziona almeno una carta per vedere gli scambi disponibili con gli altri giocatori")}</div>
              <button className="btn btn-primary mt-3" onClick={() => setPanelShow("CardsIn")}>
                {t("Seleziona le carte che cerchi")}
              </button>
            </div>
          ) : (
            <>
              <div className="d-flex flex-wrap gap-2 user-select-none">
                {Object.keys(App.CardsIn).map((IdCard) => (
                  <div key={IdCard}>
                    <img src={"https://baghe.altervista.org/bot/ptcgptrader/data/cards/" + IdCard + ".webp"}
                      alt={App.Cards[IdCard].Name} style={{ width: 64 }} />
                  </div>
                ))}
              </div>
              <button className="btn btn-primary mt-2" onClick={() => setPanelShow("CardsIn")}>
                {t("Modifica carte")}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header d-flex align-items-center py-1">
          <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24">
            <path fill="none" stroke="#6c757d" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 10H3l4-4"></path>
            <path fill="none" stroke="#dc3545" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M0 14h14l-4 4"></path>
          </svg>
          <div>{t("Carte che offro")}</div>
        </div>
        <div className="card-body">
          {App.CardsOut.length === 0 ? (
            <div className="text-center py-3">
              <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 512 512">
                <path fill="currentColor" d="m209.955 488.202l-121.242-46.62c-11.308-4.34-11.643-12.087-.79-17.288L204.8 469.236c15.024 5.777 37.23 4.92 51.774-1.96l161.522-76.6c10.014 4.436 9.864 11.818-.67 16.798L250.43 486.668c-10.983 5.195-29.128 5.902-40.477 1.534zm0-32.37L88.713 409.21c-9.623-3.69-11.303-9.85-4.903-14.81l120.99 46.517c15.024 5.776 37.23 4.92 51.774-1.96l165.393-78.433c5.855 4.417 4.38 10.36-4.542 14.58l-166.993 79.193c-10.983 5.196-29.128 5.903-40.477 1.534zm0-28.314L88.713 380.892c-9.624-3.69-11.302-9.85-4.902-14.813l120.99 46.523c15.024 5.77 37.23 4.914 51.774-1.96l165.393-78.438c5.855 4.416 4.38 10.36-4.542 14.58l-166.993 79.2c-10.983 5.194-29.128 5.895-40.477 1.533zm0-28.32L88.713 352.572c-9.624-3.69-11.302-9.85-4.902-14.812l120.99 46.524c15.024 5.776 37.23 4.92 51.774-1.96l165.393-78.44c5.855 4.424 4.38 10.368-4.542 14.586l-166.993 79.194c-10.983 5.196-29.128 5.897-40.477 1.534zm0-28.32L88.713 324.26c-11.35-4.355-11.643-12.15-.66-17.353l87.236-41.376l34.826 18.323c15.365 8.09 37.937 7.06 52.5-2.39l65.74-42.672l88.404 34.007c11.344 4.357 11.65 12.16.665 17.354l-166.993 79.195c-10.983 5.195-29.128 5.902-40.477 1.534zm6.85-99.73L93.44 206.22c-10.767-5.67-11.217-15.647-1.018-22.268l105.11-68.228h25.845l.015 64.962h58.664v-64.962H332.2l-27.487-41.39l118.91 62.584c10.763 5.67 11.212 15.646 1.013 22.268L254.803 269.418c-10.2 6.62-27.23 7.4-37.997 1.73zm21.637-105.523V100.67h-34.845l49.13-79.74l49.12 79.74H267v64.955z"></path>
              </svg>
              <div className="fw-bold">{t("Non offri nessuna carta")}</div>
              <div className="small text-muted">{t("Seleziona almeno una carta che sei disposto a scambiare")}</div>
              <button className="btn btn-primary mt-3" onClick={() => setPanelShow("CardsOut")}>
                {t("Seleziona le carte che offri")}
              </button>
            </div>
          ) : (
            <>
              <div className="d-flex flex-wrap gap-2 user-select-none">
                {Object.keys(App.CardsOut).map((IdCard) => (
                  <div key={IdCard} className="position-relative">
                    <img src={"https://baghe.altervista.org/bot/ptcgptrader/data/cards/" + IdCard + ".webp"}
                      alt={App.Cards[IdCard].Name} style={{ width: 64 }} />
                    <div className="position-absolute bottom-0 start-0 w-100 z-2 text-end p-1">
                      <div className="badge bg-card rounded-pill">{App.CardsOut[IdCard]}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary mt-2" onClick={() => setPanelShow("CardsOut")}>
                {t("Modifica carte")}
              </button>
            </>
          )}

        </div>
      </div>

      {PanelShow && (
        <CardSelect App={App} PanelShow={PanelShow} Close={(Cards) => {
          setPanelShow(null)
          if (Cards) {
            CardsSave(PanelShow, Cards)
          }
        }} Preselect={App[PanelShow]} />
      )}
    </>
  )
}

function CardSelect({ App, PanelShow, Close, Preselect }) {
  const [Visible, setVisible] = useState(false)
  const [CardsSelected, setCardsSelected] = useState(Preselect || {})
  const [CardSearch, setCardSearch] = useState("")

  useEffect(() => {
    setVisible(true)
  }, [])

  function ThisClose(IdCard) {
    setVisible(false)
    setTimeout(() => Close(IdCard), 300)
  }

  function CardSingle(IdCard) {
    const Selected = CardsSelected[IdCard]
    return (
      <div key={IdCard} className="position-relative rounded cursor-pointer overflow-hidden" onClick={() => {
        if (Selected) {
          const CardsSelectedNew = { ...CardsSelected }
          delete CardsSelectedNew[IdCard]
          setCardsSelected(CardsSelectedNew)
        } else {
          setCardsSelected({ ...CardsSelected, [IdCard]: true })
        }
      }}>
        <img src={"https://baghe.altervista.org/bot/ptcgptrader/data/cards/" + IdCard + ".webp"} alt=""
          className={Selected ? "opacity-25" : ""} style={{ width: 96 }} />
        {Selected && (
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center z-2">
            <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48">
              <defs>
                <mask id="ipSCheckOne0">
                  <g fill="none" strokeLinejoin="round" strokeWidth={4}>
                    <path fill="#fff" stroke="#fff" d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"></path>
                    <path stroke="#000" strokeLinecap="round" d="m16 24l6 6l12-12"></path>
                  </g>
                </mask>
              </defs>
              <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSCheckOne0)"></path>
            </svg>
          </div>
        )}
      </div>
    )
  }

  function CardMultiple(IdCard) {
    const Amount = CardsSelected[IdCard] || 0
    return (
      <div key={IdCard} className={"position-relative rounded overflow-hidden" + (Amount ? "" : " cursor-pointer")} onClick={() => {
        if (!Amount) {
          setCardsSelected({ ...CardsSelected, [IdCard]: 1 })
        }
      }}>
        <img src={"https://baghe.altervista.org/bot/ptcgptrader/data/cards/" + IdCard + ".webp"} alt=""
          className={Amount ? "opacity-25" : ""} style={{ width: 96 }} />
        {Amount > 0 && (
          <>
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center z-2">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 48 48" onClick={() => {
                  if (Amount > 1) {
                    setCardsSelected({ ...CardsSelected, [IdCard]: Amount - 1 })
                  } else {
                    const CardsSelectedNew = { ...CardsSelected }
                    delete CardsSelectedNew[IdCard]
                    setCardsSelected(CardsSelectedNew)
                  }
                }} className="cursor-pointer">
                  <circle cx={24} cy={24} r={21} fill="#dc3545"></circle>
                  <g fill="#fff">
                    <path d="M14 21h20v6H14z"></path>
                  </g>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 48 48" className="cursor-pointer"
                  onClick={() => setCardsSelected({ ...CardsSelected, [IdCard]: Amount + 1 })}>
                  <circle cx={24} cy={24} r={21} fill="#198754"></circle>
                  <g fill="#fff">
                    <path d="M21 14h6v20h-6z"></path>
                    <path d="M14 21h20v6H14z"></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="position-absolute bottom-0 start-0 w-100 z-2 bg-card text-center fw-bold">
              {Amount}
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <div className={"panel-bottom" + (Visible ? " active" : "")} onClick={() => ThisClose(null)}>
      <div className="panel-content container p-3" onClick={(e) => e.stopPropagation()}>

        <div className="d-flex flex-column h-100">
          {PanelShow === "CardsIn" && (
            <div className="card card-2 mb-2">
              <div className="card-header d-flex align-items-center py-1">
                <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24">
                  <path fill="none" stroke="#198754" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 10H3l4-4"></path>
                  <path fill="none" stroke="#6c757d" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M0 14h14l-4 4"></path>
                </svg>
                <div>{t("Carte che cerco")}</div>
              </div>
              <div className="card-body text-muted py-2">
                {t("Seleziona le carte che vuoi ottenere dagli scambi con gli altri giocatori.")}
              </div>
            </div>
          )}
          {PanelShow === "CardsOut" && (
            <div className="card card-2 mb-2">
              <div className="card-header d-flex align-items-center py-1">
                <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24">
                  <path fill="none" stroke="#6c757d" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 10H3l4-4"></path>
                  <path fill="none" stroke="#dc3545" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M0 14h14l-4 4"></path>
                </svg>
                <div>{t("Carte che offro")}</div>
              </div>
              <div className="card-body text-muted py-2">
                {t("Seleziona le carte che puoi scambiare con gli altri giocatori.")}
              </div>
            </div>
          )}
          <input type="text" className="form-control bg-card-2 border-0 mb-2 rounded-3" placeholder={t("Cerca carta")}
            value={CardSearch} onChange={(e) => setCardSearch(e.target.value)} />
          <div className="card card-2 overflow-auto flex-grow-1">
            <div className="card-body">
              <div className="d-flex flex-wrap gap-2 justify-content-center user-select-none">
                {Object.keys(App.Cards).filter(
                  (IdCard) => StrInclude(IdCard, CardSearch) || StrInclude(App.Cards[IdCard].Name, CardSearch)
                ).map((IdCard) => {
                  if (PanelShow === "CardsIn") {
                    return CardSingle(IdCard)
                  }
                  return CardMultiple(IdCard)
                })}
              </div>
            </div>
          </div>
          <div className="pt-2 d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={() => ThisClose()}>{t("Annulla")}</button>
            <button className="btn btn-primary" onClick={() => ThisClose(CardsSelected)}>{t("Conferma")}</button>
          </div>
        </div>

      </div>
    </div>
  )
}