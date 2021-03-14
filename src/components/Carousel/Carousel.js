import React, { useState, useEffect } from "react";
import './Carousel.css';
import animatedMove from "./utilits/animatedMove";
import flashMove from "./utilits/flashMove";
import makeContentDOM from './utilits/makeContentDOM'
import CarouselButton from "./components/CarouselButton/CarouselButton";
import CarouselPagination from "./components/CarouselPagination/CarouselPagination";
import CarouselContent from "./components/CarouselContent/CarouselContent";

function Carousel(props) {

    const [wasMounted, setWasMounted] = useState(false)
    const [itemsQuantity, setItemsQuantity] = useState(props.content.length)
    const [itemsPerView, setitemsPerView] = useState(props.itemsPerView ? props.itemsPerView : 1)
    const [gap, setGap] = useState(props.gap !== undefined ? props.gap : 10)
    const [loop, setLoop] = useState(props.loop ? props.loop : false)
    const [DOMItemsQuantity, setDOMItemsQuantity] = useState(loop && itemsQuantity > itemsPerView ? itemsQuantity + 2 * itemsPerView : itemsQuantity) // if (loop) we need to duplicate some items
    const [currentPos, savePosition] = useState(0) //current style.left of carousel content block
    const [correctPositions, setCorrectPositions] = useState([]) //array of correct coordinates for carousel content block
    const [prevButtonIsActive, setPrevButtonIsActive] = useState(loop && itemsQuantity > itemsPerView ? true : false)
    const [nextButtonIsActive, setNextButtonIsActive] = useState(itemsQuantity > itemsPerView ? true : false)
    const [touchPoint, savePoint] = useState(0) 
    
    useEffect(() => {
        if (!wasMounted) {
            const carouselWidth = document.querySelector('.Carousel').clientWidth
            const itemWidth = (carouselWidth - (gap * (itemsPerView - 1))) / itemsPerView
            let gridTemplate = `repeat(${DOMItemsQuantity}, ${itemWidth}px)`
            let correctPositions = [0]
            let renderingPosition = 0
            if (itemsQuantity <= itemsPerView) {
                renderingPosition = (carouselWidth - (itemWidth * itemsQuantity + gap * (itemsQuantity - 1))) / 2
                correctPositions = [renderingPosition] //if there items per view more than items quantity we have only one right position in the center of view
            } else {
                for (let i = 1; i <= DOMItemsQuantity - itemsPerView; i++) {
                    correctPositions.push(-i * (itemWidth + gap))
                }
                renderingPosition = props.loop ? correctPositions[itemsPerView] : 0
            }
            document.querySelector('.CarouselContent').style.left = `${renderingPosition}px`
            document.querySelector('.CarouselContent').style.gap = `0px ${gap}px`
            document.querySelector('.CarouselContent').style.gridTemplateColumns = gridTemplate
            savePosition(renderingPosition)
            setCorrectPositions(correctPositions)
            setWasMounted(true);
        }
    })

    function saveTouchPoint(event) {
        savePoint(event.targetTouches[0].clientX)
    }

    function touchMove(event) {
        const offset = event.targetTouches[0].clientX - touchPoint
        document.querySelector('.CarouselContent').style.left = `${currentPos + offset}px`
    }

    function buttonMove(direction) {
        const currentIndex = correctPositions.indexOf(currentPos)
        const newPos = correctPositions[currentIndex + direction]
        arrowButtonsManage(correctPositions.indexOf(newPos))
        animatedMove(currentPos, newPos)
        getLoop(newPos)
    }

    function paginationMove(id) {
        let loopCorrection = 0
        if (loop && itemsQuantity > itemsPerView) {
            loopCorrection = itemsPerView; //if (loop) we have additional carousel items in DOM
        }
        let newPos = correctPositions[Number(id) + loopCorrection]
        if (newPos === undefined) { //this can happen if you go to the last item of carousel and loop is unactive
            newPos = correctPositions[itemsQuantity - itemsPerView] //it wiil be move on nearest correct position 
        }
        if (newPos !== currentPos) {
            arrowButtonsManage(correctPositions.indexOf(newPos))
            animatedMove(currentPos, newPos)
            savePosition(newPos)
        }
    }

    function positionCorrection() {
        const currentPos = Number(document.querySelector('.CarouselContent').style.left.slice(0, -2))
        let nearestCorrectPos = 0
        for (let i = 1; i < correctPositions.length; i++) {
            if (Math.abs(currentPos - correctPositions[i]) < Math.abs(currentPos - correctPositions[nearestCorrectPos])) {
                nearestCorrectPos = i
            }
        }
        let newPos = correctPositions[nearestCorrectPos]
        arrowButtonsManage(correctPositions.indexOf(newPos))
        animatedMove(currentPos, newPos)
        getLoop(newPos)
    }

    function arrowButtonsManage(position) {
        if (!loop) {
            if (position === 0) {
                setPrevButtonIsActive(false)
            } else if (position !== 0 && !prevButtonIsActive) {
                setPrevButtonIsActive(true)
            }
            if (position === correctPositions.length - 1) {
                setNextButtonIsActive(false)
            } else if (position !== correctPositions.length - 1 && !nextButtonIsActive) {
                setNextButtonIsActive(true)
            }
        }
    }

    function getLoop(newPos) {
        if (loop && correctPositions.indexOf(newPos) === 0 && correctPositions.length > 1) {
            flashMove(correctPositions[itemsQuantity])
            savePosition(correctPositions[itemsQuantity])
        } else if (loop && correctPositions.indexOf(newPos) === correctPositions.length - 1 && correctPositions.length > 1) {
            flashMove(correctPositions[correctPositions.length - 1 - itemsQuantity])
            savePosition(correctPositions[correctPositions.length - 1 - itemsQuantity])
        } else {
            savePosition(newPos)
        }
    }

    return(
        <div className='Carousel'>
            <CarouselContent content={makeContentDOM(props.content, itemsPerView, loop)} 
                             onTouch={saveTouchPoint} 
                             onMove={touchMove} 
                             onTouchEnd={positionCorrection}
            />
            <CarouselButton moveTo='previous'
                            isActive={prevButtonIsActive} 
                            onClick={buttonMove}
            />
            <CarouselButton moveTo='next' 
                            onClick={buttonMove}
                            isActive={nextButtonIsActive}
            />
            <CarouselPagination onClick={paginationMove} 
                                itemsQuantity={itemsQuantity}
            />
        </div>
    )
}

export default Carousel