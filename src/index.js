import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = React.lazy(() => import('./App.js'));

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<h1>loading...</h1>}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
