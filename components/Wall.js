import React, { Component } from "react";
// import MediaCard from "../MediaCard";
import firebase from "firebase";
// import { Link } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import moment from "moment";
import styled from 'styled-components';
// import { OverlayTrigger, Popover } from "react-bootstrap";
// import { isMobile } from "../../lib/platformChecker";

// import AddNewMediaButton from "../AddNewMediaButton";
// import VideoWallOfFameHeader from "../VideoWallOfFameHeader";
// import logo from "../../img/wall-of-fame-logo-new.svg";

const Video = styled.video`
  bottom: -5px;
`

class VideoWallOfFame extends Component {
  constructor(props) {
    super(props)

    var _wall = "";
    var _currentweek = moment().format("WW_MM_YYYY")
    var _week = "";

    _week = _currentweek

    // if (props.match.params.wall) {
    //   _wall = props.match.params.wall
    // }

    this.state = {
      media: [],
      currentMedia: [],
      wall: _wall,
      currentweek: _currentweek,
      week: _week,
      previous: null,
      next: null,
    }
  }

  componentDidMount() {
    const ref = firebase.database().ref("GVWOF_v2/")
    ref.on('value', this.gotData, (err) => console.log(err));
  }

  gotData = (data) => {
    const mediaData = data.val()

    const media = []
    for (let key in mediaData) {
      const video = mediaData[key]
      const date = video.week.split('_')
      video.weekYear = date[2] + date[0]
      video.id = key
      media.push(video)
    }
    media.sort((a, b) => {
      return b.weekYear - a.weekYear
    })

    let cache
    let counter = -1
    let mediaList = []
    media.forEach((video) => {
      const timestamp = video.weekYear
      if (timestamp === cache) {
        mediaList[counter].push(video)
      } else {
        mediaList.push([video])
        counter++
      }
      cache = timestamp
    })

    let index, previous, next
    mediaList.forEach((list, idx) => {
      if (previous || next) {
        return
      }
      list.forEach((video) => {
        if (video.week === this.state.week) {
          index = idx
          previous = mediaList[idx + 1] ? mediaList[idx + 1][0].week : null
          next = mediaList[idx - 1] ? mediaList[idx - 1][0].week : null
        }
      })
    })

    if (!index) {
      index = 0
      previous = mediaList[1][0].week
      this.state.week = mediaList[0][0].week
    }

    this.setState({
      media: mediaList,
      currentMedia: this.state.wall ? mediaList[index].filter((video) => video.wall === this.state.wall) : mediaList[index],
      previous,
      next,
    })
  }

  componentWillReceiveProps(newProps) {
    var week = "";
    var wall = "";

    // if (!newProps.match.params.week) {
    //   week = moment().format("WW_MM_YYYY")
    // } else {
    //   week = newProps.match.params.week
    // }

    // if (newProps.match.params.wall) {
    //   wall = newProps.match.params.wall
    // }

    let index, next, previous
    const media = this.state.media
    media.forEach((list, idx) => {
      list.forEach((video) => {
        if (video.week === week) {
          index = idx
          previous = media[idx + 1] ? media[idx + 1][0].week : null
          next = media[idx - 1] ? media[idx - 1][0].week : null
        }
      })
    })

    this.setState({
      currentMedia: this.state.wall ? this.state.media[index].filter((video) => video.wall === this.state.wall) : this.state.media[index],
      next,
      previous,
      week,
      wall
    })
  }

  render() {
    const { media } = this.state;
    return (
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          350: 1,
          750: 2,
          900: 3,
          1024: 3,
          1470: 3,
        }}
      >
        <Masonry>
          {media.length && media[1].map(({ src }) => <div style={{bottom: '-5px'}} ><Video width="100%" src={src} /></div>)}
        </Masonry>
      </ResponsiveMasonry>
    )
  }
}

export default VideoWallOfFame;
