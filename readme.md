# Carousel
It's my training project to learn react
## _How to use it in your project with React:_
- copy folder 'Carousel' from 'src/components/' to your componenst folder;
- import Carousel in your parent component. For example `import Carousel from "./Carousel/Carousel"`
- install node modules
```sh
npm install react react-dom
npm install --save-dev css-loader
npm install --save-dev style-loader
```
- insert the component in your DOM:
```sh
    <div className='App'>
        <Carousel
            content={arrayWithElems}
            gap={20}
            itemsOnScreen={3}
            loop={true}
        />
    </div>
```
- as content you need to use the array with any html elements. For example:
```sh
    [
        <div className='anyClassName'>Content 1</div>,
        <div className='anyClassName'>Content 2</div>,
    ]
```
- also, you need to use some settings:
    - `gap` - gap between carousel items. type: number. (px)  
    - `itemsOnScreen` - how much items you need to see per view. type: number  
    - `loop` - choose `true` if you need infinite slides in your carousel. type: boolean  

## _How to check, how it works right now:_

Latest version of the project available on:
https://sasaafanasienka.github.io/Carousel/

Current settings.
- 10 div blocks as the content
- gap: 20px
- 3 items on screen
- enabled infinite loop

You need install the project if you need to check how it works with other settings
