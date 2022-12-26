const buttonShow = document.getElementById('showProducts');

const showProducts = (products) => {
  const listP = products.map(({ name, price, thumbnail, description }) => {
    return `
              <tr>
                <td id="prodName" class="text-center">${name}</td>
                <td class="text-center">${price}</td>
                <td> <img class="img-thumbnail rounded mx-auto d-block" src="${thumbnail}" alt="${description}"> </td>
                <td> <p>${description}</p> </td>
              </tr>
              `;
  });

  const msgList = `
                      <tr>
                          <th class="table-info text-center">Nombre del producto</th>
                          <th class="table-info text-center">Precio del producto</th>
                          <th class="table-info text-center">Imágen del producto</th>
                          <th class="table-info text-center">Descripción del producto</th>
                      </tr>
                        ${listP.join('\n')}
                      `;
  const listOfProds = document.getElementById('listOfProds');
  listOfProds.innerHTML = msgList;
}

// ---- 'http://localhost:8080/api/productos-test'

buttonShow.addEventListener('click', async e => {
  // debugger
  e.preventDefault();
  try {
    const quest = await fetch('/api/productos-test', {
      method: 'GET',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json charset=UTF-8' }
    })
    const data = quest.json();
    showProducts(data);
  } catch (error) {
    console.log(error)
  }
});



//--------------------------------------------------------------


// buttonShow.addEventListener('click', async e => {
//   e.preventDefault();

//   await fetch('http://localhost:8080/api/productos-test', {
//     method: 'GET',
//     // mode: 'no-cors',
//     headers: { 'Content-Type': 'application/json charset=UTF-8' }
//   })
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch(err => console.log(err));


// });

// async function fetchProducts() {
//   const response = await fetch('http://localhost:8080/api/productos-test', {
//     method: 'GET',
//     mode: 'no-cors', // <---
//     cache: 'default'
//   });
//   const products = await response.json();
//   console.log(products)
//   return products;
// }

// buttonShow.addEventListener('click', async () => {
//   await fetchProducts();
//   const products = await fetchProducts();
//   console.log(products)
//   showProducts(products);
// });



// async function getData() {

//   try {
//     const response = await fetch('http://localhost:8080/api/productos-test', {
//       mode: 'no-cors', // <---
//     });
//     const data = await response.json();
//     console.log(data)
//     showProducts(data);
//   } catch (error) {
//     console.log(error);
//   }
// }

// buttonShow.addEventListener('click', getData)
