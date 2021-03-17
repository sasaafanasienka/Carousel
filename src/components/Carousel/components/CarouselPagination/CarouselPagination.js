import React from "react";
import './CarouselPagination.css';
import CarouselPageLink from "../CarouselPageLink/CarouselPageLink";

function CarouselPagination(props) {

    function makePaginationDOM() {
        return Array(props.itemsQuantity).fill('').reduce((buttonsArr, currentValue, index) => {
            buttonsArr.push(
                <CarouselPageLink key={index.toString()} id={index} onClick={props.onClick}/>
            )
            return buttonsArr
        }, [])
    }

    return(
        <div className='CarouselPagination'>
            {makePaginationDOM()}
        </div>
    )
}

export default CarouselPagination