import { fakerProducts } from "../containers/ContainerFaker.js";
// import path from 'path';
// const { pathname: root } = new URL('../src', import.meta.url);

export async function getFakerProducts(req, res) {
  const array = await fakerProducts.getAll();
  res.status(200);
  // res.render(path.resolve(root, 'index'));
  res.json(array);
}
