import React from 'react';
import PropTypes from 'prop-types';
import { Image, Segment, Header, Container, Dimmer, Loader } from 'semantic-ui-react';
import placeholderImage from '../../../res/images/i_placeholder.jpg';
import { getImageSrc } from "../../../lib/fireHelpers";

class WaifuDetail extends React.Component {
  state = {
    imageUrl: placeholderImage,
    isLoading: false,
  };

  updateImage = (image) => {
    this.setState({ isLoading: true });
    getImageSrc(image)
      .then(url => this.setState({ imageUrl: url }))
      .then(() => this.setState({ isLoading: false }))
      .catch(() => console.log("Something went wrong."));
  };

  componentDidMount() {
    const { image } = this.props;
    if (image === '') return;
    this.updateImage(image);
  }

  componentDidUpdate(prevProps) {
    const { image: prevImage } = prevProps;
    const { image } = this.props;

    if (prevImage !== image) {
      this.updateImage(image);
    }
  }

  render() {
    const { imageUrl, isLoading } = this.state;
    const { name, blood_type, description } = this.props;
    return (
      <Segment style={{ height: '100%' }}>
        <Dimmer active={isLoading} inverted>
          <Loader />
        </Dimmer>
        <Image src={imageUrl} centered style={{ maxHeight: '300px' }}/>
        <Header content={name} />
        <Container>
          Blood type {blood_type}
          <br />
          {description}
        </Container>
      </Segment>
    );
  }
}


WaifuDetail.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  blood_type: PropTypes.string,
  rating: PropTypes.number,
  description: PropTypes.string,
};

WaifuDetail.defaultProps = {
  name: "Foo Baz",
  image: '',
  blood_type: "O",
  rating: 0,
  description: "This is a placeholder description.",
};

export default WaifuDetail;
