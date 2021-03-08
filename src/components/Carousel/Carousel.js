import React, { Component, useState, useEffect } from "react";
import './Carousel.css';
import Car from './Car'

function Carousel(props) {

    function makeContentDOM() {
        if (props.content.length = props.itemsOnScreen + 2) {
            return props.content
        } else {
            let newContent = []
            newContent.push(props.content[props.content.length - 1], props.content, props.content[0])
            return newContent
        }
    }

    const [state, setState] = useState({
        first: 0,
        content: makeContentDOM(),
    })

    useEffect(() => {
        if (state.first === 0) {
            console.log(document.querySelector('.Carousel').offsetParent.clientWidth)
            const screenWidth = document.querySelector('.Carousel').clientWidth;
            const itemsOnScreen = props.itemsOnScreen
            const itemWidth = (screenWidth - (props.gap * (itemsOnScreen - 1))) / itemsOnScreen
            let gridTemplate = ''
            let itemsQuantity = state.content.length < (props.itemsOnScreen + 2) ? state.content.length + 2 : state.content.length
            console.log(itemsQuantity)
            for (let i = 0; i < itemsQuantity; i++) {
                gridTemplate = gridTemplate.concat(`${itemWidth}px `)
            }
            setState({
                first: 1,
                content: state.content,
                gridTemplateColumns: gridTemplate,
                itemWidth: itemWidth
            })
        }
    });

    function movecarousel(event) {
        function animationStep(frameNum, direction) {
            let animationFunction = (Math.sin((Math.PI / 2)* -1 + Math.PI * frameNum / 25) + 1) / 2
            document.querySelector('.Carousel__content').style.left = `${animationFunction * (state.itemWidth + props.gap) * direction}px`
        }

        let direction = 0
        event.target.className === 'Carousel__arrow Carousel__arrow_left' ? direction = -1 : direction = 1
        let frameNum = 0

        let animation = setInterval(() => {
            frameNum = frameNum + 1
            if (frameNum >= 25) {
                clearInterval(animation)
            }
            animationStep(frameNum, direction)
        }, 10);
    }

    return(
        <div className='Carousel'>
            <div className='Carousel__content' style={{left: 0, gap: `0px ${props.gap}px`, gridTemplateColumns: state.gridTemplateColumns}}>
                {state.content}
            </div>
            <button className='Carousel__arrow Carousel__arrow_left' onClick={movecarousel}></button>
            <button className='Carousel__arrow Carousel__arrow_right' onClick={movecarousel}></button>
        </div>
    )
}

export default Carousel






// const [startPoint, setStartPoint] = useState(0)






{/* <button className='Carousel__arrow Carousel__arrow_left' onClick={moveCarousel}></button>
<button className='Carousel__arrow Carousel__arrow_right' onClick={moveCarousel}></button> */}






// function moveCarousel(event) {
//     if (event.target.className === 'Carousel__arrow Carousel__arrow_left') {
//         setStartPoint(startPoint - 25)
//     } else {
//         setStartPoint(startPoint + 25)
//     }
// }