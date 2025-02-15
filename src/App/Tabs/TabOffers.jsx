import { useEffect, useState } from "react"
import t from "../Functions/LibLang"
import { ApiCall } from "../Functions/ApiCall"

export default function Tab({ App }) {
  return (
    <>
      <div className="display-6 mb-3">
        {t("Offerte di scambio")}
      </div>
      <div className="card">
        <div className="card-body">
          {Object.keys(App.Offers).length ? (
            <>
              {Object.values(App.Offers).map((Offer) => (
                <div key={Offer.IdOffer} className="card card-2 mb-3">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="border border-2 border-danger rounded">
                        <img src={"https://baghe.altervista.org/bot/ptcgptrader/data/cards/" + Offer.IdCard1 + ".webp"}
                          alt={App.Cards[Offer.IdCard1].Name} style={{ width: 56 }} />
                      </div>

                      <div>
                        <div>
                          <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24">
                            <path fill="none" stroke="#dc3545" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={1.5}
                              d="m14 16l4-4m0 0l-4-4m4 4H6"></path>
                          </svg>
                        </div>
                        <div>
                          <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24">
                            <path fill="none" stroke="#198754" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={1.5}
                              d="m10 16l-4-4m0 0l4-4m-4 4h12"></path>
                          </svg>
                        </div>
                      </div>

                      <div className="border border-2 border-success rounded">
                        <img src={"https://baghe.altervista.org/bot/ptcgptrader/data/cards/" + Offer.IdCard2 + ".webp"}
                          alt={App.Cards[Offer.IdCard2].Name} style={{ width: 56 }} />
                      </div>
                    </div>

                    <pre>{JSON.stringify(Offer, null, 2)}</pre>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 512 512">
                <path fill="currentColor" d="M258.148 20.822q-1.668.012-3.343.055c-39.32 1.041-81.507 15.972-123.785 50.404l-6.028 4.91l-5.732-5.25c-12.644-11.578-20.276-27.633-25.653-43.716c-8.974 36.98-14.631 81.385-9.232 114.523c18.065.908 45.409-2.177 73.7-7.818c17.858-3.561 36.048-8.126 53.064-13.072c-13.419-2.911-25.896-6.882-38.143-12.082l-16.088-6.832l14.906-9.127c46.367-28.393 80.964-40.686 120.235-35.553c33.105 4.327 69.357 20.867 119.066 47.271c-25.373-36.314-62.243-64.737-104.728-76.994c-15.402-4.443-31.553-6.828-48.239-6.719M346 116c-46.667 0-46.666 0-46.666 46.666V349.4c0 9.596.007 17.19.414 23.242a665 665 0 0 1 50.656-12.223c24.649-4.915 48.367-8.224 67.916-8.41c6.517-.062 12.571.224 18.041.912l6.31.793l1.358 6.213c2.464 11.265 3.673 23.447 3.914 36.059c38.032-.19 38.057-3.06 38.057-46.65V162.665C486 116 486 116 439.334 116a227 227 0 0 1 3.978 7.64l12.624 25.536l-25.004-13.648c-13.085-7.143-25.164-13.632-36.452-19.528zm-281.943.016c-38.032.19-38.057 3.06-38.057 46.65V349.4C26 396 26 396 72.666 396a227 227 0 0 1-3.978-7.64l-12.624-25.536l25.004 13.649c13.085 7.142 25.164 13.632 36.452 19.527H166c46.667 0 46.666 0 46.666-46.666V162.666c0-9.626-.006-17.24-.416-23.304a665 665 0 0 1-50.654 12.22c-32.865 6.554-64.077 10.25-85.957 7.498l-6.31-.793l-1.358-6.213c-2.464-11.265-3.673-23.446-3.914-36.058m354.619 254.078c-17.543.25-40.826 3.206-64.75 7.977c-17.859 3.56-36.05 8.125-53.065 13.072c13.419 2.91 25.896 6.881 38.143 12.082l16.088 6.832l-14.906 9.127c-46.367 28.392-80.964 40.685-120.235 35.553c-33.105-4.327-69.357-20.868-119.066-47.272c25.373 36.315 62.243 64.738 104.728 76.994c52.573 15.166 113.872 6.343 175.367-43.74l6.028-4.91l5.732 5.25c12.644 11.579 20.276 27.633 25.653 43.717c8.974-36.981 14.631-81.386 9.232-114.524c-2.788-.14-5.748-.204-8.95-.158z"></path>
              </svg>
              <div className="fw-bold">{t("Nessuna offerta di scambio")}</div>
              <div className="small text-muted">{t("Proponi degli scambi nella sezione \"Scambi disponibili\"")}</div>
            </div>
          )}
        </div>
      </div>


    </>
  )
}