import React from "react";
import { BallBeat } from "react-pure-loaders";

class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  render() {
    return (
      <div id="loader-div">
        <BallBeat
          className="loader"
          color={"#123abc"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default LoadingScreen;
