import React, { Component } from "react";
import styled from 'styled-components';

const Button = styled.div`
  padding: .5rem 1rem;
  border: 2px solid white;
  background-color: transparent;
  border-radius: .25rem;
  cursor: pointer;
`

const Text = styled.a`
  color: white;
`

export default ({ href, text }) => (
  <Button>
    <Text>{text}</Text>
  </Button>
)
