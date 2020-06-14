const router = require('express').Router();
const database = require('./database').client;

router.get('api/food/previous', (request, response) => {
    response.status(200)
    .json({data : "this is a datapoint"});
});

router.get('api/food', (request, response) => {
    response.status(200)
    .json({data : ""});
});

router.post('api/food', (request, response) =>{
    response.status(200)
    .json({data : ""});
});

router.post('api/food/food-to-calories', (request, response) => {
    response.status(200)
    .json({data : ""});
});

router.put('api/calorie/:id', (request, response) => {
    response.status(200)
    .json({data : ""});
});

router.put('api/calorie/goals', (request, response) => {
    response.status(200)
    .json({data : ""});
});

router.get('api/calorie/track/:goalId', (reauest, response) => {
    response.status(200)
    .json({data : ""});
});

module.exports = router;