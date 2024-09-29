const ProdutController=require('../controllers/productControllers');
const express=require('express');
const router=express.Router();
const {checkRole}=require('./../middleware/checkRoleMiddleware');
const verify=require('./../middleware/authMiddleware');
const upload=require('./../utils/multer');

router.post('/create',verify,checkRole(['admin','Manager']),upload.single('Image'),ProdutController.createProduct);;
router.get('/getAll',verify,checkRole(['admin','Manager']),ProdutController.getAllProduct);
router.get('/getOne',verify,checkRole(['admin','Manager']),ProdutController.singleProduct);
router.put('/update',verify,checkRole(['admin','Manager']),ProdutController.updateProduct);
router.delete('/delete',verify,checkRole(['admin','Manager']),ProdutController.deleteProduct);

module.exports=router;