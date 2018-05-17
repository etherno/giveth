import React, { Component } from "react";
import firebase from "firebase";
import styled from "styled-components";
import moment from "moment";
import { withI18next } from "../../lib/withI18next";
import initFirebase from "../../lib/initFirebase";

import { Flex, Box } from "grid-styled";
import MobileNav from "../../components/MobileNav";
import MainNav from "../../components/MainNav";
import { Button, ButtonLink } from "../../components/Button";
import { Link } from "../../routes";

initFirebase();

const Container = styled.div`
  margin 0 auto;
  max-width 48rem;
  margin-top: 6rem;
  padding: 0 2rem;
`;

const Video = styled.video`
  max-width 48rem;
`;

const Title = styled.h1`
  font-family: Quicksand;
  color: #2c0d54;
  font-size: 2.5rem;
`;

const Date = styled.p`
  margin: 0;
  margin-bottom: 0.5rem;
  font-family: Quicksand;
  font-size: 12px;
  color: #2c0d53;
`;

const Description = styled.p`
  margin: 0;
  font-family: Quicksand;
  font-size: 14px;
  color: #2c0d53;
`;

const Items = styled.p`
  margin: 0;
  margin-top: 0.5rem;
  font-family: Quicksand;
  font-weight: 600;
  font-size: 14px;
  color: #2c0d53;
`;

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
`;

const FormGroup = styled.div`
  margin: 1.25rem 0;
`;

const Label = styled.label`
  font-family: Quicksand;
  font-size: 18px;
  display: block;
  margin-bottom: 0.5rem;
`;

const LabelRadio = styled.label`
  font-family: Quicksand;
  font-weight: 600;
  margin-right: 1rem;
`;

const Input = styled.input`
  font-family: Quicksand;
  padding: 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
  width: 100%;
  box-sizing: border-box;
`;

const InputRadio = styled.input`
  margin-right: 0.5rem;
`;

const ExtensionWarningContainer = styled.div`
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  font-family: Quicksand;
`;

const ExtensionLink = styled.a`
  font-family: Quicksand;
  color: #491217;
  font-weight: 700;
`;

class View extends Component {
  static async getInitialProps({ query }) {
    return query;
  }

  constructor(props) {
    super(props);
    this.state = {
      week: moment().format("WW_MM_YYYY"),
      title: "",
      description: "",
      social: "",
      wallet: "",
      category: "",
      type: "",
      file: null,
      upload: false,
      isExtensionInstalled: true
    };
  }

  handleFile(e) {
    this.setState({
      file: URL.createObjectURL(e.target.files[0]),
      upload: true
    });
  }

  handleUpload() {
    console.log("Uploading!");
    const { title, description, social, wallet, category } = this.state;
    if (
      [title, description, social, wallet, category].filter(element => !element)
        .length
    ) {
      return alert("You're missing a field! Please check again.");
    }
  }

  handleCamera() {
    const params = { audio: true, video: true };
    navigator.getUserMedia(
      params,
      stream => {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then(function(cameraStream) {
            this.setState(
              {
                cameraStream,
                stream: new window.MultiStreamsMixer([cameraStream])
              },
              () => {
                this.state.stream.frameInterval = 1;
                this.state.stream.startDrawingFrames();
                window.setSrcObject(
                  this.state.stream.getMixedStream(),
                  document.getElementById("video")
                );
              }
            );
          });
      },
      err => {
        alert("No camera devices found");
      }
    );
  }

  handleScreenSharing() {
    this.setState({ type: "screen" })
    window.getScreenId((err, sourceId, screenContraints) => {
      if (err) {
        console.log(err);
      }
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then(audioStream => {
          navigator.getUserMedia =
            navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
          navigator.mediaDevices
            .getUserMedia(screenContraints)
            .then((screenStream) => {
              screenStream.fullcanvas = false;
              screenStream.width = window.screen.width; // or 3840
              screenStream.height = window.screen.height; // or 2160
              this.setState(
                {
                  screenStream,
                  stream: new window.MultiStreamsMixer([
                    screenStream,
                    audioStream
                  ])
                },
                () => {
                  this.state.stream.frameInterval = 1;
                  this.state.stream.startDrawingFrames();
                  window.setSrcObject(
                    this.state.stream.getMixedStream(),
                    document.getElementById("video")
                  );
                }
              );
            });
        });
    });
  }

  detectExtension() {
    if (!!navigator.mozGetUserMedia) return;

    const extensionid = "ajhifddimkapgcifgcodmmfdlknahffk";
    let image = document.createElement("img");
    image.src = "chrome-extension://" + extensionid + "/icon.png";

    image.onload = () => {
      this.handleScreenSharing();
    };
    image.onerror = () => {
      this.setState({ isExtensionInstalled: false });
    };
  }

  render() {
    const {
      type,
      file,
      upload,
      cameraStream,
      screenStream,
      isExtensionInstalled
    } = this.state;
    return (
      <div>
        <MobileNav />
        <MainNav />
        <Container>
          <Link route="/">
            <Back class="go-back-button">
              <span class="fa fa-long-arrow-left" /> back
            </Back>
          </Link>
          <Title>Upload a new video or picture</Title>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              placeholder="E.g. Climate change."
              onChange={e => this.setState({ title: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              placeholder="Description of Climate change."
              onChange={e => this.setState({ description: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label>Slack/Riot handle</Label>
            <Input
              type="text"
              name="social"
              placeholder="What's your name on Slack/Riot.im?"
              onChange={e => this.setState({ social: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label>Public wallet address (Metamask, MEW,...)</Label>
            <Input
              type="text"
              name="wallet"
              placeholder="Provide wallet address to e.g. get rewarded"
              onChange={e => this.setState({ wallet: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label>Choose video category</Label>
            <LabelRadio>
              <InputRadio
                type="radio"
                name="category"
                onClick={() => this.setState({ category: "Reward_DAO" })}
              />
              RewardDAO
            </LabelRadio>
            <LabelRadio>
              <InputRadio
                type="radio"
                name="category"
                onClick={() => this.setState({ category: "Regular_Rewards" })}
              />
              Regular Rewards
            </LabelRadio>
          </FormGroup>
          <FormGroup>
            <Label>Choose type of video</Label>
            <LabelRadio>
              <InputRadio
                type="radio"
                name="type"
                onClick={() => this.setState({ type: "file" })}
              />
              File
            </LabelRadio>
            <LabelRadio>
              <InputRadio
                type="radio"
                name="type"
                onClick={this.handleCamera.bind(this)}
              />
              Camera
            </LabelRadio>
            <LabelRadio>
              <InputRadio
                type="radio"
                name="type"
                onClick={this.detectExtension.bind(this)}
              />
              Screen sharing
            </LabelRadio>
          </FormGroup>
          {!isExtensionInstalled && (
            <ExtensionWarningContainer role="alert">
              <strong>You need to install this </strong>
              <ExtensionLink
                target="_blank"
                rel="noopener noreferrer"
                href="https://chrome.google.com/webstore/detail/screen-capturing/ajhifddimkapgcifgcodmmfdlknahffk"
              >Chrome extension</ExtensionLink> <strong>and reload</strong>
            </ExtensionWarningContainer>
          )}
          {type === "file" && (
            <FormGroup>
              <Label>Choose video file</Label>
              <Input
                type="file"
                accept="image/*;video/*"
                onChange={this.handleFile.bind(this)}
              />
            </FormGroup>
          )}
          {cameraStream || screenStream && <Video id="video" />}
          {file && <Video controls autoPlay src={file} />}
          {upload && (
            <FormGroup>
              <Button
                color="#2c0d54"
                bgcolor="white"
                onClick={this.handleUpload.bind(this)}
              >
                Upload
              </Button>
            </FormGroup>
          )}
        </Container>
      </div>
    );
  }
}

export default withI18next(["common", "navigation"])(View);
