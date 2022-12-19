import { chosenProdsContainer } from "../containers/DataContainer.js";
import { randomUUID } from 'crypto';

// trabajo aca y llamo a los contenedores mongodb/fs/firestore

// Por una cuestion de practicidad opte por trabajar con DOS ID
//ya que los contenedores de la anterior entrega trabajan con "id"
// y no con "_id"

function validadrProducto(obj) {
  if (!obj.name) throw new Error('No ha ingresado el nombre del producto');
  if (typeof obj.name !== 'string') throw new Error('El nombre del producto tiene que ser una cadena de caracteres');
  if (!obj.price) throw new Error('No ha ingresado el precio del producto');
  // if ((typeof obj.price !== 'number') || (!Number.isInteger(obj.price))) throw new Error('El precio del producto tiene que ser un número');
  if (obj.price < 0) throw new Error('El precio del objeto NO puede ser negativo');
  if (!obj.description) throw new Error('No ha ingresado la descripción del producto');
  if (typeof obj.description !== 'string') throw new Error('La descripción tiene que ser una cadena de caracteres')
  if (!obj.thumbnail) throw new Error('No ha ingresado la imágen del producto');
  return obj;
}

export async function saveProds(obj) {
  obj.id = randomUUID();
  let object = validadrProducto(obj)
  try {
    object = await chosenProdsContainer.save(object);
    return object;
  } catch (err) {
    console.log(err)
    throw new Error({ errorMsg: err.message });
  }
}

export async function updateProdsById(id, object) {
  // recibe el id del objeto a modificar
  // recibe el objeto nuevo
  try {
    const oldObject = await chosenProdsContainer.getById(id);
    //antes hay que convertir oldObject en un objeto
    object.id = oldObject.id;
    await chosenProdsContainer.updateById(oldObject, object);
  } catch (err) {
    console.log(err);
    throw new Error('Error al actualizar el producto');
  }
}

export async function deleteOne(id) {
  try {
    const object = await chosenProdsContainer.getById(id);
    if (!object) throw new Error('Objeto no encontrado');
    await chosenProdsContainer.deleteById(object);
  } catch (err) {
    console.log(err);
    throw new Error('Error al eliminar un elemento');
  }
}

