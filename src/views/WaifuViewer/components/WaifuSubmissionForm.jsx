import React from 'react';
import { Form, Modal, Rating, Progress } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import uuid from 'uuid/v4';
import { createOptions } from "../../../lib/util";
import withModal from "../../../hocs/withModal";
import fire from "../../../lib/fire";
import * as firebase from 'firebase/app';

const bloodTypes = ['A', 'O', 'B', 'AB', '?'];

const ProgressModal = (props) => {
  const { open, progress } = props;
  return (
    <Modal open={open}>
      <Modal.Header>
        Uploading...
      </Modal.Header>
      <Modal.Content>
        <p>Your waifu is going into the clouds!</p>
        <Progress active percent={progress} />
      </Modal.Content>
    </Modal>
  );
};

class WaifuSubmissionForm extends React.Component {

  state = {
    toSubmit: {
      name: '',
      blood_type: '?',
      rating: 0,
      image: null,
      thumbnail: null,
      description: '',
    },
    files: {},
    isUploading: false,
    progress: 0,
  };

  handleChange = (e, { name, value }) => this.setState({
    toSubmit: {
      ...this.state.toSubmit,
      [name]: value,
    }
  });

  handleRate = (e, { rating }) => this.setState({
    toSubmit: {
      ...this.state.toSubmit,
      rating,
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

  taskChange = (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    this.setState({ progress });
  };

  taskError = (error) => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  uploadSubmission = () => {
    const { toSubmit } = this.state;
    const newWaifuRef = fire.database().ref().child('waifus').push();
    newWaifuRef.set(toSubmit);

    this.setState({ isUploading: false });
  };

  uploadThumbnail = (files) => {
    // Called after uploading image.
    // On success, should then call submission handler
    const { toSubmit } = this.state;

    this.setState({ isUploading: true });

    const storageRef = fire.storage().ref();
    const thumbnailRefURL = `${uuid()}.png`;
    const thumbnailRef = storageRef.child(`thumbnails/${thumbnailRefURL}`);

    const thumbnailUploadTask = thumbnailRef.put(files.thumbnail);

    thumbnailUploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      this.taskChange,
      this.taskError,
      () => {
        console.log('thumbnail success!!!');
        this.setState({
          toSubmit: {
            ...toSubmit,
            thumbnail: thumbnailRefURL,
          }
        });
        this.uploadSubmission();
      });
  };

  uploadImage = (files) => {
    // Let's set the process to uploading...
    this.setState({ isUploading: true });

    const { toSubmit } = this.state;

    const storageRef = fire.storage().ref();
    const imageRefURL = `${uuid()}.png`;
    const imageRef = storageRef.child(`images/${imageRefURL}`);

    const imageUploadTask = imageRef.put(files.image);

    imageUploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      this.taskChange,
      this.taskError,
      () => {
        console.log('image upload success!!!');
        this.setState({
          toSubmit: {
            ...toSubmit,
            image: imageRefURL,
          }
        });
        this.uploadThumbnail(files);
      });
  };

  onSubmit = () => {
    // This is in two phases:
    // 1) Successful upload to create ref URLs for uploaded images.
    // 2) POST to add into DB, with image/thumbnail being the passed ref URLs

    const { files } = this.state;
    this.uploadImage(files);

  };

  render() {
    const { isUploading, progress, toSubmit } = this.state;
    const { ...rest } = this.props;

    return (
      <div>
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
          <Rating maxRating={5} name="rating" onRate={this.handleRate} />
          <Form.TextArea label="Description" placeholder="Why should this girl be in the thicc hall of fame?" name="description" onChange={this.handleChange} />
          <Form.Button type="submit" onClick={this.onSubmit}>Submit!</Form.Button>
        </Form>
        <ProgressModal open={isUploading} progress={progress} />
      </div>
    )
  }
}

export default withModal(WaifuSubmissionForm);
