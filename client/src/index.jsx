import * as axios from 'axios';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { EntryRoute } from 'routers';

export const ApiProvider = axios.create({
  baseURL: 'http://localhost:9000',
  timeout: 5000,
  headers: {
    'Accept': 'application/json'
  }
});

ReactDOM.render(
  <EntryRoute />,
  document.getElementById('root'),
);
