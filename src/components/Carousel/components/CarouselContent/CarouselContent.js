import React from "react";
import { render } from "react-dom";
import './CarouselContent.css';

class CarouselContent extends React.Component {

    constructor(props) {
        super(props)

        this.mouseEvents = ['mousedown','mousemove','mouseup']
        this.touchEvents = ['touchstart','touchmove','touchend']
        this.getClientX = this.getClientX.bind(this)
        this.onMoveStart = this.onMoveStart.bind(this)
        this.onMove = this.onMove.bind(this)
        this.onMoveEnd = this.onMoveEnd.bind(this)
    }

    getClientX(event) {
        if (this.mouseEvents.includes(event.type)) {
            return event.clientX
        } else if (this.touchEvents.includes(event.type)) {
            return event.changedTouches[0].clientX
        }
    }

    onMoveStart(event) {
        if (this.mouseEvents.includes(event.type)) {
            event.preventDefault()
            document.addEventListener('mousemove', this.onMove)
            document.addEventListener('mouseup', this.onMoveEnd)
        }
        this.props.onMoveStart(this.getClientX(event))
    }

    onMove(event) {
        this.props.onMove(this.getClientX(event))
    }

    onMoveEnd(event) {
        if (this.mouseEvents.includes(event.type)) {
            document.removeEventListener('mousemove', this.onMove)
            document.removeEventListener('mouseup', this.onMoveEnd)
        }
        this.props.onMoveEnd(this.getClientX(event))
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
                {this.props.content}
                <img className='CarouselContent__drag-image'></img>     
            </div>
        )
    }
}

export default React.forwardRef((props, ref) => <CarouselContent {...props} forwardRef={ref} />)