import React, { Component } from "react";
import firebase from "firebase";
import styled from 'styled-components';
import moment from 'moment';
import { withI18next } from "../../lib/withI18next";
import initFirebase from "../../lib/initFirebase";


import { Flex, Box } from 'grid-styled';
import MainMenu from "../../components/MainMenu";
import { Button, ButtonLink } from "../../components/Button";

initFirebase();

const Container = styled.div`
  margin 0 auto;
  max-width 48rem;
  margin-top: 6rem;
`

const Video = styled.video`
  max-width 48rem;
`

const Title = styled.h1`
  font-family: Quicksand;
  color: #2c0d54;
  text-align: center;
`

const Date = styled.p`
  margin: 0;
  margin-bottom: .5rem;
  font-family: Quicksand;
  font-size: 12px;
  color: #2c0d53;
`

const Description = styled.p`
  margin: 0;
  font-family: Quicksand;
  font-size: 14px;
  color: #2c0d53;
`

const Items = styled.p`
  margin: 0;
  margin-top: .5rem;
  font-family: Quicksand;
  font-weight: 600;
  font-size: 14px;
  color: #2c0d53;
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
    let date;
    if (media) {
      date = moment(media.timestamp).format('HH:mm DD-MM-YYYY');
    }
    return (
      <div>
        <MainMenu />
        {media &&
          <Container>
            <Title>{media.title}</Title>
            <Video src={media.src} loop controls autoPlay />
            <Box p={3}>
              <Date><span className="fa fa-clock-o" aria-hidden="true" /> {date}</Date>
              <Description>{media.description || 'No description'}</Description>
              <Items><span className="fa fa-th-large" aria-hidden="true" /> WALL: {media.wall.split('_').join(' ')}</Items>
              <Items><span className="fa fa-user" aria-hidden="true" /> SOCIAL: {media.social}</Items>
              <Items><span className="fa fa-address-card" aria-hidden="true" /> WALLET: {media.wallet}</Items>
              <Box mt={3}>
                <Flex mt={2}>
                  <ButtonLink href={media.src} width="100%" mr={1} color="#2c0d54" bgcolor="white">
                    FIREBASE <span className="fa fa-database" aria-hidden="true" />
                  </ButtonLink>
                </Flex>
              </Box>
            </Box>
          </Container>
        }
      </div>
    );
  }
}

export default withI18next(["common", "navigation"])(View);
