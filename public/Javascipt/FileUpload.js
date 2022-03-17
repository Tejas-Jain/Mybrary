FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
)
FilePond.setOptions({
    stylePanelAspectRatio: 150/100,
    imageResizeTargetWidth: 100,
    imageResizeTargetHeight: 150

})
let pond1 = FilePond.parse(document.body)
// console.log(pond1[0])

// // Registering Plugin Again(For Testing)
// const input= document.querySelector('.second');
// let pond = FilePond.create(input)
// console.log(pond)


// // Registering Plugin Again(For Testing)
// const input2 = document.querySelector('section')
// let pond2 = FilePond.create(input2)
// pond2.required = true 
// console.log(pond2)


// // Registering Plugin Again(For Testing)
// FilePond.registerPlugin(
//     FilePondPluginImagePreview,
//     FilePondPluginImageResize,
//     FilePondPluginFileEncode,
// )
// let pond2 = FilePond.parse(document.body)
// console.log(pond2[0])