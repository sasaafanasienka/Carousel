import React, { Component, useState, useEffect, createRef, forwardRef } from "react";
import { render } from "react-dom";
import './CarouselContent.css';

class CarouselContent extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div ref={this.props.forwardRef} className='CarouselContent' onTouchStart={this.props.onTouchStart} onTouchMove={this.props.onMove} onTouchEnd={this.props.onTouchEnd}>
                {this.props.content}     
            </div>
        )
    }
}

export default React.forwardRef((props, ref) => <CarouselContent {...props} forwardRef={ref} />)