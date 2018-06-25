import * as React from 'react';
import { NavComponent } from './components/nav.component';
import './include/bootstrap';
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Store';
import { SignInContainer } from './components/sign-in/sign-in.container';
import { GroupsContainer } from './components/groups/groups.container';
import { RegisterPageComponent } from './components/register/register.page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewGroupComponent } from './components/newGroup/newGroup.component';
import { MessagesComponent } from './components/messages/messages.component';

class App extends React.Component<any, any> {

  public render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div>
            <NavComponent />
            <Switch>
              {/* <Route component={GroupsContainer} /> */}
              <Route path="/groups" component={GroupsContainer} />
              <Route path="/newGroup" component={NewGroupComponent} />
              <Route path="/sign-in" component={SignInContainer} />
              <Route path="/profile" component={ProfileComponent} />
              <Route path="/register" component={RegisterPageComponent} />
              {/* <Route path="/messages/{location}/{tag} component={MessagesComponent} /> */}
              <Route path="/messages" component={MessagesComponent} />
            </Switch>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
