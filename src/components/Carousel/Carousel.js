import React, { Component, useState, useEffect } from "react";
import './Carousel.css';
import animatedMove from "./utilits/animatedMove";
import flashMove from "./utilits/flashMove";
import makeContentDOM from './utilits/makeContentDOM'
import CarouselButton from "./components/CarouselButton/CarouselButton";
import CarouselPagination from "./components/CarouselPagination/CarouselPagination";
import CarouselContent from "./components/CarouselContent/CarouselContent";

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
            let itemsQuantity = props.content.length
            let realItemsQuantity = itemsQuantity
            if (props.loop && itemsQuantity > itemsOnScreen) {
                realItemsQuantity = itemsQuantity + 2 * itemsOnScreen
            }
            let gridTemplate = ''
            for (let i = 0; i < realItemsQuantity; i++) {
                gridTemplate = gridTemplate.concat(`${itemWidth}px `)
            }
            const rightPositionsArr = [0]
            for (let i = 1; i <= realItemsQuantity - itemsOnScreen; i++) {
                rightPositionsArr.push(-i * (itemWidth + gap))
            }
            let renderingPosition = 0
            if (props.loop && itemsQuantity > itemsOnScreen) {
                renderingPosition = rightPositionsArr[itemsOnScreen]
            }
            savePosition(renderingPosition)
            document.querySelector('.CarouselContent').style.left = `${renderingPosition}px`
            document.querySelector('.CarouselContent').style.gap = `0px ${props.gap}px`
            document.querySelector('.CarouselContent').style.gridTemplateColumns = gridTemplate
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

    function saveTouchPoint(event) {
        savePoint(event.targetTouches[0].clientX)
    }

    function touchMove(event) {
        const offset = event.targetTouches[0].clientX - touchPoint
        document.querySelector('.CarouselContent').style.left = `${currentPosition + offset}px`
    }

    function buttonMove(direction) {
        const currentIndex = state.rightPositionsArr.indexOf(currentPosition)
        const newPosition = state.rightPositionsArr[currentIndex + direction]
        if (newPosition !== undefined) {
            animatedMove(currentPosition, newPosition)
            if (props.loop && state.rightPositionsArr.indexOf(newPosition) === 0) {
                flashMove(state.rightPositionsArr[state.itemsQuantity])
                savePosition(state.rightPositionsArr[state.itemsQuantity])
                return
            } else if (props.loop && state.rightPositionsArr.indexOf(newPosition) === state.rightPositionsArr.length - 1) {
                flashMove(state.rightPositionsArr[state.rightPositionsArr.length - 1 - state.itemsQuantity])
                savePosition(state.rightPositionsArr[state.rightPositionsArr.length - 1 - state.itemsQuantity])
                return
            }
            savePosition(newPosition)
        }

    }

    function paginationMove(id) {
        let loopCorrection = 0
        if (props.loop && props.content.length > state.itemsOnScreen) {
            loopCorrection = state.itemsOnScreen;
        }
        let newPosition = state.rightPositionsArr[Number(id) + loopCorrection]
        if (newPosition === undefined) {
            newPosition = state.rightPositionsArr[state.itemsQuantity - state.itemsOnScreen]
        }
        if (newPosition !== currentPosition) {
            animatedMove(currentPosition, newPosition)
            savePosition(newPosition)
        }
    }

    function positionAdjust() {
        const currentX = Number(document.querySelector('.CarouselContent').style.left.slice(0, -2))
        let nearestRightPos = 0
        for (let i = 1; i < state.rightPositionsArr.length; i++) {
            if (Math.abs(currentX - state.rightPositionsArr[i]) < Math.abs(currentX - state.rightPositionsArr[nearestRightPos])) {
                nearestRightPos = i
            }
        }
        let newPosition = state.rightPositionsArr[nearestRightPos]
        animatedMove(currentX, newPosition)
        if (props.loop && state.rightPositionsArr.indexOf(newPosition) === 0) {
            flashMove(state.rightPositionsArr[state.itemsQuantity])
            savePosition(state.rightPositionsArr[state.itemsQuantity])
            return
        } else if (props.loop && state.rightPositionsArr.indexOf(newPosition) === state.rightPositionsArr.length - 1) {
            flashMove(state.rightPositionsArr[state.rightPositionsArr.length - 1 - state.itemsQuantity])
            savePosition(state.rightPositionsArr[state.rightPositionsArr.length - 1 - state.itemsQuantity])
            return
        }
        savePosition(state.rightPositionsArr[nearestRightPos])
    }

    return(
        <div className='Carousel'>
            <CarouselContent content={makeContentDOM(props.content, props.itemsOnScreen, props.loop)} 
                             onTouch={saveTouchPoint} 
                             onMove={touchMove} 
                             onTouchEnd={positionAdjust}
            />
            <CarouselButton moveTo='previous' 
                            onMove={buttonMove}
            />
            <CarouselButton moveTo='next' 
                            onMove={buttonMove}
            />
            <CarouselPagination onMove={paginationMove} 
                                itemsQuantity={state.itemsQuantity}
            />
        </div>
    )
}

export default Carousel