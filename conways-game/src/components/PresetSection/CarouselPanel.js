import React, { Component } from "react";
import styled from "styled-components";
import { colors } from "../../utils/variables";
import Carousel from "nuka-carousel";

const CarouselWrapper = styled(Carousel)`
    background: ${colors.grey};
    width: 100%;
    min-height: 30rem;
`;

const SlideGroup = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const SlideItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 20rem;
    background: black;
    margin-top: 2rem;
`;
class CarouselPanel extends Component {
  state = { slideIndex: 1 };
  render() {
    return (
      <CarouselWrapper
        slideIndex={this.state.slideIndex}
        afterSlide={slideIndex => this.setState({ slideIndex })}
        wrapAround={true}
      >
      <SlideGroup>
          <SlideItem>a</SlideItem>
          <SlideItem>b</SlideItem>
      </SlideGroup>
      <SlideGroup>
          <SlideItem>c</SlideItem>
          <SlideItem>d</SlideItem>
      </SlideGroup>
      </CarouselWrapper>
    );
  }
}

export default CarouselPanel;
