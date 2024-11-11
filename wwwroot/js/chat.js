document.addEventListener("DOMContentLoaded", function () {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("/chatHub")
        .build();

    connection.on("ReceiveMessage", function (user, message) {
        const time = new Date().toLocaleTimeString();
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");

        const messageContent = document.createElement("p");
        messageContent.innerHTML = `<strong>${user}</strong>: ${message} <span class="timestamp">${time}</span>`;
        
        messageElement.appendChild(messageContent);
        document.getElementById("messagesList").appendChild(messageElement);

        // Auto-scroll to the bottom of the chat
        document.getElementById("messagesList").scrollTop = document.getElementById("messagesList").scrollHeight;
    });

    connection.start().catch(function (err) {
        return console.error(err.toString());
    });

    const sendButton = document.getElementById("sendButton");
    const userInput = document.getElementById("userInput");
    const messageInput = document.getElementById("messageInput");

    if (sendButton && userInput && messageInput) {
        sendButton.addEventListener("click", function (event) {
            const user = userInput.value;
            const message = messageInput.value;
            connection.invoke("SendMessage", user, message).catch(function (err) {
                return console.error(err.toString());
            });
            messageInput.value = ''; // Clear message input
            event.preventDefault();
        });
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    const sendButton = document.getElementById('sendButton');
    sendButton.addEventListener('click', sendMessage);
});