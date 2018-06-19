import * as React from 'react';

import { NavComponent } from './components/nav.component';
import './include/bootstrap';
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Store';
import { SignInContainer } from './components/sign-in/sign-in.container';
import { HomeComponent } from './components/home/home.component';


class App extends React.Component<any, any> {

  public render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div>
            <NavComponent />
            <Switch>
              <Route path="/home" component={HomeComponent} />
              <Route path="/sign-in" component={SignInContainer} />
              <Route path="/groups" component={GroupsContainer} />
            </Switch>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
