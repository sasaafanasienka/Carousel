import React, { Component, useState, useEffect } from "react";
import './Carousel.css';
import Car from './Car'
import animatedMove from "./utilits/animatedMove";

function Carousel(props) {

    const [touchPoint, savePoint] = useState(0)
    const [currentPosition, savePosition] = useState(0)
    const [state, setState] = useState({
        componentWasMounted: false
    })

    useEffect(() => {
        if (!state.componentWasMounted) {
            const carouselWidth = document.querySelector('.Carousel').clientWidth
            const itemsOnScreen = props.itemsOnScreen
            const gap = props.gap
            const itemWidth = (carouselWidth - (gap * (itemsOnScreen - 1))) / itemsOnScreen
            let gridTemplate = ''
            let itemsQuantity = props.content.length
            for (let i = 0; i < itemsQuantity; i++) {
                gridTemplate = gridTemplate.concat(`${itemWidth}px `)
            }
            const rightPositionsArr = []
            for (let i = itemsQuantity - itemsOnScreen; i >= 0; i--) {
                rightPositionsArr.push(-i * (itemWidth + gap))
            }
            document.querySelector('.Carousel__content').style.left = '0px'
            document.querySelector('.Carousel__content').style.gap = `0px ${props.gap}px`
            document.querySelector('.Carousel__content').style.gridTemplateColumns = gridTemplate
            setState({
                componentWasMounted: true,
                carouselWidth: carouselWidth,
                itemsOnScreen: itemsOnScreen,
                itemsQuantity: itemsQuantity,
                rightPositionsArr: rightPositionsArr,
                gap: gap,
                itemWidth: itemWidth,
                gridTEmplate: gridTemplate,
            })
        }
    });

    function move(event) {
        const currentPosition = Number(document.querySelector('.Carousel__content').style.left.slice(0, -2))
        let direction = event.target.className === 'Carousel__arrow Carousel__arrow_left' ? -1 : 1
        const newPosition = state.rightPositionsArr[state.rightPositionsArr.indexOf(currentPosition) + direction]
        animatedMove(currentPosition, newPosition)
    }

    function saveTouchPoint(event) {
        savePoint(event.targetTouches[0].clientX)
    }

    function touchMove(event) {
        document.querySelector('.Carousel__content').style.left = `${currentPosition + event.targetTouches[0].clientX - touchPoint}px`
    }

    function positionAdjust(event) {
        const currentLeft = Number(document.querySelector('.Carousel__content').style.left.slice(0, -2))
        const rightPositionsArr = state.rightPositionsArr
        const deviationsArr = []
        for (let i = 0; i < rightPositionsArr.length; i++) {
            if (rightPositionsArr[i] - currentLeft < 0) {
                deviationsArr.push((rightPositionsArr[i] - currentLeft) * -1)
            } else {
                deviationsArr.push((rightPositionsArr[i] - currentLeft))
            }
        }
        let minDeviation = deviationsArr.reduce((previous, current, index) => {
            if (current < previous) {
                return current
            } else {
                return previous
            } 
        })
        animatedMove(currentLeft, rightPositionsArr[deviationsArr.indexOf(minDeviation)])
        savePosition(rightPositionsArr[deviationsArr.indexOf(minDeviation)])
    }

    return(
        <div className='Carousel'>
            <div className='Carousel__content' onTouchMove={touchMove} onTouchStart={saveTouchPoint} onTouchEnd={positionAdjust}>
                {props.content}     
            </div>
            <button className='Carousel__arrow Carousel__arrow_left' onClick={move}></button>
            <button className='Carousel__arrow Carousel__arrow_right' onClick={move}></button>
        </div>
    )
}

export default Carousel