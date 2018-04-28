import React, { Component } from "react";
import styled from 'styled-components';

const Container = styled.div`
  box-shadow: 1px 1px 10px 0 rgba(0,0,0,.25);
`

const Video = styled.video`
  margin-bottom: -5px;
`

const Content = styled.div`
  padding: .5rem;
`

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { src, title, description, wall, wallet, week, social } = this.props;
    return (
      <Container>
        <Video width="100%" src={src} />
        <Content>
          <p>{title}</p>
          <p>{description}</p>
          <p>{week}</p>
          <p>{wall}</p>
          <p>{social}</p>
          <p>{wallet}</p>
        </Content>
      </Container>
    )
  }
}

export default Card;
