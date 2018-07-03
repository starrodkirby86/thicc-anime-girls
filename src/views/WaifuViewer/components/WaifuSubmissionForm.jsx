import React from 'react';
import { Form, Rating } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import { createOptions } from "../../../lib/util";
import withModal from "../../../hocs/withModal";

const bloodTypes = ['A', 'O', 'B', 'AB', '?'];

class WaifuSubmissionForm extends React.Component {

  state = {
    toSubmit: {},
    files: {},
  };

  handleChange = (e, { name, value }) => this.setState({
    toSubmit: {
      ...this.state.toSubmit,
      [name]: value,
    }
  });

  onDrop = (file, key) => this.setState({
    files: {
      ...this.state.files,
      [key]: file,
    },
  });

  onDropThumbnail = (files) => this.onDrop(files[0], 'thumbnail');

  onDropImage = (files) => this.onDrop(files[0], 'image');

  render() {
    const { ...rest } = this.props;
    return (
      <Form {...rest}>
        <Form.Group widths="equal">
          <Form.Input fluid required label="Name" name="name" onChange={this.handleChange} />
          <Form.Select fluid required label="Blood Type" name="blood_type" options={createOptions(bloodTypes)} defaultValue="?" onChange={this.handleChange} />
        </Form.Group>
        <Form.Group widths="equal">
          <Dropzone name="thumbnail" multiple={false} onDrop={this.onDropThumbnail}>
            Upload your thumbnail here...
          </Dropzone>
          <Dropzone name="image" multiple={false} onDrop={this.onDropImage}>
            Upload your image here...
          </Dropzone>
        </Form.Group>
        <label>Rating</label>
        <Rating maxRating={5} defaultRating={0} name="rating" onChange={this.handleChange} />
        <Form.TextArea label="Description" placeholder="Why should this girl be in the thicc hall of fame?" name="description" onChange={this.handleChange} />
        <Form.Button type="submit">Submit!</Form.Button>
      </Form>
    )
  }
}

export default withModal(WaifuSubmissionForm);
