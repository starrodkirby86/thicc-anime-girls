import React from 'react';
import axios from 'axios';
import { Image, Grid, Loader } from 'semantic-ui-react';
import WaifuDetail from "./components/WaifuDetail";
import WaifuCardList from "./components/WaifuCardList";
import WaifuMenu from "./components/WaifuMenu";
import banner from '../../res/images/banner.png';

class WaifuViewer extends React.Component {
  state = {
    waifus: [],
    activeWaifu: {},
  };

  componentDidMount() {
    // Use axios to get the WaifuCardData.
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}/waifus.json`)
      .then(({ data: waifus }) => this.setState({ waifus }))
  }

  handleActiveWaifu = waifu => this.setState({ activeWaifu: waifu });

  render() {

    const { waifus, activeWaifu } = this.state;

    return (
      <div>
        <Image fluid src={banner} />
        <WaifuMenu />
        <Grid>
          <Grid.Row>
            <Grid.Column width={6} style={{ height: '100%', maxHeight: '550px', overflowY: 'scroll' }}>
              { (waifus !== []) ? <WaifuCardList waifus={waifus} onClickHandler={this.handleActiveWaifu} /> : <Loader /> }
            </Grid.Column>
            <Grid.Column width={10} style={{ minHeight: '550px' }}>
              <WaifuDetail {...activeWaifu} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default WaifuViewer;
