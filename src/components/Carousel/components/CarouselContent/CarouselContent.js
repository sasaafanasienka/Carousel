import React, { Component, useState, useEffect, createRef, forwardRef } from "react";
import { render } from "react-dom";
import './CarouselContent.css';

class CarouselContent extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className='CarouselContent' ref={this.props.forwardRef} onTouchStart={this.props.onTouchStart} onTouchMove={this.props.onMove} onTouchEnd={this.props.onTouchEnd}>
                {this.props.content}     
            </div>
        )
    }
}

export default React.forwardRef((props, ref) => <CarouselContent {...props} forwardRef={ref} />)