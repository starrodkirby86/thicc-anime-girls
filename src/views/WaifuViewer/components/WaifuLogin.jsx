import React from 'react';
import * as firebase from 'firebase';
import { Form, Message } from 'semantic-ui-react';
import withModal from "../../../hocs/withModal";
import fire from "../../../lib/fire";

class WaifuLogin extends React.Component {

  state = {};

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { email, password } = this.state;
    fire.auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then( () => (
        fire.auth().signInWithEmailAndPassword(email, password))
        .then((user) => console.log(user))
        .catch((error) => {
          this.setState({ error })
        })
      );
  };

  render() {
    const { email, password, error } = this.state;
    const { ...rest } = this.props;
    return (
      <Form error={error} {...rest}>
        <Message error>
          Oopsie woopsie! A bingo bango, etc.

          Here are some details of the error:
          <br />
          { error ? error.message : null }
        </Message>
        <Form.Input fluid required name="email" label="Email" value={email} onChange={this.handleChange} />
        <Form.Input fluid required name="password" label="Password" type="password" value={password} onChange={this.handleChange} />
        <Form.Button type="submit" onClick={this.handleSubmit}>Log in</Form.Button>
      </Form>
    );
  }
}

export default withModal(WaifuLogin);
