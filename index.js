const express = require('express');
require ('dotenv').config(); 
const hbs = require('hbs');
const path = require ('path');
const mysql = require ('mysql2');
const nodemailer = require ('nodemailer');
const bcryptjs = require ('bcryptjs');
  

const app = express();
const PORT = process.env.PORT || 8080;

//Conexión a la Base de Datos
 const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}); 

 conexion.connect((err) => {
    if (err) {
        console.error(`Error en la conexión: ${err.stack}`)
        return;
    }
    console.log(`Conectado a la Base de Datos ${process.env.DATABASE}`);
});


//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

//TEMPENGCONFIG
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));


app.get('/', (req, res) =>{

    // ---RENDER PARA PODER SUBIR A HEROKU.. 
         // COMENTAR EN MODO LOCAL 
        res.render('index')
    
        // let sql = 'SELECT * FROM usuarios';
    
        // conexion.query(sql, (err, result) =>{
        //      if (err) throw err;
        //      res.render('index', {
        //          titulo:'PRESENT・DAY - PRESENT・TIME', 
        //          results: result
        //      });
        //  });
})

app.get('/creacionusuario', (req, res) => {
    res.render('creacionusuario', {
        titulo: 'Creacion de usuario/ユーザ　クリエシオン',
    })
})
app.get ('/iniciosesion',(req,res) => {
    res.render('iniciosesion', {
        titulo: 'Login/ユーザー　ロギン'
})
});
    app.post('/iniciosesion', (req, res) => {
    const {usuario, email, pass} = req.body;
    //    let datos = {
    //     nombre: usuario, 
    //     email: email,
    //     pass: pass
    // };

    // let sql = 'SELECT * FROM usuarios';

    // conexion.query(sql, datos, (err, result) => {
    //     if (err) throw err;
       
    // });

    if (usuario == '' || email == ''|| pass == '') {
         let validacion = alert ('Llene todos los campos por favor..');
          res.render('iniciosesion', {
         titulo: 'Login/ユーザー　ロギン',
           validacion
         });
    } else{
        const Salt= bcryptjs.genSaltSync()
        const comparison = bcryptjs.compareSync(pass,Salt);  
        res.render('sesioniniciada', {
            titulo: 'Sesion iniciada',
    });
    }
})
    app.get('/borrarusuario',(req,res) => {
    res.render('borrarusuario', {
        titulo: 'Borrarme de la pagina'
    })
    })


//     app.post('/borrarusuario',(req,res)=>{  
//     const usuario = req.body
//     conexion.query('delete from usuarios WHERE nombre = usuario')
// })

app.post('/creacionusuario', async (req, res) => { 
    const {usuario, edad, pass,email} = req.body
    //console.log(pass,usuario,edad,email);
    const Salt= bcryptjs.genSaltSync() 
    const userHash = bcryptjs.hashSync(pass,Salt);     
    //  console.log(pass);
    //  console.log(userHash);
     if (usuario == '' || email == ''|| edad == ''|| pass == '') {
        let validacion = alert ('Llene todos los campos por favor..');
        // res.render('creacionusuario', {
        //     titulo: 'Creacion de usuario/ユーザ　クリエシオン',
        //     validacion
        // });
    } else{
    
        // let datos = {
        //     nombre: usuario, 
        //     edad: edad,
        //     email: email, 
        //     pass:  userHash 

        // };
    

        // let sql = "INSERT INTO usuarios SET ?"

        // conexion.query(sql, datos, (err, result) => {
        //     let envioDatos = `Datos enviados con exito`
        //     if (err) throw err;
        // });
    };
           async function envioMail(){
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.USEREMAIL, //Correo del usuario 
                    pass: 'obmygqueusrksxds' //Codigo de seguridad u clave
                }
            });
    
         let envio = transporter.sendMail({
                from: process.env.USEREMAIL,
                to: `${email}`,
                subject: 'Gracias por registrarte en Dia Presente, Tiempo Presente',
                html: '<img src="cid:lainthanks"></img>',
                attachments: [{
                    filename: 'thankyou.png',
                    path: './public/img/thankyou.png',
                    cid: 'lainthanks'
                }]
            });

            res.render('thankyou', { 
                titulo: 'Gracias por registrarte viajero',
            });
    }
    envioMail();
})

app.listen(PORT, () => {
    console.log(`El servidor está trabajando en el Puerto ${PORT}`);
})
