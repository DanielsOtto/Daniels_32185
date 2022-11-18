const socketChat = io();
const sendProds = document.getElementById('sendProds');
const form = document.getElementsByTagName('form');
const iName = document.getElementById('inputName');
const iUrl = document.getElementById('inputUrl');
const iPrice = document.getElementById('inputPrice');

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

sendProds.addEventListener('click', (e) => {  //  FORMA A
  // e.preventDefault()
  const object = {
    name: iName.value,
    price: iPrice.value,
    url: iUrl.value
  }
  iName.value = "";
  iPrice.value = "";
  iUrl.value = "";
  generarPost(object);
});

const generarPost = (object) => {

  fetch('http://localhost:8080/products/', {
    method: "POST",
    body: JSON.stringify(object),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then(response => response.json())
    .then(data => console.log(data))
};

socketChat.on('updateProducts', arrayProducts => {
  showProducts(arrayProducts);  //  va con el socket.emit del controlador
}); // FORMA A 