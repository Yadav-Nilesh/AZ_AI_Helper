// const aihelpimgURL = chrome.runtime.getURL("assets/AIhelp.png");
// hellooo

// Dynamically inject Highlight.js CSS for Solarized Dark theme
const highlightCss = document.createElement("link");
highlightCss.rel = "stylesheet";
highlightCss.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/solarized-dark.min.css"; // Solarized Dark theme
document.head.appendChild(highlightCss);

// Dynamically inject Highlight.js JavaScript
const highlightJs = document.createElement("script");
highlightJs.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js";
highlightJs.defer = true;
highlightJs.onload = () => {
  console.log("Highlight.js loaded");
  // Apply syntax highlighting after the library is loaded
  highlightAllCodeBlocks();
};

// Append the script to the document
document.head.appendChild(highlightJs);

// Function to highlight all code blocks in the chat
function highlightAllCodeBlocks() {
  const codeBlocks = document.querySelectorAll('pre code');
  codeBlocks.forEach((block) => {
    hljs.highlightElement(block);
  });
}

// Function to send the message and format the bot's response
async function sendMessage() {
  const chatInput = document.getElementById("ai-chat-input");
  const chatMessages = document.getElementById("chat-messages");

  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  const senderContainer = document.createElement("div");
  senderContainer.style.display = "flex";
  senderContainer.style.justifyContent = "flex-end";
  senderContainer.style.alignItems = "center";
  senderContainer.style.marginBottom = "10px";

  // Create user message element
  const userMessageElement = document.createElement("div");
  userMessageElement.style.cssText = `
        max-width: 70%;
        font-size: 15px;
        background-color: #DDF6FF;
        color: black;
        padding: 6px 10px;
        border-radius: 22px 0px 22px 22px;
        word-wrap: break-word;
    `;

  userMessageElement.innerText = userMessage;
  const senderIcon = document.createElement("img");
  senderIcon.src = "https://cdn-icons-png.flaticon.com/512/16683/16683419.png";
  senderIcon.alt = "Sender Icon";
  senderIcon.style.width = "30px";
  senderIcon.style.height = "30px";
  senderIcon.style.borderRadius = "50%";
  senderIcon.style.marginLeft = "8px";
  
  senderContainer.appendChild(userMessageElement);
  senderContainer.appendChild(senderIcon);

  chatMessages.appendChild(senderContainer);

  chatInput.value = "";

  // Get bot reply (API call)
  const botReply = await sendMessageToAPI(userMessage);

  // Create bot message element
  const botContainer = document.createElement("div");
  botContainer.style.display = "flex";
  botContainer.style.justifyContent = "flex-start";
  botContainer.style.alignItems = "center";
  botContainer.style.marginBottom = "10px";

  const botIcon = document.createElement("img");
  botIcon.src = "https://cdn-icons-png.flaticon.com/512/1786/1786548.png";
  botIcon.alt = "Bot Icon";
  botIcon.style.width = "30px";
  botIcon.style.height = "30px";
  botIcon.style.borderRadius = "50%";
  botIcon.style.marginRight = "8px";

   const botMessageElement = document.createElement("div");
    botMessageElement.style.maxWidth = "70%";
    botMessageElement.style.fontSize = "15px";
    botMessageElement.style.backgroundColor = "#f1f0f0";
    botMessageElement.style.color = "#333";
    botMessageElement.style.padding = "6px 10px";
    botMessageElement.style.borderRadius = "0px 22px 22px 22px";
    botMessageElement.style.wordWrap = "break-word";


 


  // Check if the bot's reply contains code (code block starts with ``` and ends with ``` )
  if (botReply.includes("```")) {
    const codeBlock = botReply.match(/```([\s\S]*?)```/)[1]; // Extract code between backticks
    const preElement = document.createElement("pre");
    const codeElement = document.createElement("code");

    // Set the code content inside the <code> element
    codeElement.textContent = codeBlock;

    // Append the code element inside the <pre> tag
    preElement.appendChild(codeElement);

    // Add some styling for the code block
    preElement.style.overflowX = "auto"; // Enable horizontal scrolling for long code lines
    preElement.style.padding = "10px"; // Padding to make it look neat
    preElement.style.borderRadius = "6px"; // Rounded corners for the code block
    preElement.style.backgroundColor = "#2E3B4E"; // Dark background with contrast for visibility
    preElement.style.color = "#f8f8f2"; // Light text color for readability
    preElement.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"; // Shadow effect
    preElement.style.margin = "10px 0"; // Add margin around the code block
    preElement.style.fontFamily = "'Courier New', monospace"; // Monospace font for code

    // Append the styled code block to the bot message element
    botMessageElement.appendChild(preElement);

    // Apply syntax highlighting after appending the code block to the DOM
    highlightAllCodeBlocks();
  } else {
    // If no code block, just display the regular bot reply
    botMessageElement.innerText = botReply;
  }

  botContainer.appendChild(botIcon);
  botContainer.appendChild(botMessageElement);

  setTimeout(() => {
    chatMessages.appendChild(botContainer);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1000);

  // Append the bot message to the chat
  chatMessages.scrollTop = chatMessages.scrollHeight;

}




/********************************************************************************************* */

const problemDataMap = new Map();


const codingDescContainerClass = "coding_nav_bg__HRkIn";

let lastPageVisited = "";
const observer = new MutationObserver(()=>{
  handleContentChange();
});

observer.observe(document.body, {childList:true, subtree: true});

handleContentChange();

function handleContentChange(){
  if(isPageChange()) handlePageChange();
}

function isPageChange(){
  const currentPage = window.location.pathname;
  if(currentPage=== lastPageVisited) return false;
  lastPageVisited= currentPage;
  return true;
}


//inject.js
window.addEventListener("xhrDataFetched", (event)=>{
  const data = event.detail;
  if(data.url && data.url.match(/https:\/\/api2\.maang\.in\/problems\/user\/\d+/)){
    const isMatch = data.url.match(/\/(\d+)$/);
    if(isMatch){
      const id = isMatch[1];
      problemDataMap.set(id, data.response);
      console.log("id...", id);
      console.log(data.response);
    }
  }
});

// adding inject.js
function addInjectScript(){
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("inject.js");
  document.documentElement.insertAdjacentElement("afterbegin",script);
  script.remove();
}
addInjectScript();

function handlePageChange(){
  if(onProblemsPage()){
    cleanUpPage();
    console.log("hellooo!!");
    addInjectScript();
    addAIHelpButton();
  }
}

function cleanUpPage(){
  const existingButton = document.getElementById("ai-help-button");
  if(existingButton) existingButton.remove();

  const existingChatContainer = document.getElementById("ai-chat-container");
  if(existingChatContainer) existingChatContainer.remove();
}


function onProblemsPage(){
     const pathname = window.location.pathname;
     return pathname.startsWith("/problems/") && pathname.length > "/problems/".length;
}




 function addAIHelpButton() {

  if(!onProblemsPage() || document.getElementById("ai-help-button")) return;
  const aiHelpButton = document.createElement("button");
  aiHelpButton.innerText = "AI Help";
  aiHelpButton.id = "ai-help-button";

  aiHelpButton.style.zIndex = "1000";
  aiHelpButton.style.marginLeft = "10px";
  aiHelpButton.style.padding = " 0.36rem 1rem";
  aiHelpButton.style.background = "transparent";
  aiHelpButton.style.color = "#000000";
  aiHelpButton.style.border = "none";
  aiHelpButton.style.borderRadius = "5px";
  aiHelpButton.style.cursor = "pointer";
  aiHelpButton.style.fontSize = "14px";
  



  let isChatboxOpen = false;

  // Function to handle the opening and closing of the chatbox
  function handleChatOpenButtonClick() {

    const problemName = document.getElementsByClassName("problem_heading").innerText;
    
    const chatPopup = document.getElementById("ai-chat-container");
    
    // If the chatbox is already open, close it
    if (isChatboxOpen) {
      chatPopup.style.display = "none"; // Hide the chatbox
      aiHelpButton.style.background = "transparent"; // Set button background to transparent
      isChatboxOpen = false;
    } else {
      // If the chatbox is closed, open it
      chatPopup.style.display = "block"; // Show the chatbox
      aiHelpButton.style.background = "white"; // Set button background to white
      isChatboxOpen = true;
    }
  }
  
  // Event listener for clicking the button to toggle chatbox
  aiHelpButton.addEventListener("click", handleChatOpenButtonClick);
  
  // Hover effect to change background to white when hovered over
  aiHelpButton.addEventListener("mouseover", function() {
    if (!isChatboxOpen) {
      aiHelpButton.style.background = "white"; // Change to white on hover when chatbox is closed
    }
  });
  
  // Revert background to transparent when mouseout
  aiHelpButton.addEventListener("mouseout", function() {
    if (!isChatboxOpen) {
      aiHelpButton.style.background = "transparent"; // Revert to transparent when not hovered and chatbox is closed
    }
  });


  


aiHelpButton.addEventListener("click",   handleButtonClick);

let isChatOpen = false;
let chatPopup = null;
let chatContent = null;

function handleButtonClick() {
  if (isChatOpen) {
    closeChatPopup();
    return;
  }

  chatPopup = document.createElement("div");
  chatPopup.id = "ai-chat-container"; // Updated ID
  chatPopup.style.position = "fixed";
  chatPopup.style.bottom = "20px";
  chatPopup.style.right = "20px";
  chatPopup.style.width = "440px";
  chatPopup.style.height = "550px";
  chatPopup.style.backgroundColor = "#fff";
  chatPopup.style.border = "1px solid #ccc";
  chatPopup.style.borderRadius = "20px";
  chatPopup.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
  chatPopup.style.zIndex = "1000";
  chatPopup.style.overflow = "hidden";
  chatPopup.style.display = "flex";
  chatPopup.style.flexDirection = "column";
  chatPopup.style.transform = "scale(0)";
  chatPopup.style.transition = "transform 0.3s ease-in-out";

  // Create header with close button
  const header = document.createElement("div");
  header.style.backgroundColor = "#fff";
  header.style.color = "black";
  header.style.padding = "10px";
  header.style.textAlign = "center";
  header.style.position = "relative";
  header.style.fontFamily = "'Rubik', sans-serif";
  header.style.fontWeight = "bold";
  header.innerText = "AI Chatbot";

  const closeButton = document.createElement("img");
  closeButton.style.position = "absolute";
  closeButton.style.top = "14px";
  closeButton.style.right = "17px";
  closeButton.style.cursor = "pointer";
  closeButton.style.width = "16px";
  closeButton.style.height = "16px";
  closeButton.src = "https://cdn-icons-png.flaticon.com/512/1828/1828778.png";
  closeButton.alt = "Close";
  

  closeButton.addEventListener("click", closeChatPopup);
  header.appendChild(closeButton);

  // Create content area
  chatContent = document.createElement("div");
  chatContent.id = "chat-messages";
  chatContent.style.flex = "1";
  chatContent.style.padding = "10px";
  chatContent.style.overflowY = "auto";
  chatContent.style.display = "flex";
  chatContent.style.flexDirection = "column";
  chatContent.style.gap = "10px";
  chatContent.style.backgroundColor = "#ffffff";  // Fallback color
  chatContent.style.backgroundImage = "linear-gradient(45deg, rgb(253, 256, 250) 41%, rgb(209, 228, 241) 100%)";


  // Create message input field and send button
const messageInput = document.createElement("input");
messageInput.id = "ai-chat-input";
messageInput.type = "text";
messageInput.placeholder = "Type your message...";
messageInput.style.padding = "0px 5px 5px";
messageInput.style.width = "82%";
messageInput.style.margin = "10px";
messageInput.style.border = "none"; 
messageInput.style.borderRadius = "0px";
messageInput.style.outline = "none"; 

// Ensure the border stays red even on focus and blur
messageInput.addEventListener("focus", function() {
  messageInput.style.borderBottom = "2px solid #168aad"; 
});

messageInput.addEventListener("blur", function() {
  messageInput.style.borderBottom = "none"; 
});



  // Create the send arrow button
  const sendButton = document.createElement("img");
  sendButton.src = "https://cdn-icons-png.flaticon.com/512/3024/3024593.png"; // Example arrow image URL
  sendButton.alt = "Send";
  sendButton.style.width = "25px"; // Adjust size as needed
  sendButton.style.height = "25px";
  sendButton.style.cursor = "pointer";
  sendButton.style.marginTop = "10px";
  sendButton.style.marginRight = "13px";
  sendButton.style.borderRadius = "5px";
  sendButton.style.backgroundColor = "transparent"; // Optional background color
  sendButton.style.border = "none";

// Add click event listener
sendButton.addEventListener("click", sendMessage);

// Enter key to send message
messageInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});


  const footer = document.createElement("div");
  footer.style.padding = "10px";
  footer.style.display = "flex";
  footer.style.justifyContent = "space-between";
  footer.appendChild(messageInput);
  footer.appendChild(sendButton);

  // Append elements to the chatbox
  chatPopup.appendChild(header);
  chatPopup.appendChild(chatContent);
  chatPopup.appendChild(footer);

  // Append the chatbox to the body
  document.body.appendChild(chatPopup);

  // Animate chatbox opening
  setTimeout(() => {
    chatPopup.style.transform = "scale(1)";
  }, 50);

  // Close the chatbox if clicked outside
  setTimeout(() => {
    document.addEventListener("click", closeOnClickOutside);
  }, 300);

  // Make the chatbox draggable
  let isDragging = false;
  let offsetX, offsetY;

  header.addEventListener("mousedown", function (e) {
    isDragging = true;
    offsetX = e.clientX - chatPopup.offsetLeft;
    offsetY = e.clientY - chatPopup.offsetTop;
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", function () {
      isDragging = false;
      document.removeEventListener("mousemove", drag);
    });

    function drag(e) {
      if (isDragging) {
        chatPopup.style.left = `${e.clientX - offsetX}px`;
        chatPopup.style.top = `${e.clientY - offsetY}px`;
      }
    }
  });

  // Resizable functionality (with cursor changes) from the corners
  makeResizable(chatPopup);

  // Set the chatbox as open
  isChatOpen = true;
}

function closeChatPopup() {
  document.removeEventListener("click", closeOnClickOutside);
  chatPopup.style.transform = "scale(0)";
  setTimeout(() => {
    if (chatPopup) {
      chatPopup.remove();
      isChatOpen = false;
    }
  }, 300);
}

function closeOnClickOutside(e) {
  if (!chatPopup.contains(e.target) && isChatOpen) {
    closeChatPopup();
  }
}

// async function sendMessage() {
//     const chatinput = document.getElementById("ai-chat-input");
//     const chatMessages = document.getElementById("chat-messages");

//     const userMessage = chatinput.value.trim();
//     if(!userMessage) return;

//     const userMessageElement = document.createElement("div");
//     userMessageElement.style.cssText = `
//         max-width: 100%;
//         font-size: 15px;
//         background-color: #DDF6FF;
//         color: black;
//         padding: 4px 10px;
//         border-radius: 6px;
//         align-self: flex-end;
//         word-wrap: break-word;
//     `;
//     userMessageElement.innerText = userMessage;
//     chatMessages.appendChild(userMessageElement);

//     chatinput.value = "";

//     const botreply = await sendMessageToAPI(userMessage);

//     const botMessageElement = document.createElement("div");
//     botMessageElement.style.cssText = `
//       max-width: 100%;
//       font-size: 15px;
//       background-color: #f1f0f0;
//       color: #333;
//       padding: 4px 10px;
//       border-radius: 6px;
//       align-self: flex-start;
//       word-wrap: break-word;
//     `;


//     botMessageElement.innerText = botreply;
//     chatMessages.appendChild(botMessageElement);
// }


function makeResizable(element) {
  const corners = [
    { cursor: "nwse-resize", edge: "top-left" },
    { cursor: "nwse-resize", edge: "top-right" },
    { cursor: "nwse-resize", edge: "bottom-left" },
    { cursor: "nwse-resize", edge: "bottom-right" },
  ];

  corners.forEach(corner => {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style[corner.edge.includes("top") ? "top" : "bottom"] = "0";
    div.style[corner.edge.includes("left") ? "left" : "right"] = "0";
    div.style.width = "10px";
    div.style.height = "10px";
    div.style.cursor = corner.cursor;
    div.addEventListener("mousedown", startResize);
    element.appendChild(div);
  });


  function startResize(e) {
    e.preventDefault();

    const corner = e.target;
    const initialWidth = element.offsetWidth;
    const initialHeight = element.offsetHeight;
    const initialMouseX = e.clientX;
    const initialMouseY = e.clientY;

    function onMouseMove(e) {
      if (corner.style.cursor === "nwse-resize") {
        const deltaX = e.clientX - initialMouseX;
        const deltaY = e.clientY - initialMouseY;
        const newSize = Math.max(initialWidth + deltaX, initialHeight + deltaY); // Ensure square resizing
        element.style.width = `${newSize}px`;
        element.style.height = `${newSize}px`;
      }
    }

    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }
}

  const codingDescContainer = document.getElementsByClassName(codingDescContainerClass)[0];
  codingDescContainer.insertAdjacentElement("beforeend", aiHelpButton);
};





async function sendMessageToAPI(userMessage) {
  const apiKey = "AIzaSyBtyfsVefSR-TtRGvPabICw5elXSfFxJBw";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const requestData = {
    contents: [
      {
        parts: [
          { text: userMessage }
        ]
      }
    ]
  };

  try {
    // Make the API call
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    // Parse the JSON response
    const data = await response.json();

    // Extract the AI's response message
    if (data.candidates && data.candidates.length > 0) {
      const aiResponse = data.candidates[0].content.parts[0].text;
      // console.log(aiResponse);  
      return aiResponse;
    } else {
      throw new Error("No response from AI");
    }
  } catch (error) {
    console.error("Error calling AI API:", error);
    return "An error occurred while communicating with the AI.";
  }
}


