const client = require('./client.js');
const { createOwner } = require('./owners.js');
const { createPet } = require('./pets.js');

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS pets_products;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS pets;
      DROP TABLE IF EXISTS owners;
    `);
  } catch(err) {
    console.log(err);
  }
}

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE owners (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30)
      );

      CREATE TABLE pets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        type VARCHAR(20) DEFAULT 'bunny',
        owner_id INTEGER REFERENCES owners(id)
      );

      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30)
      );

      CREATE TABLE pets_products (
        id SERIAL PRIMARY KEY,
        pets_id INTEGER REFERENCES pets(id),
        products_id INTEGER REFERENCES products(id)
      );
    `);
  } catch(err) {
    console.log(err);
  }
}

const syncAndSeed = async() => {
  await client.connect();
  console.log('CONNECTED');

  await dropTables();
  console.log('TABLES DROPPED');

  await createTables();
  console.log('TABLES CREATED');

  // ONE CALL AT A TIME
  // await createOwner('Todd');
  // await createOwner('Tedd');
  // await createOwner('Tom');

  // PROMISES
  // const ownersArray = await Promise.all(
  //   [
  //     createOwner('Todd'), 
  //     createOwner('Tedd'), 
  //     createOwner('Tom')
  //   ]
  // );
  // const [ ownerTodd, ownerTedd, ownerTom ] = ownersArray;
  // console.log(`OWNERS CREATED`);

  // const petsArray = await Promise.all(
  //   [
  //     createPet('sammy', 'doggo', ownerTodd.id),
  //     createPet('tammy', 'turtle', ownerTom.id),
  //     createPet('sitka', 'kitty', ownerTedd.id),
  //     createPet('baxter', 'bunny', ownerTom.id),
  //     createPet('paul', 'bunny', ownerTedd.id)
  //   ]
  // );
  // console.log(`PETS CREATED`);

  // .then
  Promise.all([
    createOwner('Todd'), 
    createOwner('Tedd'), 
    createOwner('Tom')
  ]).then((ownersArray) => {
    const [ ownerTodd, ownerTedd, ownerTom ] = ownersArray;

    return Promise.all([
      createPet('sammy', 'doggo', ownerTodd.id),
      createPet('tammy', 'turtle', ownerTom.id),
      createPet('sitka', 'kitty', ownerTedd.id),
      createPet('baxter', 'bunny', ownerTom.id),
      createPet('paul', 'bunny', ownerTedd.id)
    ]);
  }).then((petsArray) => {
    client.end();
    console.log('CONNECTION ENDED');
  }).catch((err) => {
    console.log(err)
  });
}

syncAndSeed();


