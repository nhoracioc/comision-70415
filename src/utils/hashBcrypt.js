import bcrypt from "bcrypt"; 

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10)); 

//hashSync(): toma el password que le pasamos y aplica el proceso a partir de un salt. 
//"salt" es un string random que hace que el proceso de hasheo se realice de forma impredecible. 
//En este caso generamos un salt de 10 caracteres. 

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password); 


//Compara los password y me retorna true / false segun corresponda. 


