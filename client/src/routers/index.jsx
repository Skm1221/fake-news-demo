import * as React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import App from './container';
import NewsRoute from 'routers/news';
import NewsInspectionRoute from 'routers/news/inspection';


export const EntryRoute = () =>
  <BrowserRouter>
    <App>
      <Switch>
        <Route path={ '/news/:id' } render={({match}) => {
          return <NewsInspectionRoute newsId={parseInt(match.params.id)} />
        }}
        />
        <Route path={ '/news' } component={ NewsRoute } />
      </Switch>
    </App>
  </BrowserRouter>;