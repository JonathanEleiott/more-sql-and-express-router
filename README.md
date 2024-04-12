# More SQL & Express Router

## SQL

- DEFAULT - puts in a specified value if no value is given
- client.query
  - can be given a second parameter that will be an array of values
  - $1, $2, $3, etc. -> insert values based on a given array
  - The $ numbers MUST LINE UP EXACTLY with the array values
    - No extra $ numbers
    - No extra values in the array
    - It must be a 1:1 relationship

## Promise.all()

- will run many promises at once
- return an array of the results when they all finish

## .then() -> is an alternative to async await

- make a asynchronous call
- THEN do something after it finishes
- .then takes in a function
  - the function that .then takes in will be what is returned from the previous .then

## Express Router

