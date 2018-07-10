import React from 'react';
import axios from 'axios';
import { Image, Grid, Loader } from 'semantic-ui-react';
import WaifuDetail from "./components/WaifuDetail";
import WaifuCardList from "./components/WaifuCardList";
import WaifuMenu from "./components/WaifuMenu";
import banner from '../../res/images/banner.png';
import fire from "../../lib/fire";

class WaifuViewer extends React.Component {
  state = {
    waifus: [],
    activeWaifu: {},
  };

  // This one is if you're manipulating a list. But we're not doing that. (use once)
  updateWaifus = (snapshot) => {
    console.log('updating all the waifus');
    const waifus = [];
    snapshot.forEach((childSnapshot) => {
      waifus.push(childSnapshot.val());
    });

    // At this point, waifus are updated.
    this.setState({
      waifus,
    });
  };

  updateWaifuAdded = (data) => {
    this.setState({
      waifus: [...this.state.waifus, data.val()],
    })
  };

  updateWaifuChanged = (data) => {
    const { waifus } = this.state;
    const waifu = data.val();
    const index = waifus.findIndex(w => w.name === waifu.name); // It's better to actually compare against some perm-ID
    this.setState({
      waifus: [...waifus.slice(0, index), waifu, ...waifus.slice(index, waifus.length)],
    })
  };

  updateWaifuRemoved = (data) => {
    const { waifus } = this.state;
    const waifu = data.val();
    this.setState({
      waifus: waifus.filter(w => w.name !== waifu.name),
    })
  };

  componentDidMount() {
    // Use axios to get the WaifuCardData.
    /*
    axios.get(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}/waifus.json`)
      .then(({ data: waifus }) => this.setState({ waifus }));
    */

    // Add a listener in case the waifu list updates.
    const waifusRef = fire.database().ref('waifus/');
    waifusRef.on('child_added', this.updateWaifuAdded);
    waifusRef.on('child_changed', this.updateWaifuChanged);
    waifusRef.on('child_removed', this.updateWaifuRemoved);
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
