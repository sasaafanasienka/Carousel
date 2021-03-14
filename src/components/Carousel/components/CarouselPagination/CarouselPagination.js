import React from "react";
import './CarouselPagination.css';
import CarouselPageLink from "../CarouselPageLink/CarouselPageLink";

function CarouselPagination(props) {

    function makePaginationDOM() {
        let pagination = []
        for (let i = 0; i < props.itemsQuantity; i++) {
            pagination.push(
                <CarouselPageLink key={i.toString()} id={i.toString()} onClick={props.onClick}/>
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