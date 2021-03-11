import React, { Component, useState, useEffect } from "react";
import './CarouselButton.css';
import animatedMove from "../../utilits/animatedMove";

function CarouselButton(props) {

    function move(event) {
        let direction = props.moveTo === 'previous' ? -1 : 1
        props.onMove(direction)
    }

    const buttonClassName = `CarouselButton CarouselButton_${props.moveTo}`
    let content = props.moveTo === 'previous' ? '<' : '>'

    return(
        <button className={buttonClassName} onClick={move}>{content}</button>
    )
}

export default CarouselButton