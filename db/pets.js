const client = require('./client.js');

const createPet = async(petName, petType, ownerId) => {
  try {
    await client.query(`
      INSERT INTO pets (name, type, owner_id)
      VALUES ($1, $2, $3);
    `, [ petName, petType, ownerId ]);
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createPet
}