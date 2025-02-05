import { useEffect, useState, type FC } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { ApiCall } from '../Functions';

interface CardsType {
  [key: string]: string[];
}

import CardsRaw from '../Cards.json';
const Cards = CardsRaw as CardsType;

export const Trades: FC = () => {
  const { initData } = retrieveLaunchParams();
  const [Trades, setTrades] = useState(null);
  const [TradesPending, setTradesPending] = useState(null);
  const [TradesFiltered, setTradesFiltered] = useState<any>([]);
  const [Search, setSearch] = useState('');
  const [IdTrade, setIdTrade] = useState<any>(null);
  const [TradeSelected, setTradeSelected] = useState<any>(null);

  useEffect(() => {
    Load()
  }, []);

  useEffect(() => {
    if (Trades) {
      if (Search.trim().length) {
        setTradesFiltered(Object.values(Trades).filter((Trade: any) => {
          return Trade.Offers.some((IdCard: string) => Cards[IdCard][0].toLowerCase().includes(Search.toLowerCase()));
        }));
      } else {
        setTradesFiltered(Object.values(Trades));
      }
    }
  }, [Trades, Search]);

  function Load() {
    ApiCall("trades-get", {}, (data) => {
      setTrades(data.Data);
    });
    ApiCall("trades-pending", {}, (data) => {
      setTradesPending(data.Data);
    });
  }

  function BidSend(IdTrade: string, IdCard: string) {
    ApiCall("trades-bid-send", { IdTrade, IdCard }, () => {
      Load();
    });
  }

  function BidCancel(IdTrade: string) {
    ApiCall("trades-bid-cancel", { IdTrade }, () => {
      Load();
    });
  }

  function TradeComplete(IdTrade: string) {
    ApiCall("trade-complete", { IdTrade: IdTrade }, (data) => {
      if (data.Result) {
        Load();
      }
    });
  }

  function TradeCancel(IdTrade: string) {
    ApiCall("trade-cancel", { IdTrade: IdTrade }, (data) => {
      if (data.Result) {
        Load();
      }
    });
  }

  return initData && TradesFiltered && TradesPending ? (
    <>
      <div className="container py-3">

        {Object.values(TradesPending).length > 0 && (
          <>
            <div className="text-primary h5">Accepted trades ({Object.values(TradesPending).length})</div>
            <div className="d-flex flex-column gap-2 mb-4">
              {Object.keys(TradesPending).map((IdTrade: string) => {
                const Trade = TradesPending[IdTrade] as any;
                return (
                  <div key={IdTrade} className="card">
                    <div className="card-body">

                      <div className="text-primary h6 mb-1">Trader</div>
                      <div className="rounded-2 overflow-hidden p-2 mb-2" style={{ backgroundColor: "#17212b" }}>
                        {Trade.Trader.FriendName && (
                          <div className="mb-2">
                            <div className="small text-muted">Player</div>
                            {Trade.Trader.Username ? (
                              <a href={"https://t.me/" + Trade.Trader.Username} target="_blank" className="h5 mb-0">{Trade.Trader.FriendName}</a>
                            ) : (
                              <div className="h5 mb-0">{Trade.Trader.FriendName}</div>
                            )}
                          </div>
                        )}

                        <div>
                          <div className="small text-muted">Friend Code</div>
                          <div className="input-group">
                            <input type="text" className="form-control bg-light bg-opacity-25 fw-bold border-0"
                              defaultValue={Trade.Trader.FriendCode.replace(/(\d{4})/g, '$1-').replace(/-$/, '')} />
                            <button className="btn btn-primary" onClick={() => {
                              navigator.clipboard.writeText(Trade.Trader.FriendCode);
                            }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
                                  <path d="M19.4 20H9.6a.6.6 0 0 1-.6-.6V9.6a.6.6 0 0 1 .6-.6h9.8a.6.6 0 0 1 .6.6v9.8a.6.6 0 0 1-.6.6"></path>
                                  <path d="M15 9V4.6a.6.6 0 0 0-.6-.6H4.6a.6.6 0 0 0-.6.6v9.8a.6.6 0 0 0 .6.6H9"></path>
                                </g>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="text-danger h6 mb-1">Send</div>
                      <div className="d-flex rounded-2 overflow-hidden p-2 mb-2" style={{ backgroundColor: "#17212b" }}>
                        <img src={"https://baghe.altervista.org/bot/ptcgptrader/v1/data/cards/" + Trade.IdCard + ".webp"} alt="" style={{ height: 96 }} />
                        <div className="flex-grow-1 ms-2">
                          <div className="badge bg-primary">{Cards[Trade.IdCard][1]}</div>
                          <div className="fw-bold text-truncate">{Cards[Trade.IdCard][0]}</div>
                        </div>
                      </div>

                      <div className="text-success h6 mb-1">Receive</div>
                      <div className="d-flex rounded-2 overflow-hidden p-2 mb-2" style={{ backgroundColor: "#17212b" }}>
                        <img src={"https://baghe.altervista.org/bot/ptcgptrader/v1/data/cards/" + Trade.IdCardTraded + ".webp"} alt="" style={{ height: 96 }} />
                        <div className="flex-grow-1 ms-2">
                          <div className="badge bg-primary">{Cards[Trade.IdCardTraded][1]}</div>
                          <div className="fw-bold text-truncate">{Cards[Trade.IdCardTraded][0]}</div>
                        </div>
                      </div>

                      <div className="d-flex gap-2">
                        <div className="w-50">
                          <button className="btn btn-sm btn-danger fw-bold w-100" onClick={() => TradeCancel(IdTrade)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className='d-inline'>
                              <path fill="currentColor" d="M9.075 21q-.4 0-.762-.15t-.638-.425l-4.1-4.1q-.275-.275-.425-.638T3 14.926v-5.85q0-.4.15-.762t.425-.638l4.1-4.1q.275-.275.638-.425T9.075 3h5.85q.4 0 .763.15t.637.425l4.1 4.1q.275.275.425.638t.15.762v5.85q0 .4-.15.763t-.425.637l-4.1 4.1q-.275.275-.638.425t-.762.15zM12 13.4l2.15 2.15q.275.275.7.275t.7-.275t.275-.7t-.275-.7L13.4 12l2.15-2.15q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 10.6L9.85 8.45q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L10.6 12l-2.15 2.15q-.275.275-.275.7t.275.7t.7.275t.7-.275z"></path>
                            </svg>
                            <span className='d-none d-sm-inline ms-2'>Cancelled</span>
                          </button>
                        </div>
                        <div className="w-50">
                          <button className="btn btn-sm btn-success fw-bold w-100" onClick={() => TradeComplete(IdTrade)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" className='d-inline'>
                              <path fill="currentColor" d="M12 9L8.5 5.5L12 2l3.5 3.5zM1 20v-4q0-.85.588-1.425T3 14h3.275q.5 0 .95.25t.725.675q.725.975 1.788 1.525T12 17q1.225 0 2.288-.55t1.762-1.525q.325-.425.763-.675t.912-.25H21q.85 0 1.425.575T23 16v4h-7v-2.275q-.875.625-1.888.95T12 19q-1.075 0-2.1-.337T8 17.7V20zm3-7q-1.25 0-2.125-.875T1 10q0-1.275.875-2.137T4 7q1.275 0 2.138.863T7 10q0 1.25-.862 2.125T4 13m16 0q-1.25 0-2.125-.875T17 10q0-1.275.875-2.137T20 7q1.275 0 2.138.863T23 10q0 1.25-.862 2.125T20 13"></path>
                            </svg>
                            <span className='d-none d-sm-inline ms-2'>Completed</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>

        )}

        <div className="text-primary h5">Trades</div>

        <div className="card mb-3">
          <div className="card-body pt-2">
            <div className="text-muted small ps-2">I want</div>
            <input type="text" className="form-control rounded-3" placeholder="Mewtwo"
              value={Search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        {TradesFiltered.length === 0 ? (
          <div className="text-muted small text-center">No trades found</div>
        ) : (
          <div className="d-flex flex-column gap-2">
            <div className="d-flex justify-content-between">
              <div className="text-success h6 w-50 text-center">Receive</div>
              <div className="opacity-25">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 17h12M4 17l3.5-3.5M4 17l3.5 3.5M7 7h13m0 0l-3.5-3.5M20 7l-3.5 3.5"></path>
                </svg>
              </div>
              <div className="text-danger h6 w-50 text-center">Send</div>
            </div>

            {TradesFiltered.map((Trade: any) => {
              const OffersFiltered = Trade.Offers.filter((IdCard: string) => {
                if (Search.trim().length) {
                  return Cards[IdCard][0].toLowerCase().includes(Search.toLowerCase());
                }
                return true;
              });
              return (
                <div key={Trade.IdTrade} className="d-flex overflow-hidden cursor-pointer" onClick={() => {
                  setTradeSelected(OffersFiltered.length === 1 ? OffersFiltered[0] : null);
                  setIdTrade(Trade.IdTrade)
                }}>
                  <div className="w-50">
                    <div className="card h-100 rounded-end-0 border-end" style={{ backgroundColor: '#223b40' }}>
                      <div className="card-body p-2">

                        <div className="d-flex flex-wrap gap-1">
                          {OffersFiltered.length === 1 ? (
                            <div className="d-flex">
                              <img src={"https://baghe.altervista.org/bot/ptcgptrader/v1/data/cards/" + OffersFiltered[0] + ".webp"} alt="" style={{ height: 96 }}
                                className="me-2" />
                              <div className="flex-grow-1">
                                <div className="badge bg-primary">{Cards[OffersFiltered[0]][1]}</div>
                                <div className="fw-bold text-truncate">{Cards[OffersFiltered[0]][0]}</div>
                                <div className="small">#{OffersFiltered[0]}</div>
                              </div>
                            </div>
                          ) : (
                            OffersFiltered.map((IdCard: string) => {
                              const Height = OffersFiltered.length > 1 ? (OffersFiltered.length > 3 ? 46 : 64) : 96;
                              return (
                                <img src={"https://baghe.altervista.org/bot/ptcgptrader/v1/data/cards/" + IdCard + ".webp"} alt="" key={IdCard} style={{ height: Height }} />
                              )
                            })
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-50">
                    <div className="card h-100 rounded-start-0" style={{ backgroundColor: '#3f2f3d' }}>
                      <div className="card-body p-2 d-flex">
                        <img src={"https://baghe.altervista.org/bot/ptcgptrader/v1/data/cards/" + Trade.IdCard + ".webp"} alt="" style={{ height: 96 }}
                          className="img-fluid d-block" />
                        <div className="flex-grow-1 ms-2">
                          <div className="badge bg-primary">{Cards[Trade.IdCard][1]}</div>
                          <div className="fw-bold text-truncate">{Cards[Trade.IdCard][0]}</div>
                          <div className="small">#{Trade.IdCard}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {IdTrade && Trades && (
        <div className="position-fixed h-100 w-100 top-0 start-0 z-5" style={{ background: '#17212b' }}>
          <div className="d-flex flex-column w-100 h-100">

            {(() => {
              const Trade = Trades[IdTrade] as any;
              const OffersFiltered = Trade.Offers.filter((IdCard: string) => {
                if (Trade.MyBid) {
                  return IdCard === Trade.MyBid.IdCard;
                }
                if (Search.trim().length) {
                  return Cards[IdCard][0].toLowerCase().includes(Search.toLowerCase());
                }
                return true;
              })

              return (
                <div className="flex-grow-1 overflow-auto">
                  <div className="container py-3">
                    <div className="text-success h5">
                      Receive
                    </div>

                    <div className="card mb-3">
                      <div className="card-body p-2">
                        {OffersFiltered.length === 1 ? (
                          <div className="d-flex overflow-hidden">
                            <img src={"https://baghe.altervista.org/bot/ptcgptrader/v1/data/cards/" + OffersFiltered[0] + ".webp"} alt="" style={{ height: 96 }} />
                            <div className="flex-grow-1 ms-2">
                              <div className="badge bg-primary">{Cards[OffersFiltered[0]][1]}</div>
                              <div className="fw-bold text-truncate">{Cards[OffersFiltered[0]][0]}</div>
                              <div className="small">#{OffersFiltered[0]}</div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="row g-2">
                              {OffersFiltered.map((IdCard: string) => (
                                <div key={IdCard} className="col-4 col-sm-4 col-md-3 col-lg-2">
                                  <div className="card overflow-hidden rounded-2 cursor-pointer position-relative" onClick={() => {
                                    if (TradeSelected === IdCard) {
                                      setTradeSelected(null);
                                    } else {
                                      setTradeSelected(IdCard);
                                    }
                                  }}>
                                    <img src={"https://baghe.altervista.org/bot/ptcgptrader/v1/data/cards/" + IdCard + ".webp"} alt=""
                                      className={TradeSelected === IdCard ? "opacity-25" : ""} />
                                    {TradeSelected === IdCard && (
                                      <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center z-2">
                                        <div className="text-white">
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
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="text-muted small text-center mt-2">
                              Pick one card
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="text-danger h5">
                      Send
                    </div>
                    <div className="card mb-3">
                      <div className="card-body p-2">
                        <div className="d-flex overflow-hidden">
                          <img src={"https://baghe.altervista.org/bot/ptcgptrader/v1/data/cards/" + Trade.IdCard + ".webp"} alt="" style={{ height: 96 }} />
                          <div className="flex-grow-1 ms-2">
                            <div className="badge bg-primary">{Cards[Trade.IdCard][1]}</div>
                            <div className="fw-bold text-truncate">{Cards[Trade.IdCard][0]}</div>
                            <div className="small">#{Trade.IdCard}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {Trade.MyBid ? (
                      <>
                        {Trade.MyBid.BidStatus === "sent" && (
                          <button className="btn btn-danger w-100" onClick={() => BidCancel(IdTrade)}>
                            Withdraw trade offer
                          </button>
                        )}
                        {Trade.MyBid.BidStatus === "rejected" && (
                          <div className="text-danger text-center">
                            Trade offer rejected
                          </div>
                        )}
                      </>
                    ) : (
                      window.MiniApp.friendCode ? (
                        <>
                          <button className="btn btn-lg btn-primary w-100" disabled={!TradeSelected} onClick={() => BidSend(IdTrade, TradeSelected)}>
                            Send trade offer
                          </button>
                          <div className="text-muted small mt-2 lh-1">
                            The player will receive a notification to accept or decline the trade offer.
                            If the player accepts the trade offer, you will see each other's friend code and you can trade in the game.
                            If the player set a public Telegram username, you can also chat with the player.
                          </div>
                        </>
                      ) : (
                        <div className="text-danger text-center">
                          Set your friend code in the profile to send trade offers
                        </div>
                      )
                    )}
                  </div>
                </div>
              )
            })()}

            <div className="py-3" style={{ background: '#1e2a35' }}>
              <div className="container d-flex justify-content-between align-items-center">
                <button className='btn btn-secondary d-flex align-items-center' onClick={() => setIdTrade(null)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 7l10 10M7 17L17 7"></path>
                  </svg>
                  <div className="ms-2">
                    Close
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  ) : (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="spinner-border text-primary" role="status" />
    </div>
  )
};
