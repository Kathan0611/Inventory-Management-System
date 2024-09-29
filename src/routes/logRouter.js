const logController=require('../controllers/logs.Controllers');
const router=express.router();

router.get('/getAll',logController.getAllLogAction);
router.get('/getOne',logController.singlelogAction);

module.exports=router;
