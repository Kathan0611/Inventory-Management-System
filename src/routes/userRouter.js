const userController=require('../controllers/userControllers');
const express=require('express');
const router=express.Router();
const verify=require('./../middleware/authMiddleware');
const {checkRole}=require('./../middleware/checkRoleMiddleware');
const upload=require('./../utils/multer');

router.post('/signup',userController.signup);
router.post('/login',userController.login);
router.get('/getAll',verify,checkRole(['admin']),userController.getAllUser);
router.get('/getOne',verify,checkRole(['admin']),userController.singleUser);
router.put('/update',verify,checkRole(['admin','Manager']),upload.single('BannerImage'),userController.updateUser);
router.delete('/delete',verify,checkRole(['admin']),userController.deleteUser);

module.exports=router;
