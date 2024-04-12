const express = require('express');
const router = express.Router();

router.get('/', () => {
  console.log('hello')
});

router.get('/:id', () => {
  console.log('individual pet')
});

router.post('/', () => {

})

router.delete('/', () => {

});

module.exports = router;