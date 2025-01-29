import { Section, Cell, Tabbar } from '@telegram-apps/telegram-ui';
import { useState, type FC } from 'react';

import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';
import { Profile } from '@/pages/IndexPage/Sections/Profile.tsx';
import { Trades } from '@/pages/IndexPage/Sections/Trades.tsx';

export const IndexPage: FC = () => {
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
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m3.604 7.197l7.138-3.109a.96.96 0 0 1 1.27.527l4.924 11.902a1 1 0 0 1-.514 1.304L9.285 20.93a.96.96 0 0 1-1.271-.527L3.09 8.5a1 1 0 0 1 .514-1.304zM15 4h1a1 1 0 0 1 1 1v3.5M20 6q.396.168.768.315a1 1 0 0 1 .53 1.311L19 13"></path>
        </svg>
      )
    },
    {
      id: 'debug', text: 'Debug', Icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
          <g fill="currentColor">
            <path d="M10 11a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1m1 3a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2z"></path>
            <path fillRule="evenodd" d="M9.094 4.75A4 4 0 0 1 8 2h2a2 2 0 1 0 4 0h2a4 4 0 0 1-1.094 2.75A6.02 6.02 0 0 1 17.659 8H19a1 1 0 1 1 0 2h-1v2h1a1 1 0 1 1 0 2h-1v2h1a1 1 0 1 1 0 2h-1.341A6.003 6.003 0 0 1 6.34 18H5a1 1 0 1 1 0-2h1v-2H5a1 1 0 1 1 0-2h1v-2H5a1 1 0 1 1 0-2h1.341a6.02 6.02 0 0 1 2.753-3.25M8 16v-6a4 4 0 1 1 8 0v6a4 4 0 0 1-8 0" clipRule="evenodd"></path>
          </g>
        </svg>
      )
    },
  ];
  const [currentTab, setCurrentTab] = useState(Tabs[0].id)

  return (
    <Page back={false}>

      {currentTab === 'profile' && (
        <Profile />
      )}

      {currentTab === 'trades' && (
        <Trades />
      )}

      {currentTab === 'debug' && (
        <Section header="Application Launch Data">
          <Link to="/init-data">
            <Cell subtitle="User data, chat information, technical data">Init Data</Cell>
          </Link>
          <Link to="/launch-params">
            <Cell subtitle="Platform identifier, Mini Apps version, etc.">Launch Parameters</Cell>
          </Link>
          <Link to="/theme-params">
            <Cell subtitle="Telegram application palette information">Theme Parameters</Cell>
          </Link>
        </Section>
      )}


      <Tabbar>
        {Tabs.map(({ id, text, Icon }) => (
          <Tabbar.Item key={id} text={text} selected={id === currentTab} onClick={() => setCurrentTab(id)}>
            <Icon />
          </Tabbar.Item>
        ))}
      </Tabbar>
    </Page>
  );
};
