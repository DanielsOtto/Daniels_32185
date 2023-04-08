Comandos:

(((QUERY:)))

((GET))
query {
getProduct(id: "ea92a87a-15b8-4198-ad98-a0d92420e4fe") {
id
name
price
description
thumbnail
}
}

query {
getProducts {
id
name
price
description
thumbnail
}
}

(((MUTATION:)))

((POST))
mutation {
createProduct(data: {
name: "Nombre del Producto",
price: 100,
description: "Descripción del Producto",
thumbnail: "URL de la imagen del Producto"
}) {
id
name
price
description
thumbnail
}
}

((( comandos dentro de thunderClient )))

((Headers)):
Content-Type application/json

((UPDATE))
{
"query": "mutation UpdateProduct($id: ID!, $data: dataUpdateProduct!) { updateProduct(id: $id, data: $data) { id name price description thumbnail } }",
"variables": {
"id": "ea92a87a-15b8-4198-ad98-a0d92420e4fe",
"data": {
"name": "Nuevo nombre",
"price": 2000,
"description": "Nueva descripción",
"thumbnail": "https://nueva-imagen.com"
}
}
}

((DELETE))
{
"query": "mutation { deleteProduct(id: \"ea92a87a-15b8-4198-ad98-a0d92420e4fe\") { id } }"
}
