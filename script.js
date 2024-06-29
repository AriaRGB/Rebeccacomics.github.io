const Switchableimage = document.getElementById("SwitchableImage")

const titleElement = document.getElementById('Titletext');
const fullTitle = "Rebecca's Cove_";
let currentText = 'R_';
let currentIndex = 1; // Start after 'R_'

function animateTitle() {
    if (currentIndex < fullTitle.length) {
        currentText = fullTitle.slice(0, currentIndex + 1) + '_';
        currentIndex++;
        titleElement.textContent = currentText;
        setTimeout(animateTitle, 300); // Adjust the speed of the animation here
    } else {
        titleElement.textContent = fullTitle;
    }
}

setTimeout(animateTitle, 300); // Initial delay before starting the animation

let currentLinkIndex = 0;
let links = [];

// Function to fetch the local file
async function fetchLocalFile(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        return text;
    } catch (error) {
        console.error('Error fetching the file:', error);
        return null;
    }
}

// Function to extract links from the text
function extractLinks(text) {
    // Regular expression to match URLs
    const urlRegex = /https?:\/\/[^\s]+/g;
    return text.match(urlRegex);
}

// Function to switch the image source to the next link
function switchImageSource() {
    const SwitchableImage = document.getElementById('SwitchableImage');
    if (links && links.length > 0) {
        SwitchableImage.src = links[currentLinkIndex];
        currentLinkIndex = (currentLinkIndex + 1) % links.length; // Move to the next link
        console.log(currentLinkIndex)
    } else {
        console.error('No valid links found to switch the image source.');
    }
}

function switchbackImageSource() {
    const SwitchableImage = document.getElementById('SwitchableImage');
    if (links && links.length > 0) {
        SwitchableImage.src = links[currentLinkIndex];
        currentLinkIndex = (currentLinkIndex - 1) % links.length; // Move back one link
        console.log(currentLinkIndex)
    } else {
        console.error('No valid links found to switch the image source.');
    }
}

// Main function to fetch the file, extract links, and initialize the image source
async function main() {
    const filePath = '/boring stuff/urllist.txt'; // Change this to the path of your local file
    const fileContent = await fetchLocalFile(filePath);
    if (fileContent) {
        links = extractLinks(fileContent);
        switchImageSource(); // Initialize the first image
    }
}

// Add event listener to the button to switch to the next image
document.getElementById('nextImageButton').addEventListener('click', switchImageSource);
// Event listener to go back one image
document.getElementById('beforeImageButton').addEventListener('click', switchbackImageSource);


// Run the main function
main();

// Image value handler

function Indexcheck() {
    if (currentLinkIndex === undefined) {
    var currentLinkIndex = 0;
    }
}

setInterval(Indexcheck, 100)
