import React, { Component, useState, useEffect, createRef, forwardRef } from "react";
import { render } from "react-dom";
import './CarouselContent.css';

class CarouselContent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dragImg: null
        }
        this.onTouchStart = this.onTouchStart.bind(this)
        this.onMove = this.onMove.bind(this)
        this.onTouchEnd = this.onTouchEnd.bind(this)
        this.getCorrectClientX = this.getCorrectClientX.bind(this)
    }

    componentDidMount() {
        this.setState({ dragImg: document.querySelector('.CarouselContent__drag-image') });
    }

    getCorrectClientX(event) {
        const dragEvents = ['dragstart','drag','dragend']
        const touchEvents = ['touchstart','touchmove','touchend']
        if (dragEvents.includes(event.type)) {
            return event.clientX
        } else if (touchEvents.includes(event.type)) {
            return event.changedTouches[0].clientX
        }
    }

    onTouchStart(event) {
        this.props.onTouchStart(this.getCorrectClientX(event))
    }

    onMove(event) {
        console.log(this.state.dragImg)
        event.dataTransfer.setDragImage(this.state.dragImg, 0, 0)
        this.props.onMove(this.getCorrectClientX(event))
    }

    onTouchEnd(event) {
        this.props.onTouchEnd(this.getCorrectClientX(event))
    }

    render() {
        return(
            <div className='CarouselContent' 
                ref={this.props.forwardRef} 
                draggable={true}
                onDragStart={this.onTouchStart}
                onDrag={this.onMove}
                onDragEnd={this.onTouchEnd}
                onTouchStart={this.onTouchStart} 
                onTouchMove={this.onMove} 
                onTouchEnd={this.onTouchEnd}
            >
                {this.props.content}
                <img className='CarouselContent__drag-image'></img>     
            </div>
        )
    }
}

export default React.forwardRef((props, ref) => <CarouselContent {...props} forwardRef={ref} />)