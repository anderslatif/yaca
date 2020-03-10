(function() {
    let myText = "";
    const allowedTextLength = 100; // don't bother, the backend checks as well

    const messages = [];

    const productionAddress = 'http://yaca.live';
    const devAddress = 'http://localhost:3000';

    const socket = io.connect(productionAddress);

    socket.on("server_message", data => {
        messages.push(data);
    });

    $(document).on('keydown', function(event) {
        if (event.key.toUpperCase() === 'BACKSPACE') {
            event.preventDefault();
            myText = myText.slice(0, -1);
        } else if (event.key.toUpperCase() === 'SHIFT') {

        } else if (event.key.toUpperCase() === 'META') {

        } else if (event.key.toUpperCase() === 'ENTER') {
            sendMessage(myText);
        } else {
            if (myText.length <= allowedTextLength) {
                myText += event.key;
            } else {
                sendMessage(myText);
            }
        }
    });

    function sendMessage() {
        socket.emit('client_message', { message: myText });
        myText = "";
    }

    function leftClickMessage(event) {
        const socketId = event.target.getAttribute("data-value");
        const uniqueId = event.target.id;
        clickMessage(uniqueId, socketId, 1);
    }

    function clickMessage(uniqueId, socketId, likeScore) {
        socket.emit('message_liked', { socketId, likeScore });
        updateEmoji(uniqueId, likeScore);
    }

    function updateEmoji(socketId, likeScore) {
        const message = messages.find(message => message.uniqueId === socketId);
        message.emoji = likeScore === 1 ? "❤️" : "😡";
        message.emojiOpacity = 100;
        message.likeScore = likeScore;
    }

    setInterval(function() {
        const canvasDiv = $('#canvas');

        messages.forEach((message, index, list) => {
            if (!message.isDisplayed) {
                message.isDisplayed = true;

                const messageDiv = `<div
                                    id=${message.uniqueId}
                                    data-value="${message.socketId}"
                                    class="message"
                                    style="
                                        position: absolute;
                                        top: ${message.y}%;
                                        left: ${message.x}%;
                                        font-size: ${message.fontSize}em;
                                    "
                                  >${message.message}</div>`;
                canvasDiv.prepend(messageDiv);

                document.getElementById(message.uniqueId).addEventListener("click", leftClickMessage, false);

                $('.message').bind("contextmenu", function(event) {
                    const socketId = event.target.getAttribute("data-value");
                    const uniqueId = event.target.id;
                    clickMessage(uniqueId, socketId, -1);
                    return false;
                });
            } else if (message.toDelete) {
                list.splice(index, 1);
            }
        });


        $('#canvas > div').each((key, element) => {

            const message = messages.find(message => message.uniqueId === element.id);
            message.x -= message.deltaSpeed;

            const messageElement = $('#'+message.uniqueId);
            messageElement.css("left", message.x+'%');


            const messageDivLengthPercentage = (messageElement.width() / $('body').width()) * 100;

            if ((message.x + messageDivLengthPercentage) <= 0) {
                messageElement.remove();
                message.toDelete = true;
            }

            if (message.emoji) {
                // if (message.emojiOpacity === 100) {
                messageElement.children().empty();
                const emojiDiv = `<div class="emoji" 
                                        style="opacity: ${message.emojiOpacity / 100}; 
                                                top: -45%;"
                                 >${message.emoji}</div>`
                messageElement.append(emojiDiv);
                console.log(message.emojiOpacity / 100);
                message.emojiOpacity -= 2;

                if (message.emojiOpacity <= 0) {
                    delete message.emoji;
                    delete message.emojiOpacity;
                }
            }

        });


    }, 20);
})();
