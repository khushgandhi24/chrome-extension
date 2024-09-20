// document.addEventListener("", function() {
//     const content = document.querySelector("#content");
//     if (content) {
//         const contentParent = content.parentNode;
//         const focusImage = document.createElement("img");
//         focusImage.src = chrome.runtime.getURL("/images/focus1.png");
//         focusImage.width = "500";
//         focusImage.height = "500";
//         contentParent.prepend(focusImage);
//         contentParent.removeChild(content);
//     } else {
//         console.error("Element with ID 'content' not found.");
//     }
// });
function getRandomID(arr) {
    return Math.floor(Math.random() * (arr.length - 1));
}

function clickHandler() {
    const body = document.querySelector("body");
    body.addEventListener("click", () => {
        alert("No use clicking, get back to work!");
    });
}

async function addContentID() { 
    const response = await fetch("https://picsum.photos/list");
    const data = await response.json();
    const randomID = getRandomID(data);
    return data[randomID]["id"];
}


async function replaceContent() {
    clickHandler();
    const imageID = await addContentID();
    const content = document.querySelector("#content");
    const contentParent = content.parentNode;
    const focusImage = document.createElement("img");
    const focusText = document.createElement("div");
    focusText.innerHTML = `
        <h1>Do Not | There is no Try</h1>
    `;
    focusText.style.cssText = 'color: white; padding:0 20px 0 0;';
    // focusImage.src = chrome.runtime.getURL(`https://picsum.photos/id/${imageID}/1200/800`);
    focusImage.src = `https://picsum.photos/id/${imageID}/1200/800`;
    focusImage.addEventListener("click", async (event) => {
        const newID = await addContentID();
        event.target.src = `https://picsum.photos/id/${newID}/1200/800`;
    })
    contentParent.prepend(focusText);
    contentParent.prepend(focusImage);
    contentParent.removeChild(content);
}

const observer = new MutationObserver((mutations, obs) => {
    const content = document.querySelector("#content");
    if (content) {
        replaceContent();
        obs.disconnect();
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});