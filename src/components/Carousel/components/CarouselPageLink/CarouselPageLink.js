import React, { Component, useState, useEffect } from "react";
import './CarouselPageLink.css';

function CarouselPageLink(props) {

    function goTo(event) {
        props.onClick(props.id)
    }

    return(
        <button className='CarouselPageLink' onClick={goTo}>
            {Number(props.id) + 1}
        </button>
    )
}

export default CarouselPageLink