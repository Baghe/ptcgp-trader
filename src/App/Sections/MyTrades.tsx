import { useEffect, useState, type FC } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { ApiCall } from '../Functions';

interface CardsType {
  [key: string]: string[];
}

import CardsRaw from '../Cards.json';
const Cards = CardsRaw as CardsType;

export const MyTrades: FC = () => {
  const { initData } = retrieveLaunchParams();
  const [Trades, setTrades] = useState(null);
  const [CardSelect, setCardSelect] = useState<any>(false);
  const [CardSearch, setCardSearch] = useState("");
  const [CardFiltered, setCardFiltered] = useState<any>([]);
  const [CardSelected, setCardSelected] = useState<string[]>([]);
  const [FormData, setFormData] = useState({
    IdCard: null as string | null,
    Offers: [] as string[]
  });

  useEffect(() => {
    Load()
  }, []);

  useEffect(() => {
    if (CardSearch) {
      setCardFiltered(Object.keys(Cards).filter((IdCard: string) => {
        const Card = Cards[IdCard];
        if (CardSelect === "Offers" && FormData.IdCard) {
          if (Card[1] !== Cards[FormData.IdCard][1] || IdCard === FormData.IdCard) {
            return false;
          }
        }
        return IdCard.toLowerCase().includes(CardSearch.trim().toLowerCase()) ||
          Card[0].toLowerCase().includes(CardSearch.toLowerCase())
      }));
    } else {
      setCardFiltered([]);
    }
  }, [CardSearch]);

  function Load() {
    ApiCall("my-trades-get", {}, (data) => {
      setTrades(data.Data);
    });
  }

  function Add() {
    ApiCall("my-trades-add", FormData, (data) => {
      if (data.Result) {
        Load();
        setFormData({ IdCard: null, Offers: [] });
      }
    });
  }

  function BidReject(IdTrade: string, IdHash: string) {
    ApiCall("my-trades-bid-reject", { IdTrade: IdTrade, IdHash: IdHash }, (data) => {
      if (data.Result) {
        Load();
      }
    });
  }

  function BidAccept(IdTrade: string, IdHash: string) {
    ApiCall("my-trades-bid-accept", { IdTrade: IdTrade, IdHash: IdHash }, (data) => {
      if (data.Result) {
        Load();
      }
    });
  }

  function TradeComplete(IdTrade: string) {
    ApiCall("my-trades-complete", { IdTrade: IdTrade }, (data) => {
      if (data.Result) {
        Load();
      }
    });
  }

  function TradeCancel(IdTrade: string) {
    ApiCall("my-trades-cancel", { IdTrade: IdTrade }, (data) => {
      if (data.Result) {
        Load();
      }
    });
  }

  return Trades && initData ? (
    <>
      <div className="container py-3">
        <div className="text-primary h5">My open trades{Object.keys(Trades).length > 0 && " (" + Object.keys(Trades).length + ")"}</div>
        {Object.keys(Trades).length === 0 ? (
          <div className="card mb-4">
            <div className="card-body">
              <div className="text-muted small">No trades</div>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column gap-2 mb-4">
            {Object.keys(Trades).map((IdTrade: string) => {
              const Trade = Trades[IdTrade] as any;
              return (
                <div key={IdTrade} className="card">
                  <div className="card-body py-2">

                    <div className="mb-1">
                      {Trade.Status === "open" && (
                        <span className="fw-bold fs-6 text-primary">
                          <div className="spinner-border spinner-border-sm text-primary me-2" role="status" />
                          Trade open
                        </span>
                      )}
                      {Trade.Status === "accepted" && (
                        <span className="fw-bold fs-6 text-success">
                          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 256 256" className="me-2">
                            <path fill="currentColor" d="M220.69 100.17a12 12 0 0 0-9.85 13.83a85 85 0 0 1 1.16 14a83.57 83.57 0 0 1-18 51.94a83.5 83.5 0 0 0-29-23.42a52 52 0 1 0-74 0a83.5 83.5 0 0 0-29 23.42A83.94 83.94 0 0 1 128 44a85 85 0 0 1 14 1.16a12 12 0 0 0 4-23.67A108.1 108.1 0 0 0 20 128a108 108 0 0 0 216 0a109 109 0 0 0-1.49-18a12 12 0 0 0-13.82-9.83M100 120a28 28 0 1 1 28 28a28 28 0 0 1-28-28m-20.43 76.57a60 60 0 0 1 96.86 0a83.72 83.72 0 0 1-96.86 0M240.49 48.49l-32 32a12 12 0 0 1-17 0l-16-16a12 12 0 0 1 17-17L200 55l23.51-23.52a12 12 0 1 1 17 17Z"></path>
                          </svg>
                          Trade offer accepted
                        </span>
                      )}
                    </div>

                    <div className="d-flex rounded-2 overflow-hidden p-2" style={{ backgroundColor: "#17212b" }}>
                      <img src={"https://static.dotgg.gg/pokepocket/card/" + Trade.IdCard + ".webp"} alt="" style={{ height: 96 }} />
                      <div className="flex-grow-1 ms-2">
                        <div className="badge bg-primary">{Cards[Trade.IdCard][1]}</div>
                        <div className="fw-bold text-truncate">{Cards[Trade.IdCard][0]}</div>
                        <div className="d-flex flex-wrap gap-1">
                          <div className='d-flex align-items-center'>
                            <div className="fw-bold small" style={{ width: 24, height: 24 }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 17h12M4 17l3.5-3.5M4 17l3.5 3.5M7 7h13m0 0l-3.5-3.5M20 7l-3.5 3.5"></path>
                              </svg>
                            </div>
                          </div>
                          {Trade.Offers.slice(0, 3).map((IdCard: string) => {
                            return (
                              <img src={"https://static.dotgg.gg/pokepocket/card/" + IdCard + ".webp"} alt="" key={IdCard} style={{ height: 48 }} />
                            )
                          })}
                          {Trade.Offers.length > 3 && (
                            <div className='d-flex align-items-center'>
                              <div className="fw-bold small text-nowrap" style={{ width: 24, height: 24 }}>
                                +{Trade.Offers.length - 3}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {Trade.Status === "open" && (
                      <div className="mt-1">
                        <button className="btn btn-sm btn-danger fw-bold px-3" onClick={() => TradeCancel(IdTrade)}>
                          Cancel trade
                        </button>

                        {Trade.Bids.length > 0 ? (
                          <>
                            <div className="text-primary h6 mt-3 mb-1">Trade offers received ({Trade.Bids.length})</div>
                            <div className="d-flex flex-column gap-1">
                              {Trade.Bids.map((Bid: any) => (
                                <div key={Bid.IdHash} className="card rounded-2" style={{ backgroundColor: "#17212b" }}>
                                  <div className="card-body p-2">

                                    <div className="d-flex align-items-center">
                                      <img src={"https://static.dotgg.gg/pokepocket/card/" + Bid.IdCard + ".webp"} alt="" style={{ height: 31 }} className="me-2" />
                                      <div className="flex-grow-1 lh-1">
                                        <div className="fw-bold">{Cards[Bid.IdCard][0]}</div>
                                        <div className="small opacity-25">{new Date(Bid.DateBid).toLocaleString()}</div>
                                      </div>
                                      <div className="text-nowrap d-flex">
                                        <button className="btn btn-sm btn-danger fw-bold px-2 me-1" onClick={() => BidReject(IdTrade, Bid.IdHash)}>
                                          <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 24 24" className='d-block m-auto'>
                                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 7l10 10M7 17L17 7"></path>
                                          </svg>
                                        </button>
                                        <button className="btn btn-sm btn-success fw-bold px-2" onClick={() => BidAccept(IdTrade, Bid.IdHash)}>
                                          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={19} viewBox="0 0 24 24" className='d-inline'>
                                            <path fill="currentColor" d="m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z"></path>
                                          </svg>
                                          <span className='d-none d-sm-inline ms-1 me-2'>Accept</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <span className="text-muted small ms-2">No trade offers received yet</span>
                        )}
                      </div>
                    )}

                    {Trade.Status === "accepted" && (
                      <>
                        <div className="text-primary h6 mt-3 mb-1">Trader</div>
                        <div className="rounded-2 overflow-hidden p-2" style={{ backgroundColor: "#17212b" }}>
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

                          <div className="mb-2">
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
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="text-primary h6">New trade</div>
        <div className="card">
          <div className="card-body">
            <div className="mb-2">
              <div className="text-muted small ps-2">I want</div>
              <div className="d-flex rounded-2 overflow-hidden p-2" style={{ backgroundColor: "#17212b" }}>
                {FormData.IdCard ? (
                  <>
                    <img src={"https://static.dotgg.gg/pokepocket/card/" + FormData.IdCard + ".webp"} alt="" style={{ height: 88 }} className="me-2" />
                    <div className="flex-grow-1">
                      <div className="badge bg-primary">{Cards[FormData.IdCard][1]}</div>
                      <div className="fw-bold text-truncate">{Cards[FormData.IdCard][0]}</div>
                      <div className="small">#{FormData.IdCard}</div>
                    </div>
                    <div className="ms-2">
                      <button className="btn btn-sm btn-danger rounded-pill fw-bold px-3 text-nowrap" onClick={() => setFormData({ ...FormData, IdCard: null, Offers: [] })}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 7l10 10M7 17L17 7"></path>
                        </svg>
                        <span className="ms-1 d-none d-sm-inline">Remove</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <button className='btn btn-primary d-flex' onClick={() => setCardSelect("IdCard")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20">
                      <path fill="currentColor" d="M8 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1.207a5.5 5.5 0 0 1-.185-1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v5.022q.516.047 1 .185V4a2 2 0 0 0-2-2zm-.5 15h2.1q.276.538.657 1H7.5A3.5 3.5 0 0 1 4 14.5V6a2 2 0 0 1 1-1.732V14.5A2.5 2.5 0 0 0 7.5 17M19 14.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-4-2a.5.5 0 0 0-1 0V14h-1.5a.5.5 0 0 0 0 1H14v1.5a.5.5 0 0 0 1 0V15h1.5a.5.5 0 0 0 0-1H15z"></path>
                    </svg>
                    <div className="ms-2">
                      Select a card
                    </div>
                  </button>
                )}
              </div>
            </div>

            <div className="mb-3">
              <div className="text-muted small ps-2">I offer</div>

              <div className="d-flex p-2 rounded-2 overflow-hidden" style={{ backgroundColor: "#17212b" }}>
                {FormData.Offers.length ? (
                  <>
                    <div className="flex-grow-1 d-flex flex-wrap gap-2">
                      {FormData.Offers.map((IdCard: string) => (
                        <img src={"https://static.dotgg.gg/pokepocket/card/" + IdCard + ".webp"} alt="" style={{ height: 88 }} key={IdCard} />
                      ))}
                    </div>
                    <div className="ms-2">
                      <button className="btn btn-sm btn-danger rounded-pill fw-bold px-3 mt-1 text-nowrap" onClick={() => setFormData({ ...FormData, Offers: [] })}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 7l10 10M7 17L17 7"></path>
                        </svg>
                        <span className="ms-1 d-none d-sm-inline">Remove</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <button className='btn btn-primary d-flex' onClick={() => {
                    setCardSearch("");
                    setCardSelected([])
                    setCardSelect("Offers")
                  }} disabled={!FormData.IdCard}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20">
                      <path fill="currentColor" d="M8 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1.207a5.5 5.5 0 0 1-.185-1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v5.022q.516.047 1 .185V4a2 2 0 0 0-2-2zm-.5 15h2.1q.276.538.657 1H7.5A3.5 3.5 0 0 1 4 14.5V6a2 2 0 0 1 1-1.732V14.5A2.5 2.5 0 0 0 7.5 17M19 14.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-4-2a.5.5 0 0 0-1 0V14h-1.5a.5.5 0 0 0 0 1H14v1.5a.5.5 0 0 0 1 0V15h1.5a.5.5 0 0 0 0-1H15z"></path>
                    </svg>
                    <div className="ms-2">
                      Select one or more cards
                    </div>
                  </button>
                )}
              </div>
            </div>

            <button className="btn btn-lg btn-primary w-100" disabled={!FormData.IdCard} onClick={Add}>
              Create trade
            </button>
          </div>
        </div>
      </div>

      {CardSelect && (
        <div className="position-fixed h-100 w-100 top-0 start-0 z-5" style={{ background: '#17212b' }}>
          <div className="d-flex flex-column w-100 h-100">
            <div className="flex-grow-1 overflow-auto">
              <div className="container py-3">
                <div className="text-primary h5">
                  {CardSelect === "IdCard" || !FormData.IdCard ? (
                    <>Select a card</>
                  ) : (
                    <>Select one or more <span className="badge bg-primary">{Cards[FormData.IdCard][1]}</span> cards</>
                  )}
                </div>

                <div className="mb-1">
                  <input type="text" className="form-control rounded-3" placeholder="Cinccino"
                    value={CardSearch} onChange={(e) => setCardSearch(e.target.value)} />
                </div>

                {CardSelect === "Offers" && (
                  <div className="my-3">
                    <div className="text-primary h6">Selected cards</div>
                    <div className="card">
                      <div className="card-body d-flex flex-wrap gap-1">
                        {CardSelected.map((IdCard: string) => {
                          return (
                            <div key={IdCard} className="card overflow-hidden rounded-2 position-relative">
                              <img src={"https://static.dotgg.gg/pokepocket/card/" + IdCard + ".webp"} alt="" style={{ height: 96 }} />
                              <button className="bg-danger text-white rounded-circle position-absolute top-0 end-0 p-0 text-center"
                                style={{ width: 24, height: 24 }}
                                onClick={() => setCardSelected(CardSelected.filter((CardId: string) => CardId !== IdCard))}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" className='d-block m-auto'>
                                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 7l10 10M7 17L17 7"></path>
                                </svg>
                              </button>
                            </div>
                          )
                        })}
                        {CardSelected.length === 0 && (
                          <div className="text-muted small">No cards selected</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {CardFiltered.length > 12 ? (
                  <div className="text-primary h6">Showing the first 12 results</div>
                ) : null}
                <div className="row g-2">
                  {CardFiltered.slice(0, 12).map((IdCard: string) => {
                    return (
                      <div key={IdCard} className="col-4 col-sm-4 col-md-3 col-lg-2">
                        <div className="card overflow-hidden rounded-2 cursor-pointer position-relative" onClick={() => {
                          if (CardSelect === "IdCard") {
                            setFormData({ ...FormData, IdCard: IdCard });
                            setCardSelect(false);
                            setCardSearch("");
                            setCardSelected([]);
                          } else {
                            if (CardSelected.includes(IdCard)) {
                              setCardSelected(CardSelected.filter((CardId: string) => CardId !== IdCard));
                            } else {
                              if (CardSelected.length < 8) {
                                setCardSelected([...CardSelected, IdCard]);
                              }
                            }
                          }
                        }}>
                          <img src={"https://static.dotgg.gg/pokepocket/card/" + IdCard + ".webp"} alt=""
                            className={CardSelected.includes(IdCard) ? "opacity-25" : ""} />
                          {CardSelected.includes(IdCard) && (
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
                    )
                  })}
                </div>

              </div>
            </div>
            <div className="py-3" style={{ background: '#1e2a35' }}>
              <div className="container d-flex justify-content-between align-items-center">
                <button className='btn btn-secondary d-flex align-items-center' onClick={() => setCardSelect(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 7l10 10M7 17L17 7"></path>
                  </svg>
                  <div className="ms-2">
                    Close
                  </div>
                </button>
                {CardSelect === "Offers" && CardSelected.length === 8 && (
                  <div className="text-danger small text-center">
                    Maximum of 8 cards selected
                  </div>
                )}
                {CardSelect === "Offers" && (
                  <button className='btn btn-primary d-flex align-items-center' onClick={() => {
                    setFormData({ ...FormData, Offers: CardSelected });
                    setCardSelect(false);
                    setCardSearch("");
                    setCardSelected([]);
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                      <path fill="currentColor" d="m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z"></path>
                    </svg>
                    <div className="ms-2">
                      Confirm
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div >
      )}
    </>
  ) : (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="spinner-border text-primary" role="status" />
    </div>
  )
};
