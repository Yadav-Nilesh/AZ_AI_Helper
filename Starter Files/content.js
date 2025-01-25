// const aihelpimgURL = chrome.runtime.getURL("assets/AIhelp.png");
// hii
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
  chatPopup.style.width = "350px";
  chatPopup.style.height = "450px";
  chatPopup.style.backgroundColor = "#fff";
  chatPopup.style.border = "1px solid #ccc";
  chatPopup.style.borderRadius = "10px";
  chatPopup.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
  chatPopup.style.zIndex = "1000";
  chatPopup.style.overflow = "hidden";
  chatPopup.style.display = "flex";
  chatPopup.style.flexDirection = "column";
  chatPopup.style.transform = "scale(0)";
  chatPopup.style.transition = "transform 0.3s ease-in-out";

  // Create header with close button
  const header = document.createElement("div");
  header.style.backgroundColor = "#DDF6FF";
  header.style.color = "black";
  header.style.padding = "10px";
  header.style.textAlign = "center";
  header.style.position = "relative";
  header.innerText = "AI Chatbot";
  const closeButton = document.createElement("span");
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.cursor = "pointer";
  closeButton.style.fontWeight = "bold";
  closeButton.innerText = "X";
  closeButton.addEventListener("click", closeChatPopup);
  header.appendChild(closeButton);

  // Create content area
  chatContent = document.createElement("div");
  chatContent.style.flex = "1";
  chatContent.style.padding = "10px";
  chatContent.style.overflowY = "auto";
  chatContent.style.display = "flex";
  chatContent.style.flexDirection = "column";
  chatContent.style.gap = "10px";

  // Create message input field and send button
  const messageInput = document.createElement("input");
messageInput.type = "text";
messageInput.placeholder = "Type your message...";
messageInput.style.padding = "10px 15px";
messageInput.style.width = "80%";
messageInput.style.margin = "10px";
messageInput.style.border = "2px solid #DDF6FF"; // Set border to red initially
messageInput.style.borderRadius = "10px";
messageInput.style.outline = "none"; // Remove default focus outline

// Ensure the border stays red even on focus and blur
messageInput.addEventListener("focus", function() {
  messageInput.style.border = "2px solid #168aad"; // Keep it red on focus
});

messageInput.addEventListener("blur", function() {
  messageInput.style.border = "2px solid #168aad"; // Keep it red on blur
});



  // Create the send arrow button
const sendButton = document.createElement("img");
sendButton.src = "https://cdn-icons-png.flaticon.com/512/9131/9131510.png"; // Example arrow image URL
sendButton.alt = "Send";
sendButton.style.width = "20px"; // Adjust size as needed
sendButton.style.height = "20px";
sendButton.style.cursor = "pointer";
sendButton.style.margin = "10px";
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
    const senderMessage = document.createElement("div");
    senderMessage.style.maxWidth = "100%";
    senderMessage.style.fontSize = "15px";
    senderMessage.style.backgroundColor = "#DDF6FF";
    senderMessage.style.color = "black";
    senderMessage.style.padding = "4px 10px";
    senderMessage.style.borderRadius = "6px";
    senderMessage.style.alignSelf = "flex-end";
    senderMessage.style.wordWrap = "break-word";
    senderMessage.innerText = message;
    chatContent.appendChild(senderMessage);

    const receiverMessage = document.createElement("div");
    receiverMessage.style.maxWidth = "100%";
    receiverMessage.style.fontSize = "15px";
    receiverMessage.style.backgroundColor = "#f1f0f0";
    receiverMessage.style.color = "#333";
    receiverMessage.style.padding = "4px 10px";
    receiverMessage.style.borderRadius = "6px";
    receiverMessage.style.alignSelf = "flex-start";
    receiverMessage.style.wordWrap = "break-word";
    receiverMessage.innerText = "Thanks for your message!";
    setTimeout(() => {
      chatContent.appendChild(receiverMessage);
      chatContent.scrollTop = chatContent.scrollHeight;
    }, 1000);

    messageInput.value = "";
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
