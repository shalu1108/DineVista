const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Signdisplay = (req,res)=>{
    res.render('SignUp', {title: 'Sign Up'});
}

const Logindisplay = (req,res)=>{
    res.render('Login', {title: 'Log In'});
}

const register = (req,res) =>{
    bcrypt.hash(req.body.password, 10, function(err,hashedPass){
        if (err){
            req.flash("err","SOme Error Occured")
            console.log(err);
            res.redirect('/SignUp')
        }
        User.findOne({email:req.body.email})
        .then(check_user=>{
            if (check_user){
                req.flash('err','Email Already Exists!');
                console.log("Email exists in Users!")
                res.redirect("/Login");
            }
            else{
                let user = new User({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: hashedPass
                })
                user.save()
                .then(()=>{
                    req.flash("success","User Added Successfully!")
                    console.log("User Added Successfully!");
                    let token = jwt.sign({first_name : user.first_name,last_name:user.last_name,email:user.email},"Secret Value")
                    res.cookie("uid",token);
                    res.redirect("/Menu");
                })
                .catch((err) =>{
                    req.flash("err","Some Error Occured")
                    console.log(err);
                    res.redirect('/SignUp')
                })
            }
        })
    })
}

const login = (req,res) =>{
    let email = req.body.email
    let password = req.body.password
    let remember = req.body.remember
    User.findOne({email:email})
    .then(user =>{
        if (user){
            bcrypt.compare(password,user.password, function(err,result){
                if (err){
                    req.flash('err',err);
                    console.log(err);
                    res.redirect('/Login')
                }
                if (result){
                    req.flash('success','Login Successful');
                    console.log("Login Successful");
                    let token = jwt.sign({first_name : user.first_name,last_name:user.last_name,email:user.email},"Secret Value",{expiresIn:"1h"})
                    if (remember=="Yes"){
                        token = jwt.sign({first_name : user.first_name,last_name:user.last_name,email:user.email},"Secret Value")
                    }                     
                    res.cookie("uid",token);
                    res.redirect("/Menu");
                }else{
                    req.flash('err','Password does not match!');
                    console.log("Password does not match!")
                    res.redirect("/Login")
                }
            })
        }else{
            req.flash('err','No Such User Found');
            console.log("No Such User Found")
            res.redirect("/Login")
        }
    })
}

const logout = (req,res) =>{
    try{
        res.clearCookie("uid");
        console.log("Logout Successful!");
        res.redirect("/");
    } catch (err){
        console.log(err);
        res.redirect("/404");
    }
}


module.exports={
    register,
    Signdisplay,
    Logindisplay,
    login,
    logout
}