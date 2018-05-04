import React, { Component } from "react";
import firebase from "firebase";
import { withI18next } from "../../lib/withI18next";
import initFirebase from "../../lib/initFirebase";

import MainMenu from "../../components/MainMenu";

initFirebase();

class View extends Component {
  static async getInitialProps({ query }) {
    return query;
  }

  constructor(props) {
    super(props);
    this.state = {
      media: null
    };
  }

  componentWillMount() {
    const { id } = this.props;
    if (id) {
      const path = "GVWOF_v2/" + id;
      const ref = firebase.database().ref(path);
      ref.on(
        "value",
        data => this.setState({ media: data.val() }),
        err => console.log(err)
      );
    }
  }

  render() {
    const { media } = this.state;
    return (
      <div>
        <MainMenu />
        <video src={media.src} />
      </div>
    );
  }
}

export default withI18next(["common", "navigation"])(View);
