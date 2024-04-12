const client = require('./client.js');

const createOwner = async(ownersName) => {
  try {
    const { rows: [ newOwner ] } = await client.query(`
      INSERT INTO owners (name)
      VALUES ($1)
      RETURNING *;
    `, [ ownersName ]);

    return newOwner;
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createOwner
}