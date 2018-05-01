import React, { Component } from "react";
import styled from 'styled-components';

const Button = styled.div`
  padding: .5rem 1rem;
  border: 2px solid ${({ color }) => color || 'white'};
  background-color: ${({ bgColor }) => bgColor || '#2c0d54'};
  border-radius: .25rem;
  cursor: pointer;
  text-align: center;
  font-family: Quicksand;
  font-weight: 600;
  color: ${({ color }) => color || 'white'};
  width: 100%;
  box-sizing: border-box;
  &:hover {
    background-color: ${({ color }) => color || 'white'};
    color: ${({ bgColor }) => bgColor || '#2c0d54'};
  }
`

export default (props) => (
  <Button {...props}>
    {props.children}
  </Button>
)
