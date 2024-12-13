

let IsselectedElement = null;
thebackground=document.getElementById("background")
let textBox1 = document.getElementById('text-box');
// let mainBar=document.getElementById("mainBar")
let textBoxhandle = textBox1.querySelectorAll('.resize-handle'); // Use class selector\

let boxclass=document.querySelector(".box")
let thisdiv = box.querySelectorAll('[data-resize]');
// let boxclone=document.querySelector("clone")

// Function to show resize handles
function showdivresizehandle(event) {
    boxclass.style.border = '1px solid #081b2d';
    thisdiv.forEach(function(div) {
        div.style.opacity = '1'; // Set opacity for each element
        mainBar.style.display = 'grid';

       
    });

    IsselectedElement = event.currentTarget; // Assign the current element
    console.log("Selected Element:", IsselectedElement);
}

// Function to hide resize handles
function hideResizeHandles() {
    textBoxhandle.forEach(function(div) {
        div.style.opacity = '0'; // Set opacity for each element
        div.style.margin = '0'; // Reset margin for each element
    });
}

function showResizeHandles(event) {


    textBoxhandle.forEach(function(div) {
        div.style.opacity = '1'; // Set opacity for each element
        div.style.margin = '4px'; // Set margin for each element
        mainBar.style.display = 'grid';

      
    });

    IsselectedElement = event.currentTarget; // Assign the current element
    console.log("Selected Element:", IsselectedElement);
}



function hidedivresizehandle(){
    boxclass.style.border='none'
    thisdiv.forEach(function(div2){
        div2.style.opacity='0'
        div2.style.margin = '0'; // Reset margin for each element
    });
}

// Show resize handles when clicking on the text box
textBox1.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent the click event from bubbling up to the document
    hidedivresizehandle(); // Hide the box resize handles
    hideAllHandles(activeElement);
    showResizeHandles(event); // Show the text box resize handles
});

// Show resize handles when clicking on the box
boxclass.addEventListener('click', function(event) {
    event.stopPropagation();
    hideResizeHandles(); // Hide the text box resize handles
    hideAllHandles(activeElement);
    showdivresizehandle(event); // Show the box resize handles
});




let popupprotect = document.getElementById("popup")


// Hide resize handles when clicking anywhere else in the document
// Hide resize handles when clicking anywhere else in the document
document.addEventListener('click', function(e) {
    if (thebackground.contains(e.target) && (!popupprotect.contains(e.target) && (e.target.tagName === 'IMG' || e.target.tagName === 'DIV' || e.target.tagName === 'INPUT'))) {
        hideResizeHandles(); // Hide the text box resize handles
        hidedivresizehandle(); // Hide the box resize handles
        hideAllHandles(activeElement);


        IsselectedElement = null; // Clear the selected element
        console.log("No element selected");
        
    }
});