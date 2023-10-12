const express = require("express");
const router = express.Router();

router.route('/').post(subCategoryController.createSubCategory)



module.exports = router; 
