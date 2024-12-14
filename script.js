// Constants for class names used in toggling the menu
const OPEN_CLASS = "open"; // 'open' class will be added/removed to toggle visibility

// Function to toggle the hamburger menu
function toggleMenu() {
   // Select the menu and the hamburger icon elements
   const menu = document.querySelector(".menu__link");
   const icon = document.querySelector(".hamburger__icon");

   // Safety check: Ensure both menu and icon exist
   if (!menu || !icon) return;

   // Toggle the 'open' class on both the menu and icon (this shows or hides the menu)
   menu.classList.toggle(OPEN_CLASS);
   icon.classList.toggle(OPEN_CLASS);

   // Check if the menu is now open
   const isMenuOpen = menu.classList.contains(OPEN_CLASS);

   if (isMenuOpen) {
       // Add an event listener to close the menu when clicking outside
       document.addEventListener("click", closeMenuOnOutsideClick);
   } else {
       // Remove the event listener when the menu is closed (cleanup)
       document.removeEventListener("click", closeMenuOnOutsideClick);
   }
}

// Function to close the menu when clicking outside
function closeMenuOnOutsideClick(event) {
   // Select the menu and the hamburger icon again (needed after clicking outside)
   const menu = document.querySelector(".menu__link");
   const icon = document.querySelector(".hamburger__icon");

   // Safety check: Ensure menu and icon still exist
   if (!menu || !icon) return;

   // Check if the click happened outside the menu and hamburger icon
   const clickedOutside = !menu.contains(event.target) && !icon.contains(event.target);

   if (clickedOutside) {
       // If clicked outside, remove the 'open' class from both menu and icon
       menu.classList.remove(OPEN_CLASS);
       icon.classList.remove(OPEN_CLASS);

       // Remove the event listener to avoid unnecessary checks when the menu is closed
       document.removeEventListener("click", closeMenuOnOutsideClick);
   }
}

// Scroll event to change background color based on scroll position
window.addEventListener("scroll", () => {
   // Get the current scroll position (how far down the page we are)
   const scrollTop = window.scrollY;

   // Get the total scrollable height (how long the page is)
   const documentHeight = document.body.scrollHeight - window.innerHeight;

   // Calculate the fraction of how much the page is scrolled (from 0 to 1)
   const scrollFraction = scrollTop / documentHeight;

   // Define the starting color (whitesmoke) and the ending color (peachpuff)
   const startColor = [245, 245, 245]; // RGB for whitesmoke
   const endColor = [255, 218, 185]; // RGB for peachpuff

   // Interpolate between the start and end colors based on the scroll position
   const interpolatedColor = startColor.map((start, index) =>
       Math.round(start + (endColor[index] - start) * scrollFraction)
   );

   // Create a linear gradient with the interpolated color
   const gradient = `linear-gradient(to right, rgb(${interpolatedColor.join(",")}), peachpuff, lavender)`;

   // Update the background color dynamically using a CSS variable for the gradient
   document.documentElement.style.setProperty("--scroll-color", gradient);
});

// Add a click event listener to the hamburger icon to toggle the menu visibility
document.querySelector(".hamburger__icon").addEventListener("click", toggleMenu);
