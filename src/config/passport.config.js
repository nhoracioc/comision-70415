import passport from "passport";
import local from "passport-local"; 

import UserModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/hashBcrypt.js";


const LocalStrategy = local.Strategy; 

const initializePassport = () => {
    passport.use("register", new LocalStrategy({
        passReqToCallback: true, 
        //Le permito acceder al objeto request con esta configuracion. 
        usernameField: "email"
    }, async (req, username, password, done) => {
        
        const {first_name, last_name, email, age} = req.body; 
        
        try {
            //Verificamos si  existe un usuario con ese email: 
            let user = await UserModel.findOne({email}); 
            if(user) return done(null, false); 
            //Si no existe crear un nuevo usuario: 
            let newUser = {
                first_name, 
                last_name, 
                email, 
                age, 
                password : createHash(password)
            }

            const result = await UserModel.create(newUser); 
            return done(null, result); 

        } catch (error) {
            return done(error); 
        }
    })); 

    //estrategia para el Login: 
    passport.use("login", new LocalStrategy({
        usernameField: "email"
    }, async (email, password, done) => {

        try {
            //Busco el usuario por email: 
            const user = await UserModel.findOne({email}); 
            if(!user) {
                console.log("El usuario no existe"); 
                return done(null, false); 
            }

            //Si existe verifico la contraseña: 
            if(!isValidPassword(password, user)) return done(null, false); 
            return done(null, user); 

        } catch (error) {
            return done(error); 
        }
    }))

    //Tenemos que serializar y deserializar usuarios. 
    passport.serializeUser((user, done) => {
        done(null, user._id); 
    })

    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById({_id: id}); 
        done(null, user);
    })
    

}

export default initializePassport; 