const socket = io(); // apunta al localhost:8080
const btnSend = document.getElementById('btnSend');

const showMessages = msgs => {
  const arrayMsgs = msgs.map(({ date, email, message }) => {
    return `<li class="text-decoration-none"><span class="text-primary">[${date}] ${email}:</span> <span class="text-danger">${message}</span></li>`;
  });

  const msgHtml = `
                    <ul>
                      ${arrayMsgs.join('\n')}
                    </ul>
                  `;

  const mensajesChat = document.getElementById('mensajesChat');
  mensajesChat.innerHTML = msgHtml;
};

btnSend.addEventListener('click', async () => {

  const inputEmail = document.getElementById('inputEmail');
  const inputMessage = document.getElementById('inputMessage');

  if (inputEmail && inputMessage) {
    const msg = {
      email: inputEmail.value,
      message: inputMessage.value
    };
    socket.emit('newMessage', msg);
  }

});

socket.on('updatedMsgs', arrayMsgs => {
  showMessages(arrayMsgs);
});