const container = document.getElementById("grid");
let is_drawing = false;
let color = "black"

function makeRows(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("div");
        container.appendChild(cell).className = "grid-item";
    };
};
makeRows(16, 16);

container.addEventListener('mouseleave', () => {
    is_drawing = false
})

const pixels = document.querySelectorAll(".grid-item");

pixels.forEach((pixel) => {
    console.log("Hello")
    pixel.style.backgroundColor = "white"
    pixel.addEventListener('mousedown', () => {
        is_drawing = true
        pixel.style.backgroundColor = color
    });
    pixel.addEventListener('mouseup', () => {
        is_drawing = false
    });
    pixel.addEventListener('mouseenter', () => {
        if (is_drawing) {
            pixel.style.backgroundColor = color
        };
    });
});

const clear = document.getElementById('clear') 
clear.addEventListener('click', () => {
    let clear_doc = confirm("Would you really like to clear?")
    if (clear_doc) {
        pixels.forEach((pixel) => {
            pixel.style.backgroundColor = "white"
        })
    }
})