import React from 'react';
import { Form, Rating } from 'semantic-ui-react';
import { createOptions } from "../../../lib/util";
import withModal from "../../../hocs/withModal";

const bloodTypes = ['A', 'O', 'B', 'AB', '?'];

class WaifuSubmissionForm extends React.Component {
  render() {
    const { ...rest } = this.props;
    return (
      <Form {...rest}>
        <Form.Group widths="equal">
          <Form.Input fluid required label="Name" />
          <Form.Select fluid required label="Blood Type" options={createOptions(bloodTypes)} defaultValue="?" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Button fluid label="Thumbnail">Upload...</Form.Button>
          <Form.Button fluid label="Main Image">Upload...</Form.Button>
        </Form.Group>
        <label>Rating</label>
        <Rating maxRating={5} defaultRating={0} />
        <Form.TextArea label="Description" placeholder="Why should this girl be in the thicc hall of fame?" />
        <Form.Button type="submit">Submit!</Form.Button>
      </Form>
    )
  }
}

export default withModal(WaifuSubmissionForm);
