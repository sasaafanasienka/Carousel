import React from "react";
import rightArrow from '../../images/right_arrow.svg'
import leftArrow from '../../images/left_arrow.svg'
import './CarouselButton.css';

function CarouselButton(props) {

    const style = {
        'width': `${props.size}px`,
        'height': `${props.size}px`,
        'top': `calc((100% - 60px) / 2 - ${props.size / 2}px)`,
    }

    function move() {
        let direction = props.moveTo === 'previous' ? -1 : 1
        props.onClick(direction)
    }

    let buttonClassName = `CarouselButton CarouselButton_${props.moveTo}`
    if (!props.isActive) {
        buttonClassName = buttonClassName.concat(` CarouselButton_unactive`)
    }

    const content = props.moveTo === 'previous' ? leftArrow : rightArrow
    const handler = props.isActive ? move : null

    return(
        <button className={buttonClassName} onClick={handler} style={style}>
            <img src={content} alt={`${props.moveTo} button`}/> 
        </button>
    )
}

export default CarouselButton