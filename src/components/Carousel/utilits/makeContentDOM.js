function makeContentDOM(content, itemsOnScreen, loop) {
    if (loop && content.length <= itemsOnScreen) {
        return content
    } else {
        let infiniteContent = []
        for (let i = content.length - itemsOnScreen; i < content.length; i++) {
            infiniteContent.push(content[i])
        }
        infiniteContent = infiniteContent.concat(content)
        for (let i = 0; i < itemsOnScreen; i++) {
            infiniteContent.push(content[i])
        }
        return infiniteContent
    }
}

export default makeContentDOM