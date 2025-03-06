import { Router } from "express";
const router = Router(); 

//Registro usando Passport

import passport from "passport";

router.post("/register", passport.authenticate("register", {failureRedirect:"/api/sessions/failedregister"}), async (req, res) => {
   res.redirect("/login"); 
})

router.get("/failedregister", (req, res) => {
    res.send("Error al registrarse"); 
})


//Login con Passport 

router.post("/login", passport.authenticate("login", {failureRedirect:"/api/sessions/faillogin"}), async (req, res) => {
    //creamos la session: 
    req.session.user = {
        first_name: req.user.first_name, 
        last_name: req.user.last_name, 
        age: req.user.age, 
        email: req.user.email
    }

    res.redirect("/profile"); 

})

router.get("/faillogin", (req, res) => {
    res.send("Fallo el login."); 
})


//Logout: 

router.get("/logout", (req, res) => {
    if(req.session.user) {
        req.session.destroy(); 
    }
    res.redirect("/login"); 
})


export default router; 