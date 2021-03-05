import React, { Component } from "react";

import Carousel from "./Carousel/Carousel"
// import CarouselItem from './CarouselItem/CarouselItem'


function App() {

    const contentArr = [
        <img key='1' className='Carousel__item' src='https://images.unsplash.com/photo-1614712257486-8a238b88bbdc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'/>,
        <img key='2' className='Carousel__item' src='https://images.unsplash.com/photo-1614712257486-8a238b88bbdc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'/>,
        <img key='3' className='Carousel__item' src='https://images.unsplash.com/photo-1614712257486-8a238b88bbdc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'/>,
        <img key='4' className='Carousel__item' src='https://images.unsplash.com/photo-1614712257486-8a238b88bbdc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'/>,
        <img key='5' className='Carousel__item' src='https://images.unsplash.com/photo-1614712257486-8a238b88bbdc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'/>,
    ]

    return (
        <div>
            <Carousel 
                startPoint='500px'
                gap={10}
                content={contentArr}
            />
        </div>
    );
}

export default App;