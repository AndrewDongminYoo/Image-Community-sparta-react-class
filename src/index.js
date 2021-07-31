import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './shared/App';

import store from './redux/configureStore';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { analytics } from './shared/Firebase';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
function sendToAnlytics(metric) {
  const _report = JSON.stringify(metric);
  analytics.logEvent("web_vital_report", _report)
  console.log(metric.name, ":", metric.value)
}

reportWebVitals(sendToAnlytics);
