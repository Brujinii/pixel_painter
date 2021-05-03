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
makeRows(32, 32);

// Drawing Code

let current_brush = "pencil"
// Pencil
const brushes = document.querySelectorAll('.brush')
brushes.forEach((brush) => {
    brush.addEventListener('click', () => {
        brushes.forEach((brush) => {
            brush.classList.remove("brush_active")
        })
        brush.classList.add("brush_active")
        current_brush = brush.id
    })
})
container.addEventListener('mouseleave', () => {
    is_drawing = false;
});

const pixels = document.querySelectorAll(".grid-item");

const bg_color = "white";

pixels.forEach((pixel) => {
    function draw() {
        if (current_brush === "pencil") {
            pixel.style.backgroundColor = color;
        };
        if (current_brush === "eraser") {
            pixel.style.backgroundColor = bg_color
        };
    };
    pixel.style.backgroundColor = bg_color  // default background color
    pixel.addEventListener('mousedown', () => {  // when mousedown, draw in square
        is_drawing = true
        draw()
    });
    pixel.addEventListener('mouseup', () => {   // stop drawing on mouseup
        is_drawing = false
    });
    pixel.addEventListener('mouseenter', () => {   // if is_drawing == true when mouse enters, draw
        if (is_drawing) {
            draw()
        };
    });
});

// Clear function
const clear = document.getElementById('clear') 
clear.addEventListener('click', () => {
    let clear_doc = confirm("Would you really like to clear?")  // make sure that the user would like to clear
    if (clear_doc) {
        pixels.forEach((pixel) => {
            pixel.style.backgroundColor = bg_color
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
        container.style.columnGap = "1px"
        container.style.rowGap = "1px"
        grid_lines_drawn = true    
    }
})

// Brush Size
const brush_slider = document.querySelector(".slider");
const brush_text_value = document.querySelector(".brush_size");
let brush_size = brush_slider.value;

brush_slider.addEventListener("input", () => {
    brush_size = brush_slider.value;
    brush_text_value.textContent = brush_size
})