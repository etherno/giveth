import React, { Component } from "react";
import firebase from "firebase";
import styled from 'styled-components';
import moment from 'moment';
import { withI18next } from "../../lib/withI18next";
import initFirebase from "../../lib/initFirebase";


import { Flex, Box } from 'grid-styled';
import MainMenu from "../../components/MainMenu";
import { Button, ButtonLink } from "../../components/Button";
import { Link } from '../../routes'

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
  font-size: 2.5rem;
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

const Back = styled.a`
  font-family: Quicksand;
  font-weight: 600;
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    color: #2c0d53;
  }
`

const FormGroup = styled.div`
 margin: 1.25rem 0;
`

const Label = styled.label`
  font-family: Quicksand;
  font-size: 18px;
  display: block;
  margin-bottom: .5rem;
`

const LabelRadio = styled.label`
  font-family: Quicksand;
  font-weight: 600;
  margin-right: 1rem;
`

const Input = styled.input`
  font-family: Quicksand;
  padding: .75rem;
  border-radius: .25rem;
  border: 1px solid #ced4da;
  width: 75%;
`

const InputRadio = styled.input`
  margin-right: .5rem;
`

class View extends Component {
  static async getInitialProps({ query }) {
    return query;
  }

  constructor(props) {
    super(props);
    this.state = {
      week: moment().format("WW_MM_YYYY")
    };
  }

  render() {
    return (
      <div>
        <MainMenu />
        <Container>
          <Link route="/">
            <Back class="go-back-button"><span class="fa fa-long-arrow-left"></span> back</Back>
          </Link>
          <Title>Upload a new video or picture</Title>
          <FormGroup>
            <Label>Title</Label>
            <Input type="text" name="title" placeholder="E.g. Climate change." />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input type="text" name="title" placeholder="Description of Climate change." />
          </FormGroup>
          <FormGroup>
            <Label>Slack/Riot handle</Label>
            <Input type="text" name="title" placeholder="What's your name on Slack/Riot.im?" />
          </FormGroup>
          <FormGroup>
            <Label>Public wallet address (Metamask, MEW,...)</Label>
            <Input type="text" name="title" placeholder="Provide wallet address to e.g. get rewarded" />
          </FormGroup>
          <FormGroup>
            <Label>Choose video category</Label>
            <LabelRadio>
              <InputRadio type="radio" value="on" name="category" />
              RewardDAO
            </LabelRadio>
            <LabelRadio>
              <InputRadio type="radio" value="on" name="category" />
              Regular Rewards
            </LabelRadio>
          </FormGroup>
          <FormGroup>
            <Label>Choose type of video</Label>
            <LabelRadio>
              <InputRadio type="radio" value="on" name="type" />
              Camera
            </LabelRadio>
            <LabelRadio>
              <InputRadio type="radio" value="on" name="type" />
              Screen sharing
            </LabelRadio>
          </FormGroup>
          <FormGroup>
            <Label>Choose video file</Label>
            <Input type="file" accept="image/*;video/*" />
          </FormGroup>
        </Container>
      </div>
    );
  }
}

export default withI18next(["common", "navigation"])(View);
