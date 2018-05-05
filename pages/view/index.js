import React, { Component } from "react";
import firebase from "firebase";
import styled from 'styled-components';
import { withI18next } from "../../lib/withI18next";
import initFirebase from "../../lib/initFirebase";


import { Box } from 'grid-styled';
import MainMenu from "../../components/MainMenu";

initFirebase();

const Container = styled.div`
  margin 0 auto;
  max-width 48rem;
  margin-top: 6rem;
  text-align: center;
`

const Video = styled.video`
  max-width 48rem;
`

const Title = styled.h1`
  font-family: Quicksand;
  color: #2c0d54;
`

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
        <Container>
          <Title>{media && media.title}</Title>
          <Video src={media && media.src} loop controls autoPlay />
        </Container>
      </div>
    );
  }
}

export default withI18next(["common", "navigation"])(View);
