import * as React from 'react';

import { NavComponent } from './components/nav.component';
import './include/bootstrap';
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Store';
import { SignInContainer } from './components/sign-in/sign-in.container';
<<<<<<< HEAD
import { GroupsContainer } from './components/groups/groups.container';
=======
>>>>>>> f45ae6c83b4a9ec1e28ce541b3c57e8a69693e1a

class App extends React.Component<any, any> {

  public render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div>
            <NavComponent />
            <Switch>
              <Route path="/sign-in" component={SignInContainer} />
<<<<<<< HEAD
              <Route path="/groups" component={GroupsContainer} />
=======
>>>>>>> f45ae6c83b4a9ec1e28ce541b3c57e8a69693e1a
            </Switch>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
