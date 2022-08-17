import { createRoot } from 'react-dom/client';

import App from './app';

const appRootContainer = document.getElementById('app-root');

if (!appRootContainer) {
  throw new Error("Cannot find element with id 'app-root'");
}

createRoot(appRootContainer).render(<App />);
