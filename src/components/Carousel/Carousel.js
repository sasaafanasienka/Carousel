import React, { Component, useState } from "react";
import './Carousel.css';
import CarouselItem from '../CarouselItem/CarouselItem'

function Carousel(props) {

    const [startPoint, setStartPoint] = useState(0)

    function moveCarousel(event) {
        if (event.target.className === 'Carousel__arrow Carousel__arrow_left') {
            setStartPoint(startPoint - 25)
        } else {
            setStartPoint(startPoint + 25)
        }
    }

    function makeSize() {
        console.log('makeSiz')
        let arr = []
        props.content.forEach((el) => {
            arr.push(<CarouselItem content={el}/>)
        })
        return arr
    }

    const itemGap = `0px ${props.gap}px`
    const itemWidth = ''

    return(
        <div className='Carousel'>
            <div className='Carousel__content' style={{left: startPoint, gap: itemGap}}>
                {makeSize()}
            </div>
            <button className='Carousel__arrow Carousel__arrow_left' onClick={moveCarousel}></button>
            <button className='Carousel__arrow Carousel__arrow_right' onClick={moveCarousel}></button>
        </div>
    )
}

export default Carousel