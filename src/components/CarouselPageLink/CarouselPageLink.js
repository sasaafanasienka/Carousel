import React, { Component, useState, useEffect } from "react";
import './CarouselPageLink.css';
import animatedMove from "../Carousel/utilits/animatedMove";

function CarouselPageLink(props) {

    function goTo(event) {
        console.log(props.currentPosition)
        console.log(props.positions[props.id])
        console.log(props.positions)
        animatedMove(props.currentPosition, props.positions[(7 - props.id)])
    }

    return(
        <button className='CarouselPageLink' onClick={goTo}>
            {Number(props.id) + 1}
        </button>
    )
}

export default CarouselPageLink