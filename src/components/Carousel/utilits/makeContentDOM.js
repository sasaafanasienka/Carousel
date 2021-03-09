function makeContentDOM() {
    if (props.content.length = props.itemsOnScreen + 2) {
        return props.content
    } else {
        let newContent = []
        newContent.push(props.content[props.content.length - 1], props.content, props.content[0])
        return newContent
    }
}

export default makeContentDOM