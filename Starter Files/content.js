// const aihelpimgURL = chrome.runtime.getURL("assets/AIhelp.png");
// hellooo
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

function handlePageChange(){
  if(onProblemsPage()){
    cleanUpPage();
    // add inject script;
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

  if(!onProblemsPage() || document.getElementById("ai-help-button")) return ;
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
  function handleButtonClick() {
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
  aiHelpButton.addEventListener("click", handleButtonClick);
  
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

  //#DDF6FF
  





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
header.style.fontFamily = "'Rubik', sans-serif"; // Added Rubik font family
header.style.fontWeight = "bold"; // Added bold weight
header.innerText = "AI Chatbot";

const closeButton = document.createElement("img"); // Use an image for the close button
closeButton.style.position = "absolute";
closeButton.style.top = "14px";
closeButton.style.right = "17px";
closeButton.style.cursor = "pointer";
closeButton.style.width = "16px"; // Adjust size as needed
closeButton.style.height = "16px"; // Adjust size as needed
closeButton.src = "https://cdn-icons-png.flaticon.com/512/1828/1828778.png"; // Close icon URL from Flaticon
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

  // chatContent.style.border = "1px solid black";

  // Create message input field and send button
  const messageInput = document.createElement("input");
messageInput.type = "text";
messageInput.placeholder = "Type your message...";
messageInput.style.padding = "0px 5px 5px";
messageInput.style.width = "82%";
messageInput.style.margin = "10px";
messageInput.style.border = "none"; // Set border to red initially
messageInput.style.borderRadius = "0px";
messageInput.style.outline = "none"; // Remove default focus outline

// Ensure the border stays red even on focus and blur
messageInput.addEventListener("focus", function() {
  messageInput.style.borderBottom = "2px solid #168aad"; // Keep it red on focus
});

messageInput.addEventListener("blur", function() {
  messageInput.style.borderBottom = "2px solid #168aad"; // Keep it red on blur
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

function sendMessage() {
  const messageInput = document.querySelector('input[type="text"]');
  const message = messageInput.value.trim();

  if (message) {
    // Create container for sender message and icon
    const senderContainer = document.createElement("div");
    senderContainer.style.display = "flex";
    senderContainer.style.justifyContent = "flex-end";
    senderContainer.style.alignItems = "center";
    senderContainer.style.marginBottom = "10px";

    // Sender message bubble
    const senderMessage = document.createElement("div");
    senderMessage.style.maxWidth = "70%";
    senderMessage.style.fontSize = "15px";
    senderMessage.style.backgroundColor = "#DDF6FF";
    senderMessage.style.color = "black";
    senderMessage.style.padding = "6px 10px";
    senderMessage.style.borderRadius = "22px 0px 22px 22px";
    senderMessage.style.wordWrap = "break-word";
    senderMessage.innerText = message;

    // Sender icon
    const senderIcon = document.createElement("img");
    senderIcon.src = "https://cdn-icons-png.flaticon.com/512/16683/16683419.png"; // Example user icon
    senderIcon.alt = "Sender Icon";
    senderIcon.style.width = "30px";
    senderIcon.style.height = "30px";
    senderIcon.style.borderRadius = "50%";
    senderIcon.style.marginLeft = "8px";

    // Append sender message and icon to container
    senderContainer.appendChild(senderMessage);
    senderContainer.appendChild(senderIcon);

    // Add sender container to chat content
    chatContent.appendChild(senderContainer);

    // Clear input field
    messageInput.value = "";

    // Create container for bot response and icon
    const botContainer = document.createElement("div");
    botContainer.style.display = "flex";
    botContainer.style.justifyContent = "flex-start";
    botContainer.style.alignItems = "center";
    botContainer.style.marginBottom = "10px";

    // Bot icon
    const botIcon = document.createElement("img");
    botIcon.src = "https://cdn-icons-png.flaticon.com/512/1786/1786548.png"; // Example bot icon
    botIcon.alt = "Bot Icon";
    botIcon.style.width = "30px";
    botIcon.style.height = "30px";
    botIcon.style.borderRadius = "50%";
    botIcon.style.marginRight = "8px";

    // Bot response bubble
    const botMessage = document.createElement("div");
    botMessage.style.maxWidth = "70%";
    botMessage.style.fontSize = "15px";
    botMessage.style.backgroundColor = "#f1f0f0";
    botMessage.style.color = "#333";
    botMessage.style.padding = "6px 10px";
    botMessage.style.borderRadius = "0px 22px 22px 22px";
    botMessage.style.wordWrap = "break-word";
    botMessage.innerText = "Thanks for your message!";

    // Append bot icon and message to container
    botContainer.appendChild(botIcon);
    botContainer.appendChild(botMessage);

    // Add bot response after a delay
    setTimeout(() => {
      chatContent.appendChild(botContainer);
      chatContent.scrollTop = chatContent.scrollHeight;
    }, 1000);

    // Ensure the chat scrolls to the bottom
    chatContent.scrollTop = chatContent.scrollHeight;
  }
}


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
