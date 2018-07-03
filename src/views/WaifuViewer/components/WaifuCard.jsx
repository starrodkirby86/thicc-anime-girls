import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Segment, Rating, Dimmer, Loader } from 'semantic-ui-react';
import placeholderThumbnail from '../../../res/images/t_placeholder.jpg';
import { getImageSrc } from "../../../lib/fireHelpers";
import withLoader from "../../../hocs/withLoader";

class WaifuCard extends React.Component {
  state = {
    thumbnailUrl: placeholderThumbnail,
  };

  componentDidMount() {
    const { thumbnail } = this.props;
    if (thumbnail === '') return;
    getImageSrc(thumbnail)
      .then(url => this.setState({ thumbnailUrl: url }))
      .catch(error => { console.log("Something went wrong."); console.log(error); });
  }

  render() {
    const { thumbnailUrl } = this.state;
    const { onClickHandler, name, rating } = this.props;

    return (
      <Card link centered style={{ width: '100%', height: '140px' }} onClick={onClickHandler}>
        <Card.Content>
          <Segment basic>
            <Dimmer active={thumbnailUrl === placeholderThumbnail} inverted>
              <Loader />
            </Dimmer>
            <Image floated="left" size="tiny" src={thumbnailUrl} />
          </Segment>
          <Card.Header>{name}</Card.Header>
          <Card.Meta><Rating icon="star" defaultRating={rating} maxRating={5} /></Card.Meta>
        </Card.Content>
      </Card>
    );
  };
}

WaifuCard.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  name: PropTypes.string,
  thumbnail: PropTypes.string,
  blood_type: PropTypes.string,
  rating: PropTypes.number,
  description: PropTypes.string,
};

WaifuCard.defaultProps = {
  name: "Foo Baz",
  thumbnail: '',
  blood_type: "O",
  rating: 0,
  description: "This is a placeholder description.",
};

export default WaifuCard;
