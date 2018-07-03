import React from 'react';
import { Menu } from 'semantic-ui-react';
import WaifuSubmissionForm from './WaifuSubmissionForm';
import WaifuLogin from './WaifuLogin';
import fire from "../../../lib/fire";

class WaifuMenu extends React.Component {

  state = {
    user: null
  };

  handleGetUser = () => {
    fire.auth().onAuthStateChanged(
      user => this.setState({ user })
    );
  };

  handleLogout = () => {
    fire.auth().signOut();
    this.handleGetUser();
  };

  componentDidMount() {
    this.handleGetUser();
  }

  render() {
    const { user } = this.state;

    return (
      <Menu icon attached="bottom" inverted color="grey">
        {
          (user) ?
            (
              <Menu.Item header>Welcome back, {user.email}</Menu.Item>
            ) :
            (
              <div />
            )
        }
        {
          (user) ?
            (
              <Menu.Menu position="right">
                <WaifuSubmissionForm trigger={<Menu.Item icon="plus" />} />
                <Menu.Item disabled icon="trash alternate outline" />
                <Menu.Item icon="log out" onClick={this.handleLogout} />
              </Menu.Menu>
            ) :
            (
              <Menu.Menu position="right">
                <WaifuLogin trigger={<Menu.Item icon="key" />} />
              </Menu.Menu>
            )
        }
      </Menu>
    )
  }
}

export default WaifuMenu;
