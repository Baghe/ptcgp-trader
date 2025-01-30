import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { init } from '@/Libraries/init.ts';
import { App } from './App/Page.tsx';

import './Libraries/mockEnv.ts';


const root = ReactDOM.createRoot(document.getElementById('root')!);
try {
  init(retrieveLaunchParams().startParam === 'debug' || import.meta.env.DEV);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (e) {
}
