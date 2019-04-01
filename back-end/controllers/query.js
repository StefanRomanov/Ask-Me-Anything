const QueryService = require("../services/query-service");

const { validationResult } = require('express-validator/check');


function validatePost(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            message: 'Validation failed, entered data is incorrect',
            errors: errors.array()
        });
        return false;
    }
    return true;
}

module.exports = {
  getQueries: (req, res) =>{
      QueryService.findAll()
          .then((queries) => {
              res
                  .status(200)
                  .json({message: `${queries.length} queries found`, queries})
          })
          .catch(err => {
              res
                  .status(500)
                  .json({message: 'Something went wrong', debug: err})
          })
  }
};
