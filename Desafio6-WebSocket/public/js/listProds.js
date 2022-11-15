const socketChat = io();
const sendProds = document.getElementById('sendProds');

const showProducts = products => {
  const listP = products.map(({ name, price, url, id }) => {
    return `
            <tr>
              <td id="prodName" class="text-center">${name}</td>
              <td class="text-center">${price}</td>
              <td> <img class="img-thumbnail rounded mx-auto d-block" src="${url}" alt="${name}"> </td>
              <td class="text-center">${id}</td> 
            </tr>
            `;
  });

  const msgList = `
                    <tr>
                        <th class="table-info text-center">Nombre del producto</th>
                        <th class="table-info text-center">Precio del producto</th>
                        <th class="table-info text-center">Imágen del producto</th>
                        <th class="table-info text-center">ID del producto</th>
                    </tr>
                      ${listP.join('\n')}
                    `;

  const listOfProds = document.getElementById('listOfProds');
  listOfProds.innerHTML = msgList;
}

socketChat.on('updateList', arrayProducts => {
  showProducts(arrayProducts);
});

sendProds.addEventListener('click', () => {
  socketChat.emit('sendP', 'Se agregó un nuevo elemento');
});


// si uso preventDefault no carga el archivo, si no lo uso, no visualiza los datos
