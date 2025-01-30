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

  useEffect(() => {
    Load()
  }, []);

  function Load() {
    ApiCall("trades-get", {}, (data) => {
      setTrades(data.Data);
    });
  }

  return initData && Trades ? (
    <div className="container py-3">
      <div className="text-primary h5">Trades</div>
      <div className="card">
        <div className="card-body">

          <div className="card mb-4">
            <div className="card-body">
              {Object.keys(Trades).length === 0 ? (
                <div className="text-muted small">No trades</div>
              ) : (
                <div className="d-flex flex-column gap-2">
                  {Object.keys(Trades).map((IdTrade: string) => {
                    const Trade = Trades[IdTrade] as any;
                    return (
                      <div key={IdTrade} className="rounded-2 overflow-hidden p-2" style={{ backgroundColor: "#17212b" }}>
                        <div className="d-flex">
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
                                  <div className="fw-bold small" style={{ width: 24, height: 24 }}>
                                    +{Trade.Offers.length - 3}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <pre>{JSON.stringify(Trades, null, 2)}</pre>
        </div>
      </div>
    </div>
  ) : (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="spinner-border text-primary" role="status" />
    </div>
  )
};
