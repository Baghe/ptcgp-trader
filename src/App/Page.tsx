import { useState, type FC } from 'react';

import { Profile } from '@/App/Sections/Profile.tsx';
import { Trades } from '@/App/Sections/Trades.tsx';
import { MyTrades } from '@/App/Sections/MyTrades.tsx';

import './style.css';

export const App: FC = () => {
  const Tabs = [
    {
      id: 'profile', text: 'Profile', Icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
          <path fill="currentColor" fillRule="evenodd" d="M12 4a8 8 0 0 0-6.96 11.947A4.99 4.99 0 0 1 9 14h6a4.99 4.99 0 0 1 3.96 1.947A8 8 0 0 0 12 4m7.943 14.076q.188-.245.36-.502A9.96 9.96 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.96 9.96 0 0 0 2.057 6.076l-.005.018l.355.413A9.98 9.98 0 0 0 12 22q.324 0 .644-.02a9.95 9.95 0 0 0 5.031-1.745a10 10 0 0 0 1.918-1.728l.355-.413zM12 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6" clipRule="evenodd"></path>
        </svg>
      )
    },
    {
      id: 'trades', text: 'Trades', Icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
            <rect width={7} height={7} x={3} y={3} rx={1}></rect>
            <rect width={7} height={7} x={3} y={14} rx={1}></rect>
            <rect width={7} height={7} x={14} y={3} rx={1}></rect>
            <rect width={7} height={7} x={14} y={14} rx={1}></rect>
          </g>
        </svg>
      )
    },
    {
      id: 'my-trades', text: 'My trades', Icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m3.604 7.197l7.138-3.109a.96.96 0 0 1 1.27.527l4.924 11.902a1 1 0 0 1-.514 1.304L9.285 20.93a.96.96 0 0 1-1.271-.527L3.09 8.5a1 1 0 0 1 .514-1.304zM15 4h1a1 1 0 0 1 1 1v3.5M20 6q.396.168.768.315a1 1 0 0 1 .53 1.311L19 13"></path>
        </svg>
      )
    },
  ];
  const [currentTab, setCurrentTab] = useState(Tabs[0].id)

  return (
    <div className="d-flex flex-column w-100 vh-100">
      <div className="flex-grow-1 position-relative overflow-auto">
        {currentTab === 'profile' && <Profile />}
        {currentTab === 'trades' && <Trades />}
        {currentTab === 'my-trades' && <MyTrades />}
      </div>
      <div className="bottom-menu">
        {Tabs.map(({ id, text, Icon }) => (
          <div key={id} className={"item" + (id === currentTab ? " active" : "")} onClick={() => setCurrentTab(id)}>
            <div className="icon"><Icon /></div>
            <div>{text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
