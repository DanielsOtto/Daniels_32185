// desafio 12
const btn_register = document.getElementById('btn_register');

btn_register.addEventListener('submit', () => {
  const input_reg_name = document.getElementById('input_reg_name');
  const object = {};

  if (input_reg_name) {
    object.name = input_reg_name.value;
  }
  input_reg_name.value = '';

});



