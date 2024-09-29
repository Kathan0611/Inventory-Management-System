const CategoryController=require('../controllers/categoryControllers');
const express=require('express');
const router=express.Router();
const verify=require('./../middleware/authMiddleware')
const {checkRole}=require('./../middleware/checkRoleMiddleware');


router.post('/createCategory',verify,checkRole(['admin','Manager']),CategoryController.createCategory);
router.get('/getAll',verify,checkRole(['admin','Manager']),CategoryController.getAllCategory);
router.get('/getOne',verify,checkRole(['admin','Manager']),CategoryController.singleCategory);
router.put('/update',verify,checkRole(['admin','Manger']),CategoryController.updateCategory);
router.delete('/delete',verify,checkRole(['admin','Manger']),CategoryController.deleteCategory);

module.exports=router;