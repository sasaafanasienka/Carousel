import React, { Component } from "react";
import './App.css'
import Carousel from "./Carousel/Carousel"

// import CarouselItem from './CarouselItem/CarouselItem'


function App() {

    const contentArr = [
        <img key='1' className='Carousel__item' src='https://images.unsplash.com/photo-1614891069485-2402767ca01f?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'/>,
        <img key='2' className='Carousel__item' src='https://images.unsplash.com/photo-1598343661787-2c74b56d87f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGJlbGFydXN8ZW58MHx8MHw%3D&auto=format&fit=crop&w=500&q=60'/>,
        <img key='3' className='Carousel__item' src='https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'/>,
        <img key='4' className='Carousel__item' src='https://images.unsplash.com/photo-1614955095047-711d38162821?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'/>,
        <img key='5' className='Carousel__item' src='https://images.unsplash.com/photo-1612831198717-1e71a0d5e2ad?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'/>,
    ]

    return (
        <div className='App'>
            <Carousel
                content={contentArr}
                gap={20}
                itemsOnScreen={3}
            />
        </div>
    );
}

export default App;