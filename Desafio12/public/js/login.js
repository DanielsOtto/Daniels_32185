// aca deberia ir el mensaje de bienvenida, una vez que se registre
// desafio 12
const idWellcome = document.getElementById('welcomeBox');
const btn_register = document.getElementById('btn_register');



export function showWelcome(object) {

  const h2 = document.createElement('h2');
  h2.innerHTML = `Bienvenido ${object.name}`;
  const btnLogOut = document.createElement('button');

  btnLogOut.innerHTML = 'Desconectarse';

  idWellcome.appendChild(h2);
  idWellcome.appendChild(btnLogOut);
}

btn_register.addEventListener('submit', (e) => {
  e.preventDefault();
  const input_reg_name = document.getElementById('input_reg_name');
  const object = {};

  if (input_reg_name) {
    object.name = input_reg_name.value;
  }
  input_reg_name.value = '';

  // fetch('/register/', {
  //   method: "POST",
  //   body: JSON.stringify(object),
  //   headers: { "Content-Type": "application/json; charset=UTF-8" }
  // })
  //   .then(response => response.json())
  //   .then(data => console.log(data))

});



