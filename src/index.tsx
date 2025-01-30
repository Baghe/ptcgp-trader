import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { useLaunchParams, miniApp, useSignal } from '@telegram-apps/sdk-react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';

import { EnvUnsupported } from '@/Libraries/EnvUnsupported.tsx';
import { ErrorBoundary } from '@/Libraries/ErrorBoundary.tsx';
import { init } from '@/Libraries/init.ts';

import '@telegram-apps/telegram-ui/dist/styles.css';
import './index.css';

// Mock the environment in case, we are outside Telegram.
import './Libraries/mockEnv.ts';

import { IndexPage } from './App/Page.tsx';

const root = ReactDOM.createRoot(document.getElementById('root')!);

function ErrorBoundaryError({ error }: { error: unknown }) {
  return (
    <div>
      <p>An unhandled error occurred:</p>
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : typeof error === 'string'
              ? error
              : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}

function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  return (
    <StrictMode>
      <ErrorBoundary fallback={ErrorBoundaryError}>
        <AppRoot appearance={isDark ? 'dark' : 'light'} platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}>
          <IndexPage />
        </AppRoot>
      </ErrorBoundary>
    </StrictMode>
  );
}

try {
  // Configure all application dependencies.
  init(retrieveLaunchParams().startParam === 'debug' || import.meta.env.DEV);

  root.render(<App />);
} catch (e) {
  root.render(<EnvUnsupported />);
}
