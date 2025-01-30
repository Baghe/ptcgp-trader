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
  const [TradesFiltered, setTradesFiltered] = useState<any>([]);
  const [Search, setSearch] = useState('');

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
  }

  return initData && TradesFiltered ? (
    <div className="container py-3">
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
        <div className="d-flex flex-column">
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
              <div key={Trade.IdTrade} className="d-flex overflow-hidden">
                <div className="w-50 pb-2">
                  <div className="card h-100 rounded-end-0 border-end" style={{ backgroundColor: '#223b40' }}>
                    <div className="card-body p-2">

                      <div className="d-flex flex-wrap gap-1">
                        {OffersFiltered.length === 1 ? (
                          <div className="d-flex">
                            <img src={"https://static.dotgg.gg/pokepocket/card/" + OffersFiltered[0] + ".webp"} alt="" style={{ height: 96 }}
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
                              <img src={"https://static.dotgg.gg/pokepocket/card/" + IdCard + ".webp"} alt="" key={IdCard} style={{ height: Height }} />
                            )
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-50 pb-2">
                  <div className="card h-100 rounded-start-0" style={{ backgroundColor: '#3f2f3d' }}>
                    <div className="card-body p-2 d-flex">
                      <img src={"https://static.dotgg.gg/pokepocket/card/" + Trade.IdCard + ".webp"} alt="" style={{ height: 96 }}
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
  ) : (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="spinner-border text-primary" role="status" />
    </div>
  )
};
