import express from "express";
const app = express();
const PUERTO = 8080;
import session from "express-session";
import { engine } from "express-handlebars";

import MongoStore from "connect-mongo";
import "./database.js";
import viewsRouter from "./router/views.router.js"; 
import sessionsRouter from "./router/sessions.router.js"; 

//Middleware
app.engine("handlebars", engine()); 
app.set("view engine", "handlebars"); 
app.set("views", "./src/views"); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    //1) Creamos una sesión con Memory Storage: 
    secret: "secretCoder", 
    resave: true, 
    saveUninitialized: true,

    //Con Mongo Storage: 
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://coderhouse70410:coderhouse@cluster0.34nyl.mongodb.net/Sessions?retryWrites=true&w=majority&appName=Cluster0", ttl: 100
    })
}));

//Rutas
app.use("/", viewsRouter);
app.use("/api/sessions", sessionsRouter); 


app.listen(PUERTO, () => console.log(`Escuchando en el ${PUERTO}`)); 