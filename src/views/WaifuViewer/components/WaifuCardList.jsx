import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import WaifuCard from './WaifuCard';

const WaifuCardList = (props) => {
  const { waifus, onClickHandler } = props;
  const waifuCards = waifus.map((waifu) => (
    <WaifuCard
      key={`Waifu Card: ${waifu ? waifu.name : 'empty'}`}
      onClickHandler={() => onClickHandler(waifu)}
      {...waifu}
    />
  ));
  return (
    <Card.Group>
      {waifuCards}
    </Card.Group>
  );
};

WaifuCardList.propTypes = {
  waifus: PropTypes.arrayOf(PropTypes.shape(WaifuCard.propTypes)),
  onClickHandler: PropTypes.func.isRequired,
};

WaifuCardList.defaultProps = {
  waifus: [
    null, null, null, null
  ],
};

export default WaifuCardList;
