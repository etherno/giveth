import React, { Component } from "react";
import styled from 'styled-components';
import dayjs from 'dayjs';

const Container = styled.div`
  box-shadow: 1px 1px 10px 0 rgba(0,0,0,.25);
`

const Video = styled.video`
  margin-bottom: -5px;
  width: 100%;
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
        <Video src={src} />
        <Content>
          <Title>{title || 'No title'}</Title>
          <Date><span className="fa fa-clock-o" aria-hidden="true" /> {date}</Date>
          <Description>{description || 'No description'}</Description>
          {wall && <Items><span className="fa fa-th-large" aria-hidden="true" /> WALL: {wall.split('_').join(' ')}</Items>}
          {social && <Items><span className="fa fa-user" aria-hidden="true" /> SOCIAL: {social}</Items>}
          {wallet && <Items><span className="fa fa-address-card" aria-hidden="true" /> WALLET: {wallet}</Items>}
        </Content>
      </Container>
    )
  }
}

export default Card;
