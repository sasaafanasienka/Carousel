import React, { useEffect, useRef, createRef, Component } from "react";
import './Carousel.css';
import animatedMove from "./utilits/animatedMove";
import makeContentDOM from './utilits/makeContentDOM'
import CarouselButton from "./components/CarouselButton/CarouselButton";
import CarouselPagination from "./components/CarouselPagination/CarouselPagination";
import CarouselContent from "./components/CarouselContent/CarouselContent";
import { render } from "react-dom";

class Carousel extends Component {

    constructor(props) {
        super(props)

        this.carouselContent = createRef()
        this.carousel = createRef()

        this.itemsQuantity = this.props.content.length
        this.itemsPerView = this.props.itemsPerView ? this.props.itemsPerView : 1
        this.gap = this.props.gap !== undefined ? this.props.gap : 10
        this.loop = this.props.loop ? this.props.loop : false
        this.DOMItemsQuantity = this.loop && this.itemsQuantity > this.itemsPerView ? this.itemsQuantity + 2 * this.itemsPerView : this.itemsQuantity // if (loop) we need to duplicate some items

        this.state ={
            wasMounted: false,
            currentPos: 0, //current style.left of carousel content block
            correctPositions: [], //array of correct coordinates for carousel content block
            prevButtonIsActive: this.loop && this.itemsQuantity > this.itemsPerView,
            nextButtonIsActive: this.itemsQuantity > this.itemsPerView,
            touchPoint: 0
        }

        this.saveTouchPoint = this.saveTouchPoint.bind(this)
        this.touchMove = this.touchMove.bind(this)
        this.buttonMove = this.buttonMove.bind(this)
        this.paginationMove = this.paginationMove.bind(this)
        this.positionCorrection = this.positionCorrection.bind(this)
        this.arrowButtonsManage = this.arrowButtonsManage.bind(this)
        this.getLoop = this.getLoop.bind(this)
    }

    componentDidMount() {
        if (!this.state.wasMounted) {
            const carouselWidth = this.carousel.current.clientWidth
            const itemWidth = (carouselWidth - (this.gap * (this.itemsPerView - 1))) / this.itemsPerView
            const gridTemplate = `repeat(${this.DOMItemsQuantity}, ${itemWidth}px)`
            let correctPositions = [0]
            let renderingPosition = 0
            if (this.itemsQuantity <= this.itemsPerView) {
                renderingPosition = (carouselWidth - (itemWidth * this.itemsQuantity + this.gap * (this.itemsQuantity - 1))) / 2
                correctPositions = [renderingPosition] //if there items per view more than items quantity we have only one right position in the center of view
            } else {
                for (let i = 1; i <= this.DOMItemsQuantity - this.itemsPerView; i++) {
                    correctPositions.push(-i * (itemWidth + this.gap))
                }
                renderingPosition = this.loop ? correctPositions[this.itemsPerView] : 0
            }
            this.carouselContent.current.style.left = `${renderingPosition}px`
            this.carouselContent.current.style.gap = `0px ${this.gap}px`
            this.carouselContent.current.style.gridTemplateColumns = gridTemplate
            this.setState({
                currentPos: renderingPosition,
                correctPositions: correctPositions,
                wasMounted: true
            })
        }
    }

    saveTouchPoint(touchPoint) {
        this.setState({touchPoint: touchPoint})
    }
    
    touchMove(movingPoint) {
        const offset = movingPoint - this.state.touchPoint
        this.carouselContent.current.style.left = `${this.state.currentPos + offset}px`
        // console.log(this.carouselContent.current.style.left)
    }

    positionCorrection(endPoint) {
        const currentPos = this.state.currentPos - this.state.touchPoint + endPoint
        let nearestCorrectPos = 0
        for (let i = 1; i < this.state.correctPositions.length; i++) {
            if (Math.abs(currentPos - this.state.correctPositions[i]) < Math.abs(currentPos - this.state.correctPositions[nearestCorrectPos])) {
                nearestCorrectPos = i
            }
        }
        let newPos = this.state.correctPositions[nearestCorrectPos]
        this.arrowButtonsManage(this.state.correctPositions.indexOf(newPos))
        animatedMove(currentPos, newPos)
        this.getLoop(newPos)
    }

    buttonMove(direction) {
        const currentIndex = this.state.correctPositions.indexOf(this.state.currentPos)
        const newPos = this.state.correctPositions[currentIndex + direction]
        this.arrowButtonsManage(this.state.correctPositions.indexOf(newPos))
        animatedMove(this.state.currentPos, newPos)
        this.getLoop(newPos)
    }

    paginationMove(id) {
        //if (loop) we have additional carousel items in DOM
        let loopCorrection = this.loop && this.itemsQuantity > this.itemsPerView ? this.itemsPerView : 0
        let newPos = this.state.correctPositions[id + loopCorrection]
        if (newPos === undefined) { //this can happen if you go to the last item of carousel and loop is unactive
            newPos = this.state.correctPositions[this.itemsQuantity - this.itemsPerView] //it wiil be move on nearest correct position 
        }
        if (newPos !== this.state.currentPos) {
            this.arrowButtonsManage(this.state.correctPositions.indexOf(newPos))
            animatedMove(this.state.currentPos, newPos)
            this.setState({currentPos: newPos})
        }
    }

    arrowButtonsManage(position) {
        if (!this.loop) {
            if (position === 0) {
                this.setState({prevButtonIsActive: false})
            } else if (position !== 0 && !this.state.prevButtonIsActive) {
                this.setState({prevButtonIsActive: true})
            }
            if (position === this.state.correctPositions.length - 1) {
                this.setState({nextButtonIsActive: false})
            } else if (position !== this.state.correctPositions.length - 1 && !this.state.nextButtonIsActive) {
                this.setState({nextButtonIsActive: true})
            }
        }
    }

    getLoop(newPos) {
        if (this.loop && this.state.correctPositions.indexOf(newPos) === 0 && this.state.correctPositions.length > 1) {
            this.carouselContent.current.style.left = this.state.correctPositions[this.itemsQuantity] //flash move to tearget point
            this.setState({currentPos: this.state.correctPositions[this.itemsQuantity]})
        } else if (this.loop && this.state.correctPositions.indexOf(newPos) === this.state.correctPositions.length - 1 && this.state.correctPositions.length > 1) {
            this.carouselContent.current.style.left = this.state.correctPositions[this.state.correctPositions.length - 1 - this.itemsQuantity] //flash move to tearget point
            this.setState({currentPos: this.state.correctPositions[this.state.correctPositions.length - 1 - this.itemsQuantity]})
        } else {
            this.setState({currentPos: newPos})
        }
    }

    render() {
        return(
            <div className='Carousel' ref={this.carousel}>
                <CarouselContent content={makeContentDOM(this.props.content, this.itemsPerView, this.loop)} 
                                onTouchStart={this.saveTouchPoint} 
                                onMove={this.touchMove} 
                                onTouchEnd={this.positionCorrection}
                                ref={this.carouselContent}
                />
                <CarouselButton moveTo='previous'
                                isActive={this.state.prevButtonIsActive} 
                                onClick={this.buttonMove}
                />
                <CarouselButton moveTo='next' 
                                isActive={this.state.nextButtonIsActive}
                                onClick={this.buttonMove}
                />
                <CarouselPagination onClick={this.paginationMove} 
                                    itemsQuantity={this.itemsQuantity}
                />
            </div>
        )
    }
}

export default Carousel