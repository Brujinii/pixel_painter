const container = document.getElementById("grid");
let is_drawing = false;

// Create Grid to Specified Dimension
function makeRows(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("div");
        container.appendChild(cell).className = "grid-item";
    };
};
makeRows(64, 64);

// Drawing Code
container.addEventListener('mouseleave', () => {
    is_drawing = false
})

const pixels = document.querySelectorAll(".grid-item");

pixels.forEach((pixel) => {
    pixel.style.backgroundColor = "white"  // default background color
    pixel.addEventListener('mousedown', () => {  // when mousedown, draw in square
        is_drawing = true
        pixel.style.backgroundColor = color
    });
    pixel.addEventListener('mouseup', () => {   // stop drawing on mouseup
        is_drawing = false
    });
    pixel.addEventListener('mouseenter', () => {   // if is_drawing == true when mouse enters, draw
        if (is_drawing) {
            pixel.style.backgroundColor = color
        };
    });
});

// Clear function
const clear = document.getElementById('clear') 
clear.addEventListener('click', () => {
    let clear_doc = confirm("Would you really like to clear?")  // make sure that the user would like to clear
    if (clear_doc) {
        pixels.forEach((pixel) => {
            pixel.style.backgroundColor = "white"
        })
    }
})

// Color Picker
const color_picker = document.getElementById("colorpicker");
let color = color_picker.value;

color_picker.addEventListener('input', () => {
    color = color_picker.value
});

// Toggle grid lines
const grid_lines = document.getElementById('toggle-grid')
let grid_lines_drawn = true
grid_lines.addEventListener('click', () => {
    if (grid_lines_drawn) {
        pixels.forEach((pixel) => {
            pixel.style.border = "none"
            pixel.style.padding = '1px'
        })
        container.style.columnGap = "0px"
        container.style.rowGap = "0px"
        grid_lines_drawn = false
    } else {
        pixels.forEach((pixel) => {
            pixel.style.padding = '0px'
        })
        container.style.columnGap = "2px"
        container.style.rowGap = "2px"
        grid_lines_drawn = true    
    }
})