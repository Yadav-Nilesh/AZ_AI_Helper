// const aihelpimgURL = chrome.runtime.getURL("assets/AIhelp.png");
// hhello nilesh
const codingDescContainerClass = "coding_nav_bg__HRkIn";

const observer = new MutationObserver(()=>{
  addAIHelpButton();
});

observer.observe(document.body, {childList:true, subtree: true});

addAIHelpButton();

function onProblemsPage(){
  return window.location.pathname.startsWith('/problems/');
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
  

  
  aiHelpButton.addEventListener("click", function () {
    alert("AI Help Chat bot will open here...");
  });

  const codingDescContainer = document.getElementsByClassName(codingDescContainerClass)[0];
  codingDescContainer.insertAdjacentElement("beforeend", aiHelpButton);
};
