import React, { Component } from "react";
import styled from 'styled-components';
import dayjs from 'dayjs';

const Container = styled.div`
  box-shadow: 1px 1px 10px 0 rgba(0,0,0,.25);
`

const Video = styled.video`
  margin-bottom: -5px;
`

const Content = styled.div`
  padding: 1rem;
`

const Title = styled.p`
  margin: 0;
  font-family: Quicksand;
  font-weight: 600;
  font-size: 18px;
  color: #2c0d53;
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

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { src, title, description, wall, wallet, social, timestamp } = this.props;
    const date = dayjs(timestamp).format('HH:mm DD-MM-YYYY');
    return (
      <Container>
        <Video width="100%" src={src} />
        <Content>
          <Title>{title}</Title>
          <Date>{date}</Date>
          <Description>{description}</Description>
          <Items>WALL: {wall.split('_').join(' ')}</Items>
          <Items>SOCIAL: {social}</Items>
          <Items>WALLET: {wallet}</Items>
        </Content>
      </Container>
    )
  }
}

export default Card;
