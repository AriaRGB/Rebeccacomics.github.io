const Switchableimage = document.getElementById("SwitchableImage");
let body = document.getElementById("bgimage");

const titleElement = document.getElementById('Titletext');
const fullTitle = "Rebecca's Cove_";
let currentText = 'R_';
let currentIndex = 1; // Start after 'R_'
let imagetype = "Not Selected"

function animateTitle() {
    if (currentIndex < fullTitle.length) {
        currentText = fullTitle.slice(0, currentIndex + 1) + '_';
        currentIndex++;
        titleElement.textContent = currentText;
        setTimeout(animateTitle, 300); // animation speed
    } else {
        titleElement.textContent = fullTitle;
    }
}

setTimeout(animateTitle, 300); // delay

let currentLinkIndex = 0;
let links = [];

// fetch file
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

// get links from the text
function extractLinks(text) {
    // Regular expression to match URLs
    const urlRegex = /https?:\/\/[^\s]+/g;
    return text.match(urlRegex);
}

// switch image to the next one
function switchImageSource() {
    const SwitchableImage = document.getElementById('SwitchableImage');
    if (links && links.length > 0) {
        SwitchableImage.src = links[currentLinkIndex];
        body.style.backgroundImage = `url(${links[currentLinkIndex]})`;

        SwitchableImage.onload = function() {
            console.clear()
            if (Switchableimage.naturalHeight === 768) {
                    Nextbutton.style.left = "-3%"
                        Backbutton.style.left = "-50%"
                            Switchableimage.style.width = "25vw"
                                Switchableimage.style.height = "70vh"
                    imagetype = "Portrait"
            } else if (Switchableimage.naturalWidth === 768) {
                    Nextbutton.style.left = "-0%"
                        Backbutton.style.left = "-53%"
                            Switchableimage.style.height = "65vh"
                                Switchableimage.style.width = "30vw"
                    imagetype = "Landscape"
            }
            console.log("Image Data: \n" + "Height: " + `${SwitchableImage.naturalHeight}` + "\n" + "Width: " + `${SwitchableImage.naturalWidth}` + "\n" + "Link: " + `${links[currentLinkIndex]}` + "\n" + "Position: " + currentLinkIndex + "\n" + "Image Type: " + `${imagetype}`)
            //ParsedImage.width = SwitchableImage.naturalWidth
            //ParsedImage.height = SwitchableImage.naturalHeight
        };
        
        currentLinkIndex = (currentLinkIndex + 1) % links.length; // Move to the next link
    } else {
        console.error('No valid links found to switch the image source.');
    }
}

function switchbackImageSource() {
    const SwitchableImage = document.getElementById('SwitchableImage');
    if (links && links.length > 0) {
        SwitchableImage.src = links[currentLinkIndex];
        body.style.backgroundImage = `url(${links[currentLinkIndex]})`;
        currentLinkIndex = (currentLinkIndex - 1) % links.length; // Move back one link
        console.log(currentLinkIndex)
    } else {
        console.error('No valid links found to switch the image source.');
    }
}

// Main function to fetch the file, extract links, and initialize the image source
async function main() {
    const filePath = './Assets/urllist.txt';
    const fileContent = await fetchLocalFile(filePath);
    if (fileContent) {
        links = extractLinks(fileContent);
        switchImageSource(); // Init the first image
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
    if (currentLinkIndex === undefined || currentLinkIndex < -0 || fetchLocalFile === false) {
    currentLinkIndex = 1;
    console.log("Mechanically perfect with only the flaw of believing, maybe we don't have enough dedication.")
    }
}

setInterval(Indexcheck, 100);

const Nextbutton = document.getElementById('nextImageButton')
const Backbutton = document.getElementById('beforeImageButton')

 /*let ParsedImage = {
    height: "",
    width: ""
 };*/
