import React from "react";
import { version } from "react-dom";
import { render } from "react-dom";
import './CarouselContent.css';

class CarouselContent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            startPoint: [],
            direction: null
        }

        this.mouseEvents = ['mousedown','mousemove','mouseup']
        this.touchEvents = ['touchstart','touchmove','touchend']
        this.getClientCoords = this.getClientCoords.bind(this)
        this.onMoveStart = this.onMoveStart.bind(this)
        this.onMove = this.onMove.bind(this)
        this.onMoveEnd = this.onMoveEnd.bind(this)
    }

    getClientCoords(event) {
        if (this.mouseEvents.includes(event.type)) {
            return [event.clientX, event.clientY]
        } else if (this.touchEvents.includes(event.type)) {
            return [event.changedTouches[0].clientX, event.changedTouches[0].clientY]
        }
    }

    onMoveStart(event) {
        if (this.mouseEvents.includes(event.type)) {
            event.preventDefault()
            document.addEventListener('mousemove', this.onMove)
            document.addEventListener('mouseup', this.onMoveEnd)
        }
        const startPoint = this.getClientCoords(event)
        this.setState({startPoint: startPoint})
        this.props.onMoveStart(startPoint[0])
    }

    onMove(event) {
        if (!this.state.direction) {
            const movePoint = this.getClientCoords(event)
            const offsetX = Math.abs(movePoint[0] - this.state.startPoint[0])
            const offsetY = Math.abs(movePoint[1] - this.state.startPoint[1])
            this.setState({direction: `${offsetX >= offsetY ? 'horizontal' : 'vertical'}`})
        } else if (this.state.direction === 'horizontal') {
            this.props.onMove(this.getClientCoords(event)[0])
        }
    }

    onMoveEnd(event) {
        if (this.mouseEvents.includes(event.type)) {
            document.removeEventListener('mousemove', this.onMove)
            document.removeEventListener('mouseup', this.onMoveEnd)
        }
        if (this.state.direction === 'horizontal') {
            this.props.onMoveEnd(this.getClientCoords(event)[0])
        }
        this.setState({direction: null})
    }

    render() {
        return(
            <div className='CarouselContent' 
                ref={this.props.forwardRef} 
                onMouseDown={this.onMoveStart}
                onTouchStart={this.onMoveStart} 
                onTouchMove={this.onMove} 
                onTouchEnd={this.onMoveEnd}
            >
                {this.props.children}
            </div>
        )
    }
}

export default React.forwardRef((props, ref) => <CarouselContent {...props} forwardRef={ref} />)