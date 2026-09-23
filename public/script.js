const chatArea = document.getElementById("chatArea");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

const typing = document.getElementById("typing");
const welcome = document.getElementById("welcome");

const clearBtn = document.getElementById("clearBtn");
const newChatBtn = document.getElementById("newChatBtn");
const menuBtn = document.getElementById("menuBtn");

const chatTitle = document.getElementById("chatTitle");
const chatSubtitle = document.getElementById("chatSubtitle");
const modeLabel = document.getElementById("modeLabel");

const modes = document.querySelectorAll(".mode");
const suggestions = document.querySelectorAll(".suggestion");

let currentMode = "basic";


// ==========================================
// MODE SWITCH
// ==========================================

modes.forEach(mode => {

    mode.addEventListener("click", () => {

        modes.forEach(item => {
            item.classList.remove("active");
        });

        mode.classList.add("active");

        currentMode = mode.dataset.mode;

        if (currentMode === "basic") {

            chatTitle.textContent = "Basic Chat";

            chatSubtitle.textContent =
                "General purpose AI assistant";

            modeLabel.textContent = "Basic Chat";

        } else {

            chatTitle.textContent = "RAG Chat";

            chatSubtitle.textContent =
                "Chat using your knowledge document";

            modeLabel.textContent = "RAG Chat";
        }

    });

});


// ==========================================
// SEND MESSAGE
// ==========================================

sendBtn.addEventListener("click", sendMessage);


messageInput.addEventListener("keydown", event => {

    if (
        event.key === "Enter" &&
        !event.shiftKey
    ) {

        event.preventDefault();

        sendMessage();
    }

});


// ==========================================
// AUTO RESIZE TEXTAREA
// ==========================================

messageInput.addEventListener("input", () => {

    messageInput.style.height = "auto";

    messageInput.style.height =
        Math.min(messageInput.scrollHeight, 130) + "px";

});


// ==========================================
// SEND FUNCTION
// ==========================================

async function sendMessage() {

    const text = messageInput.value.trim();

    if (!text) {
        return;
    }

    welcome.style.display = "none";

    addMessage("You", text, "user");

    messageInput.value = "";
    messageInput.style.height = "auto";

    typing.style.display = "flex";

    sendBtn.disabled = true;

    scrollBottom();


    /*
        ============================================
        CONNECT YOUR BACKEND HERE
        ============================================

        Example:

        const response = await fetch("/api/chat", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: text,
                mode: currentMode
            })
        });

        const data = await response.json();

        addMessage("Groq", data.reply, "bot");


        IMPORTANT:
        Groq API key frontend JS mein mat rakhein.
        API key backend/.env mein honi chahiye.
    */


    // Demo response
    await fakeResponse(text);

    typing.style.display = "none";

    sendBtn.disabled = false;

    scrollBottom();
}


// ==========================================
// DEMO RESPONSE
// ==========================================

function fakeResponse(question) {

    return new Promise(resolve => {

        setTimeout(() => {

            let answer;

            if (currentMode === "rag") {

                answer =
                    "RAG Chat mode selected.\n\n" +
                    "Your knowledge.txt document would be " +
                    "used here to generate an answer based only " +
                    "on your provided knowledge.";

            } else {

                answer =
                    "Hello! 👋\n\n" +
                    `You asked: "${question}"\n\n` +
                    "This is the frontend UI demo. " +
                    "Connect your Python/Groq backend to " +
                    "receive real AI responses.";

            }

            addMessage("Groq", answer, "bot");

            resolve();

        }, 1200);

    });

}


// ==========================================
// ADD MESSAGE
// ==========================================

function addMessage(name, text, type) {

    const message = document.createElement("div");

    message.className = "message";

    const avatarClass =
        type === "user"
            ? "user-avatar"
            : "bot-avatar";

    const avatar =
        type === "user"
            ? "U"
            : "G";

    message.innerHTML = `
        <div class="avatar ${avatarClass}">
            ${avatar}
        </div>

        <div class="message-body">

            <div class="message-name">
                ${name}
            </div>

            <div class="message-text"></div>

        </div>
    `;

    message
        .querySelector(".message-text")
        .textContent = text;

    chatArea.appendChild(message);

    scrollBottom();
}


// ==========================================
// CLEAR CHAT
// ==========================================

function clearChat() {

    const messages =
        chatArea.querySelectorAll(".message");

    messages.forEach(message => {
        message.remove();
    });

    welcome.style.display = "block";
}


// ==========================================
// NEW CHAT
// ==========================================

newChatBtn.addEventListener("click", () => {

    clearChat();

    messageInput.focus();

    document
        .querySelector(".sidebar")
        .classList.remove("show");

});

clearBtn.addEventListener("click", clearChat);


// ==========================================
// MOBILE MENU
// ==========================================

menuBtn.addEventListener("click", () => {

    document
        .querySelector(".sidebar")
        .classList.toggle("show");

});


// ==========================================
// SUGGESTIONS
// ==========================================

suggestions.forEach(button => {

    button.addEventListener("click", () => {

        messageInput.value =
            button.textContent.trim();

        messageInput.dispatchEvent(
            new Event("input")
        );

        messageInput.focus();

    });

});


// ==========================================
// SCROLL
// ==========================================

function scrollBottom() {

    setTimeout(() => {

        chatArea.scrollTo({
            top: chatArea.scrollHeight,
            behavior: "smooth"
        });

    }, 50);

}