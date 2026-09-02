const express=require("express");
const AuthController=require("../controllers/authController")

const router=express.Router();

router.get('/SignUp',AuthController.Signdisplay);
router.post('/SignUp',AuthController.register);
router.get('/Login',AuthController.Logindisplay);
router.post('/Login',AuthController.login);
router.get('/Logout',AuthController.logout);


module.exports=router;