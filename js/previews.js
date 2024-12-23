document.getElementById("previewbutton").addEventListener("click", function () {

    // let preview=document.getElementById("previewbutton")

    speakText();

    console.log("Preview started!");

    // Loop through all stored animation settings
    for (const [id, settings] of Object.entries(animationSettings)) {
        const { element, timer } = settings;

        // Reset the element's position and opacity before starting the animation
        element.style.transition = "none";
        element.style.opacity = '0.4';
        element.style.transform = "translateY(50px)"; // Example for upward animation (adjust based on your logic)

        // Trigger reflow to ensure styles are applied
        void element.offsetHeight;

        // Apply the animation with the stored timer
        setTimeout(() => {
            element.style.transition = `transform ${timer}s ease, opacity ${timer}s ease`;
            element.style.transform = "translateY(0)";
            element.style.opacity = '1';
        }, 100); // Small delay to ensure reset styles are applied
    }

    //     if (background.requestFullscreen) {
    //         background.requestFullscreen();
    //     } else if (background.webkitRequestFullscreen) { // For Safari compatibility
    //         background.webkitRequestFullscreen();
    //     } else if (background.msRequestFullscreen) { // For IE11 compatibility
    //         background.msRequestFullscreen();
      
    // }
});

