const socket = io('http://localhost:8080', {
    withCredentials: true
}); // apunta al localhost:8080 -- apunta al mismo puerto q nuestro server

const btnSend = document.getElementById('btnSend');

const showMessages = msgs => {
    const arrayMsgs = msgs.map(({ date, email, message, id }) => {
        return `<li><span class="text-primary">[${date}] ${email}: </span><span class="text-danger"> ${message} </span> <span class="text-success">${id}</span> </li>`;
    });
    const msgHtml = `
                    <ul>
                      ${arrayMsgs.join('\n')}
                    </ul>
                  `;

    const mensajesChat = document.getElementById('mensajesChat');
    mensajesChat.innerHTML = msgHtml;
};

socket.on('show messages', arrayMsgs => {
    showMessages(arrayMsgs);
});

btnSend.addEventListener('click', async () => {

    const inputEmail = document.getElementById('inputEmail');
    const inputMessage = document.getElementById('inputMessage');
    if (inputEmail && inputMessage) {
        const msg = {
            email: inputEmail.value,
            message: inputMessage.value
        };
        inputEmail.value = '';
        inputMessage.value = '';
        socket.emit('newMessage', msg);
    }
});