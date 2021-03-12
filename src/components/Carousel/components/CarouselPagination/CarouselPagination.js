import React, { Component, useState, useEffect } from "react";
import './CarouselPagination.css';
import animatedMove from "../../utilits/animatedMove";
import CarouselPageLink from "../CarouselPageLink/CarouselPageLink";

function CarouselPagination(props) {

    function makePaginationDOM() {
        let pagination = []
        for (let i = 0; i < props.itemsQuantity; i++) {
            pagination.push(
                <CarouselPageLink key={i.toString()} id={i.toString()} onClick={props.onMove}/>
            )
        }
        return pagination
    }

    return(
        <div className='CarouselPagination'>
            {makePaginationDOM()}
        </div>
    )
}

export default CarouselPagination