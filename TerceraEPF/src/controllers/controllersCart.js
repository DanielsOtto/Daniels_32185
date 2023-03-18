import { findByEmail } from '../models/userModel.js';
import { sendsMails } from '../utils/nodemailer.js';
import { logger } from '../log/pino.js';
import {
  createCart,
  saveProdsInCart,
  deleteOneProduct,
  deleteProdsInCart,
  getAllProducts
} from '../models/cartModel.js';


async function returnUser(email) {
  try {
    return await findByEmail(email);
  } catch (err) {
    logger.error(err.message);
    throw new Error(err.message);
  }
}

// post crea un carrito  con una lista vacia de productos
// y devuelve su id
async function createC(req, res) { //anda perfecto
  try {
    console.log("createC controllers");
    return await createCart();
  } catch (err) {
    logger.error(err.message);
    throw new Error('Error creating cart');
  }
}


// por params nada - por body idProds + idCart MAL
// idCart no esta en el body, esta en el objeto USER, 
//solo tenemos el mail para buscarlo
async function addProducts({ body }, res) { // PROBADO - ANDA
  const { email, idProd } = body;
  try {
    const user = await returnUser(email);
    const { idCart } = user;
    await saveProdsInCart(idCart, idProd);
  } catch (err) {
    logger.error(err.message);
    throw new Error(err.message);
  }
  res.sendStatus(200);
}

// get -- listar los productos del carrito
async function showProducts({ body }, res) { // PROBADO -- ANDA
  const { email } = body;
  try {
    const user = await returnUser(email);
    const prods = await getAllProducts(user.idCart);

    if (prods.length === 0) {
      res.status(200).json({ Message: 'Your cart is empty' });
    } else {
      res.status(200).json(prods);
    }
  } catch (err) {
    logger.error(err.message);
    throw new Error(err.message);
  }
}


//8b17072a-7696-44d4-9c07-5eaedf1fc0a7 CARRITO 
// delete - borra un producto, de un determinado carrito, ambos ID en params
export async function deleteOneProdCart({ body, params }, res) { // ANDA - PROBADO
  const { email } = body;
  const { id_prod } = params;
  try {
    const user = await returnUser(email);
    const { idCart } = user;
    await deleteOneProduct(idCart, id_prod);
    res.status(200).json({ message: "Deleted object" });
  } catch (err) {
    logger.error(err.message);
    return res.json({ Error: err.message });
  }
}


//8b17072a-7696-44d4-9c07-5eaedf1fc0a7 CARRITO 
//1bd64db3-8154-46d9-8156-2450da8500d5 PRODUCTO
// delete - borra los productos de un carrito, NO recibe el id por params
async function cleanCart({ body }, res) { // ANDA -- bien
  const { email } = body;
  try {
    const user = await returnUser(email);
    const { idCart } = user;
    await deleteProdsInCart(idCart);
  } catch (err) {
    logger.error(err.message);
    throw new Error(err.message);
  }
  res.sendStatus(200);
}

async function createRegisterProds(items) {
  const register = {
    prodsTotal: 0,
    products: []
  };
  try {
    const prodMap = new Map();
    for (const item of items) {
      if (prodMap.has(item.name)) {
        prodMap.get(item.name).cant++;
      } else {
        const product = {
          name: item.name,
          price: item.price,
          id: item.id,
          cant: 1
        };
        prodMap.set(item.name, product);
      }
    }
    register.prodsTotal = items.length;
    register.products = Array.from(prodMap.values());
    return register;
  } catch (err) {
    logger.error(err);
    throw new Error(err.message);
  }
}


export async function buyItems({ body }, res) {
  const { email } = body;
  try {
    const user = await returnUser(email);
    const { idCart } = user;
    const prods = await getAllProducts(idCart);
    if (prods.length === 0) return res.status(405).json({ message: 'Your cart is empty' });
    const register = await createRegisterProds(prods);

    await deleteProdsInCart(idCart);
    const messageToAdmin = {
      from: 'Sender Name <admin@admin>',
      to: 'Sender Name <admin@admin>',
      subject: 'New Sale ✔',
      text: `NEW SALE
            SALE data:
            Name buyer: ${user.name}
            Lastname buyer: ${user.lastname}
            Email buyer: ${email}
            ID buyer: ${user.id}
            Total products: ${register.prodsTotal}
            Register: ${JSON.stringify(register, null, 2)}
            `,
      html: `<h1>NEW SALE</h1>
              <h3>SALE data:</h3>
            <ul>
              <li><strong>Name buyer:</strong> ${user.name}</li>
              <li><strong>Lastname buyer:</strong> ${user.lastname}</li>
              <li><strong>Email buyer:</strong> ${email}</li>
              <li><strong>ID buyer:</strong> ${user.id}</li>
              <li><strong>Total products:</strong> ${register.prodsTotal}</li>
              <li><strong>Register:</strong> ${JSON.stringify(register, null, 2)}</li>
            </ul>
            `
    };

    const messageToBuyer = {
      from: 'Sender Name <admin@admin>',
      to: `Sender Name <${email}>`,
      subject: 'Purchase processed ✔',
      text: `We have received your purchase, we will contact you shortly for delivery.
            Purchase details:
            Email buyer: ${email}
            Total products: ${register.prodsTotal}
            Register: ${JSON.stringify(register, null, 2)}
            Thanks for your purchase`,
      html: `
            <p>We have received your purchase, we will contact you shortly for delivery.</p>
              <h5>Purchase details:</h5>
            <ul>
              <li><strong>Email buyer:</strong> ${email}</li>
              <li><strong>Total products:</strong> ${register.prodsTotal}</li>
              <li><strong>Register:</strong> ${JSON.stringify(register, null, 2)}</li>
            </ul>
            <p><strong>Thanks for your purchase</strong></p>
            `
    };
    sendsMails.send(messageToAdmin);
    sendsMails.send(messageToBuyer);


    return res.status(201).json({ message: 'purchase received' });
  } catch (err) {
    logger.error(err.message);
    throw new Error(err.message);
  }
}

export { createC, addProducts, cleanCart, showProducts };