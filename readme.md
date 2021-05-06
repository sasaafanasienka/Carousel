# Carousel

It's my own re-used carousel component

- It Works for mobile and desktop devices
- Supports swipes
- Works with any HTML content
- Animated
- Supports multiple slides on the screen
- Supports infinite option
- Supports scrolling to a selected slide (like go to slide X)

version: 1.2 changes:
- added customizing options for arrow buttons
- improved swipe function

## _How to use it in your project with React:_

- copy folder 'Carousel' from 'src/components/' to your folder 'components';
- import Carousel in your parent component. For example:
```sh
import Carousel from "./Carousel/Carousel"
```
- install node modules:
```sh
npm install react react-dom
npm install --save-dev css-loader
npm install --save-dev style-loader
```
- insert the component in your DOM:
```sh
    <div className='App'>
        <Carousel
            gap={20}
            itemsPerView={3}
            loop={true}
            buttonSize: {40}
            buttonPos: {-40}
        >
            {content}
        </Carousel>
    </div>
```
- as content you need to use the array with any html elements and unique "key" prop. For example:
```sh
    [
        <div key='1' className='anyClassName'>Content 1</div>,
        <div key='2' className='anyClassName'>Content 2</div>,
    ]
```
- also, you need to use some settings:
    - `gap` - gap between items (in pixels). type: number  
    - `itemsPerView` - how many items you need to see per view. type: number  
    - `loop` - choose `true` if you need infinite slides in your carousel. type: boolean
    - `buttonSize` - arrow button size (in pixels). type: number  
    - `buttonPos` - arrow button position relative to the edge of the frame (in pixels). type: number  

## _How to check Carousel working:_

The latest version of the project is available on:
https://sasaafanasienka.github.io/Carousel/

Current settings are generating randomly. 
If you need to check how it works with other settings just refresh the page.