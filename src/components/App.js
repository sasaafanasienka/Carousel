import React, { Component } from "react";
import './App.css'
import '../styles/anyClassName.css'
import Carousel from "./Carousel/Carousel"

function App() {

    const contentArr = [
        <div className='anyClassName'>1</div>,
        <div className='anyClassName'>2</div>,
        <div className='anyClassName'>3</div>,
        <div className='anyClassName'>4</div>,
        <div className='anyClassName'>5</div>,
        <div className='anyClassName'>6</div>,
        <div className='anyClassName'>7</div>,
        <div className='anyClassName'>8</div>,
        <div className='anyClassName'>9</div>,
        <div className='anyClassName'>10</div>,
    ]

    return (
        <div className='App'>
            <Carousel
                content={contentArr}
                gap={20}
                itemsOnScreen={3}
                loop={true}
            />
        </div>
    );
}

export default App;