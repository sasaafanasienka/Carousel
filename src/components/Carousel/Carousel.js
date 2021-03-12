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
    const [itemsOnScreen, setItemsOnScreen] = useState(props.itemsOnScreen ? props.itemsOnScreen : 1)
    const [gap, setGap] = useState(props.gap ? props.gap : '10px')
    const [loop, setLoop] = useState(props.loop ? props.loop : false)
    const [itemsQuantity, setItemsQuantity] = useState(props.content.length)
    const [DOMItemsQuantity, setDOMItemsQuantity] = useState(loop && itemsQuantity > itemsOnScreen ? itemsQuantity + 2 * itemsOnScreen : itemsQuantity)
    const [itemWidth, setItemWidth] = useState(0)
    const [rightPositionsArr, setRightPositionsArr] = useState([])
    const [gridTemplate, setGridTemplate] = useState('')
    const [wasMounted, setWasMounted] = useState(false)

    useEffect(() => {
        if (!wasMounted) {
            const carouselWidth = document.querySelector('.Carousel').clientWidth
            const itemWidth = (carouselWidth - (gap * (itemsOnScreen - 1))) / itemsOnScreen
            let gridTemplate = `repeat(${DOMItemsQuantity}, ${itemWidth}px)`
            const rightPositionsArr = [0]
            for (let i = 1; i <= DOMItemsQuantity - itemsOnScreen; i++) {
                rightPositionsArr.push(-i * (itemWidth + gap))
            }
            let renderingPosition = 0
            if (props.loop && itemsQuantity > itemsOnScreen) {
                renderingPosition = rightPositionsArr[itemsOnScreen]
            }
            document.querySelector('.CarouselContent').style.left = `${renderingPosition}px`
            document.querySelector('.CarouselContent').style.gap = `0px ${gap}px`
            document.querySelector('.CarouselContent').style.gridTemplateColumns = gridTemplate
            savePosition(renderingPosition)
            setItemWidth(itemWidth)
            setRightPositionsArr(rightPositionsArr)
            setGridTemplate(gridTemplate)
            setWasMounted(true);
        }
    })

    function saveTouchPoint(event) {
        savePoint(event.targetTouches[0].clientX)
    }

    function touchMove(event) {
        const offset = event.targetTouches[0].clientX - touchPoint
        document.querySelector('.CarouselContent').style.left = `${currentPosition + offset}px`
    }

    function buttonMove(direction) {
        const currentIndex = rightPositionsArr.indexOf(currentPosition)
        const newPosition = rightPositionsArr[currentIndex + direction]
        if (newPosition !== undefined) {
            animatedMove(currentPosition, newPosition)
            if (loop && rightPositionsArr.indexOf(newPosition) === 0) {
                flashMove(rightPositionsArr[itemsQuantity])
                savePosition(rightPositionsArr[itemsQuantity])
                return
            } else if (loop && rightPositionsArr.indexOf(newPosition) === rightPositionsArr.length - 1) {
                flashMove(rightPositionsArr[rightPositionsArr.length - 1 - itemsQuantity])
                savePosition(rightPositionsArr[rightPositionsArr.length - 1 - itemsQuantity])
                return
            }
            savePosition(newPosition)
        }

    }

    function paginationMove(id) {
        let loopCorrection = 0
        if (loop && itemsQuantity > itemsOnScreen) {
            loopCorrection = itemsOnScreen;
        }
        let newPosition = rightPositionsArr[Number(id) + loopCorrection]
        if (newPosition === undefined) {
            newPosition = rightPositionsArr[itemsQuantity - itemsOnScreen]
        }
        if (newPosition !== currentPosition) {
            animatedMove(currentPosition, newPosition)
            savePosition(newPosition)
        }
    }

    function positionAdjust() {
        const currentX = Number(document.querySelector('.CarouselContent').style.left.slice(0, -2))
        let nearestRightPos = 0
        for (let i = 1; i < rightPositionsArr.length; i++) {
            if (Math.abs(currentX - rightPositionsArr[i]) < Math.abs(currentX - rightPositionsArr[nearestRightPos])) {
                nearestRightPos = i
            }
        }
        let newPosition = rightPositionsArr[nearestRightPos]
        animatedMove(currentX, newPosition)
        if (loop && rightPositionsArr.indexOf(newPosition) === 0) {
            flashMove(rightPositionsArr[itemsQuantity])
            savePosition(rightPositionsArr[itemsQuantity])
            return
        } else if (loop && rightPositionsArr.indexOf(newPosition) === rightPositionsArr.length - 1) {
            flashMove(rightPositionsArr[rightPositionsArr.length - 1 - itemsQuantity])
            savePosition(rightPositionsArr[rightPositionsArr.length - 1 - itemsQuantity])
            return
        }
        savePosition(rightPositionsArr[nearestRightPos])
    }

    return(
        <div className='Carousel'>
            <CarouselContent content={makeContentDOM(props.content, itemsOnScreen, loop)} 
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
                                itemsQuantity={itemsQuantity}
            />
        </div>
    )
}

export default Carousel