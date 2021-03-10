import React, { Component, useState, useEffect } from "react";
import './CarouselButton.css';
import animatedMove from "../Carousel/utilits/animatedMove";

function CarouselButton(props) {

    function move(event) {
        const currentPosition = props.currentPosition
        let direction = props.moveTo === 'previous' ? -1 : 1
        const newPosition = props.positions[props.positions.indexOf(currentPosition) + direction]
        animatedMove(currentPosition, newPosition)
        props.savePosition(newPosition)
    }

    const buttonClassName = `CarouselButton CarouselButton_${props.moveTo}`

    return(
        <button className={buttonClassName} onClick={move}></button>
    )
}

export default CarouselButton