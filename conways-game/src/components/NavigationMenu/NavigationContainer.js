import React, { Component } from "react";
import styled from "styled-components";
import { colors } from "../../utils/variables";
import exitIcon from "./assets/x-circle.svg";
import { Link } from "gatsby";
const NavigationWrapper = styled.div`
  display: ${props => (props.menuActive ? "flex" : "none")};
  width: 100%;
  height: 100%;
`;
const Menu = styled.nav`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  background: ${colors.black};
  width: 80%;
  max-width: 50rem;
`;
const BlurBackground = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background: rgba(58, 56, 56, 56%);
`;

const ExitIcon = styled.img.attrs({
  src: exitIcon
})`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  height: 5rem;
`;

const LinksGroup = styled.ul`
  display: flex;
  flex-flow: column;
  width: 100%;
  position: absolute;
  bottom: 0;
`;
const LinkButton = styled(Link)`
  display: flex;
  align-items: center;
  border: 5px solid ${colors.white};
  color: ${colors.white};
  text-decoration: none;
  width: 100%;
  height: 11rem;
  padding: 2rem;
  font-size: 3.6rem;
  margin-bottom: 1.6rem;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    color: ${colors.orange};
    border: 5px solid ${colors.orange};
  }
`;
const NavigationContainer = props => {
  return (
    <NavigationWrapper menuActive={props.menuActive}>
      <BlurBackground
        onClick={() => {
          props.toggleState("menuActive");
        }}
      />
      <Menu>
        <ExitIcon
          onClick={() => {
            props.toggleState("menuActive");
          }}
        />
        <LinksGroup>
          <LinkButton to="about">About</LinkButton>
          <LinkButton to="rules">Rules</LinkButton>
          <LinkButton to="publish-presets">Publish Presets</LinkButton>
          <LinkButton to="presets-library">Presets' Libray</LinkButton>
        </LinksGroup>
      </Menu>
    </NavigationWrapper>
  );
};

export default NavigationContainer;
