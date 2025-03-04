import { Router } from "express";
const router = Router(); 
import UserModel from "../models/user.model.js";

//Ruta para nuevo usuario: 

router.post("/register", async (req, res) => {
    const {first_name, last_name, email, password, age} = req.body; 
    
    try {
        //Ver si el correo electronico ya existe: 
        const existeUsuario = await UserModel.findOne({email: email}); 

        if(existeUsuario) {
            return res.status(400).send("El email ya registrado."); 
        }

        //Crear nuevo usuario: 
        const nuevoUsuario = await UserModel.create({first_name, last_name, email, password, age}); 

        res.redirect("/login"); 
    } catch (error) {
        console.log(error);
        res.send("Error al registrar un nuevo usuario"); 
    }
})


//Ruta para el login: 
router.post("/login", async (req, res) => {
    const {email, password} = req.body; 

    try {
        const usuario = await UserModel.findOne({email: email}); 
        if(usuario) {
            if(usuario.password === password) {
                req.session.user = {
                    email: usuario.email, 
                    age: usuario.age, 
                    first_name: usuario.first_name, 
                    last_name: usuario.last_name
                }

                res.redirect("/profile"); 
            } else {
                res.send("Contraseña invalida"); 
            }

        } else {
            res.status(404).send("No Existe el Usuario"); 
        }
        
    } catch (error) {
        
    }
})

//Logout: 
router.get("/logout", (req, res) => {
    if(req.session.user) {
        req.session.destroy(); 
    }
    res.redirect("/login"); 
})


export default router; 