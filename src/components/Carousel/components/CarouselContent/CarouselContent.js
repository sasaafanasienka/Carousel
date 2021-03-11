import React, { Component, useState, useEffect } from "react";
import './CarouselContent.css';

function CarouselContent(props) {

    return(
        <div className='CarouselContent' onTouchStart={props.onTouch} onTouchMove={props.onMove} onTouchEnd={props.onTouchEnd}>
            {props.content}     
        </div>
    )
}

export default CarouselContent