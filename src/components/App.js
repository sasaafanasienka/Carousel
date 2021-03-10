import React, { Component } from "react";
import './App.css'
import '../styles/anyClassName.css'
import Carousel from "./Carousel/Carousel"

function App() {

    const contentArr = [
        <div key={1} className='anyClassName'>1</div>,
        <div key={2} className='anyClassName'>2</div>,
        <div key={3} className='anyClassName'>3</div>,
        <div key={4} className='anyClassName'>4</div>,
        <div key={5} className='anyClassName'>5</div>,
        <div key={6} className='anyClassName'>6</div>,
        <div key={7} className='anyClassName'>7</div>,
        <div key={8} className='anyClassName'>8</div>,
        <div key={9} className='anyClassName'>9</div>,
        <div key={10} className='anyClassName'>10</div>,
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