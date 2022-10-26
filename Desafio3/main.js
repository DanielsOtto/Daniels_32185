const { connect } = require('./server');

async function main() {
  try {
    const server = await connect(8080);
    console.log(`conectando al puerto ${server.address().port}`);
  } catch (error) {
    console.log(`Algo falló ${error}`);
  }
}

main();