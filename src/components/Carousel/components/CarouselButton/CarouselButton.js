import React from "react";
import './CarouselButton.css';

function CarouselButton(props) {

    function move() {
        let direction = props.moveTo === 'previous' ? -1 : 1
        props.onClick(direction)
    }

    let buttonClassName = `CarouselButton CarouselButton_${props.moveTo}`
    if (!props.isActive) {
        buttonClassName = buttonClassName.concat(` CarouselButton_unactive`)
    }
    let content = props.moveTo === 'previous' ? '<' : '>'

    if (props.isActive) {
        return(
            <button className={buttonClassName} onClick={move}>{content}</button>
        )
    } else {
        return(
            <button className={buttonClassName}>{content}</button>
        )
    }
}

export default CarouselButton