import React from 'react';
import './App.css';
import ArticlesStore from './stores/articlesStore';
import Main from './components/Main';
import Edit from './components/Edit';
import Show from './components/Show';
import New from './components/New';
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom"
import ArticleChannel from './components/ArticleChannel';
import { ActionCableProvider } from 'react-actioncable-provider';
import ActionCable from 'actioncable';
import config from './config';

const cable = ActionCable.createConsumer(config.WEBSOCKET_URL)

function App() {
  return (
    <ActionCableProvider cable={cable}>
      <div className="container-fluid">
        <ArticleChannel store={ArticlesStore} />
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/"
                render={() => (
                  <Main store={ArticlesStore} />
                )}
              />
              <Route path="/articles/new"
                render={() => (
                  <New store={ArticlesStore} />
                )}
              />
              <Route path="/articles/edit/:id"
                render={() => (
                  <Edit store={ArticlesStore} />
                )}
              />
              <Route path="/articles/:id"
                render={() => (
                  <Show store={ArticlesStore} />
                )}
              />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </ActionCableProvider>
  );
}

export default App;
