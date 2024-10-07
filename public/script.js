const fileInput = document.getElementById('file');
const usernameInput = document.getElementById('username');
const convertBtn = document.getElementById('convert-btn');
const uploadForm = document.getElementById('upload-form');
const outputXML = document.getElementById('output-xml');
const dragBtn = document.getElementById('drag-btn');
const copyBtn = document.getElementById('copy-btn');
const enlargeShrinkBtn = document.getElementById('enlarge-btn');

// document.getElementById('uploadForm').reset();

copyBtn.addEventListener('click', () => copy(outputXML.getElementsByTagName('code')[0]));
enlargeShrinkBtn.onclick = () => toggleEnlargeShrink(outputXML);
dragBtn.addEventListener('click', () => dragElement(outputXML, dragBtn));

function copy(elem) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(elem.innerText)
            .then(() => {
                customAlert("Copied to clipboard!");
                console.log("Text copied to clipboard!");
            })
            .catch(err => {
                console.error("Failed to copy to clipboard:", err);
            });
    } else {
        const range = document.createRange();
        range.selectNodeContents(elem);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'successful' : 'unsuccessful';
            console.log(`Fallback: Copying text command was ${msg}`);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }

        selection.removeRange(range);
    }
}

let isEnlarged = false;

function toggleEnlargeShrink(elem) {
    if (isEnlarged) {
        elem.classList.remove('enlarge');
        elem.style.height = "unset";
        elem.style.width = "100%";
        dragBtn.classList.add('hidden');
        enlargeShrinkBtn.title = 'Enlarge';
        enlargeShrinkBtn.innerHTML = `<i class="fa-solid fa-up-right-and-down-left-from-center"></i>`;
        enlargeShrinkBtn.onclick = () => toggleEnlargeShrink(elem);
    } else {
        elem.classList.add('enlarge');
        elem.style.height = "60vh";
        elem.style.width = "55vw";
        dragBtn.classList.remove('hidden');
        enlargeShrinkBtn.title = 'Shrink';
        enlargeShrinkBtn.innerHTML = `<i class="fa-solid fa-down-left-and-up-right-to-center"></i>`;
        enlargeShrinkBtn.onclick = () => toggleEnlargeShrink(elem);
    }
    isEnlarged = !isEnlarged;
}

function dragElement(element, handle) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    handle.onmousedown = dragMouseDown;  // Attach dragging behavior to the handle only

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();

        // Get the initial mouse cursor position
        pos3 = e.clientX;
        pos4 = e.clientY;

        // Listen for mouse move and mouse release events
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        // Calculate how far the cursor has moved
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;

        // Update cursor position for the next iteration
        pos3 = e.clientX;
        pos4 = e.clientY;

        // Set the new position of the element
        element.style.top = Math.max(0, element.offsetTop - pos2) + "px";
        element.style.left = Math.max(0, element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // Stop the dragging once the mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function customAlert(message) {
    const alertBox = document.createElement('div');
    const Pmessage = document.createElement('p');
    Pmessage.innerText = message;
    alertBox.appendChild(Pmessage);
    alertBox.classList.add('alert');
    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}

// currently flawed functions and evemts

// function storeInputValue(username, file) {
//     localStorage.setItem('username', username);
//     localStorage.setItem('file', file);
// }
// storeInputValue(usernameInput.value, fileInput)

// // when entered key is pressed
// convertBtn.addEventListener('keyup', function(e) {
//     if (e.key === 'Enter') {
//         convertBtn.click();
//     }
// })

// convertBtn.addEventListener('click', function(e) {
//     e.preventDefault();

//     storeInputValue(usernameInput.value, fileInput.files[0]?.name);

//     convertBtn.setAttribute('disabled', true);
//     convertBtn.style.opacity = 0.5;
//     convertBtn.style.cursor = 'not-allowed';

//     setTimeout(() => {
//         localStorage.removeItem('username');
//         localStorage.removeItem('file');
//     }, 5000); 

//     let dotCount = 0;

//     const dotInterval = setInterval(() => {
//         if (dotCount === 4) {
//             dotCount = 0;
//         }
//         let dots = '.'.repeat(dotCount); 
//         dotCount++ 
//         convertBtn.innerText = `Converting${dots}`;
//     }, 250);

// });