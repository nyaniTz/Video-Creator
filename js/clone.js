const background = document.getElementById('background');
let hoveredElement = null;
let activeElement = null; // Track the currently active element

// Utility function to make elements draggable and resizable
const makeDraggableAndResizable = (element) => {
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    let isResizing = false, isDragging = false;
    let startX, startY, startWidth, startHeight, startTop, startLeft;
    let currentHandle;

    const onMouseMove = (e) => {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        const parentRect = background.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();

        if (isDragging) {
            let newTop = clamp(startTop + dy, 0, parentRect.height - elementRect.height);
            let newLeft = clamp(startLeft + dx, 0, parentRect.width - elementRect.width);
            element.style.top = `${newTop}px`;
            element.style.left = `${newLeft}px`;
        } else if (isResizing) {
            let newWidth = startWidth, newHeight = startHeight, newTop = startTop, newLeft = startLeft;
            switch (currentHandle) {
                case 'nw':
                    newWidth = startWidth - dx;
                    newHeight = startHeight - dy;
                    newLeft = startLeft + dx;
                    newTop = startTop + dy;
                    break;
                case 'ne':
                    newWidth = startWidth + dx;
                    newHeight = startHeight - dy;
                    newTop = startTop + dy;
                    break;
                case 'sw':
                    newWidth = startWidth - dx;
                    newHeight = startHeight + dy;
                    newLeft = startLeft + dx;
                    break;
                case 'se':
                    newWidth = startWidth + dx;
                    newHeight = startHeight + dy;
                    break;
                case 'n':
                    newHeight = startHeight - dy;
                    newTop = startTop + dy;
                    break;
                case 'e':
                    newWidth = startWidth + dx;
                    break;
                case 's':
                    newHeight = startHeight + dy;
                    break;
                case 'w':
                    newWidth = startWidth - dx;
                    newLeft = startLeft + dx;
                    break;
            }

            if (newWidth > 10 && newHeight > 10) {
                element.style.width = `${newWidth}px`;
                element.style.height = `${newHeight}px`;
                element.style.top = `${newTop}px`;
                element.style.left = `${newLeft}px`;
            }
        }
    };

    const onMouseUp = () => {
        isDragging = false;
        isResizing = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseDown = (e) => {
        if (e.target.dataset.resize) {
            isResizing = true;
            currentHandle = e.target.dataset.resize;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = parseFloat(getComputedStyle(element).width);
            startHeight = parseFloat(getComputedStyle(element).height);
            startTop = parseFloat(getComputedStyle(element).top);
            startLeft = parseFloat(getComputedStyle(element).left);
        } else {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            startTop = parseFloat(getComputedStyle(element).top);
            startLeft = parseFloat(getComputedStyle(element).left);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    element.addEventListener('mousedown', onMouseDown);
};

// Duplicate and initialize functionality for new elements
const duplicateElement = () => {
   let element = hoveredElement;
   console.log("hovered element: ", element)
   const elementClassName = element.getAttribute("class");
   element = elementClassName == 'child' ? element.parentNode : element;


    if (element && element.id !== "background") {
        const clone = element.cloneNode(true);
        clone.setAttribute("class", "clone");
        clone.style.position = "absolute";
        clone.style.left = `${element.offsetLeft + 10}px`;
        clone.style.top = `${element.offsetTop + 10}px`;
        clone.style.zIndex = "10";
        background.appendChild(clone);

        makeDraggableAndResizable(clone ); // Reinitialize draggable and resizable functionality

        // Add 8 resizing handles dynamically if not present
        const directions = ['nw', 'ne', 'sw', 'se', 'n', 'e', 's', 'w'];
        directions.forEach((direction) => {
            const handle = document.createElement('div');
            handle.dataset.resize = direction;
            handle.className = "dataresize"; // Use the correct class name
            handle.style.position = 'absolute';
            handle.style.width = '5px';
            handle.style.height = '5px';
            handle.style.background = '#0e4e46';
            handle.style.cursor = `${direction}-resize`;
            handle.style.display = "none";  // Hide by default
            // handle.style.padding='3px'
            switch (direction) {
                case 'nw':
                    handle.style.top = '-7px';
                    handle.style.left = '-7px';
                    break;
                case 'ne':
                    handle.style.top = '-7px';
                    handle.style.right = '-7px';
                    break;
                case 'sw':
                    handle.style.bottom = '-7px';
                    handle.style.left = '-7px';
                    break;
                case 'se':
                    handle.style.bottom = '-7px';
                    handle.style.right = '-7px';
                    break;
                case 'n':
                    handle.style.top = '-7px';
                    handle.style.left = '50%';
                    handle.style.transform = 'translateX(-50%)';
                    break;
                case 'e':
                    handle.style.top = '50%';
                    handle.style.right = '-7px';
                    handle.style.transform = 'translateY(-50%)';
                    break;
                case 's':
                    handle.style.bottom = '-7px';
                    handle.style.left = '50%';
                    handle.style.transform = 'translateX(-50%)';
                    break;
                case 'w':
                    handle.style.top = '50%';
                    handle.style.left = '-7px';
                    handle.style.transform = 'translateY(-50%)';
                    break;
            }
            clone.appendChild(handle);

            hideResizeHandles(); // Hide the text box resize handles
            hidedivresizehandle(); // Hide the box resize handles
            

                hideAllHandles(activeElement);
                // if(element){
                //     showHandles()

                // }
               


           
        });

      
        clone.addEventListener('mouseenter', () => {
            // const handles = clone.querySelectorAll('.dataresize');
            // handles.forEach(handle => handle.style.display = 'block');
            // hideResizeHandles()
        });

        clone.addEventListener('mouseleave', () => {
            // const handles = clone.querySelectorAll('.dataresize');
            // handles.forEach(handle => handle.style.display = 'none');
            // hideResizeHandles()
        });

        // Add click event listener to manage active element
        clone.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from propagating to the background

            hideResizeHandles(); // Hide the text box resize handles
            hidedivresizehandle(); // Hide the box resize handles

            

            
            
            if (activeElement && activeElement !== clone) {
                hideAllHandles(activeElement); // Hide handles of the previously active element
            }
            showHandles(clone); // Show handles for the clicked clone
            activeElement = clone; // Update the active element
        });
    }
};

// Hide all resize handles
const hideAllHandles = (element) => {
    if (element) {
      
        element.style.border = 'none';
        const handles = element.querySelectorAll('.dataresize');
        handles.forEach(handle => {
            handle.style.display = 'none'; // Hide handles
        });
    }
};

// Show handles for the active element
const showHandles = (element) => {
    if (element) {

        if(!element){

             element.style.border = '1px solid #081b2d';

        }
       



        const handles = element.querySelectorAll('.dataresize');
        handles.forEach(handle => {
            handle.style.display = 'block'; // Show handles
        });
    }
};

// Listen to mouseover event to track hovered element
document.addEventListener("mouseover", (e) => {
    if (e.target.matches("img, div") && e.target.id !== "background") {
        hoveredElement = e.target;
    }
});

// Listen to keyboard event for Ctrl+D duplication
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();  // Prevent default behavior (e.g., browser duplicating tabs)
        duplicateElement();
    }

    // Listen to delete key for deleting hovered element
    if (e.key === 'Delete') { 
        if (hoveredElement && hoveredElement.id !== "background") {
            hoveredElement.remove();
        }
    }
});

// Listen to keyboard event for Ctrl+Z undo
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();  // Prevent default behavior (e.g., undo in the browser)
        undoLastAction();
    }
});

// Undo the last action
const undoLastAction = () => {
    if (history.length > 0) {
        const lastAction = history.pop();

        switch (lastAction.action) {
            case 'clone':
                // Remove the last cloned element
                background.removeChild(lastAction.element);
                break;
            case 'resize':
                // Undo the resize by reverting the styles to the original state
                lastAction.element.style.cssText = lastAction.styles;
                break;
            case 'delete':
                // If a delete action was recorded, restore the element (if it was deleted)
                break;
            // Add other cases if needed for additional actions
        }
    }
};