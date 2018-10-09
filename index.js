const express = require('express');
const Joi = require('joi');
const config = require('config');

const app = express();


app.use(express.json());

app.use(express.static('public'));

app.use(function(req,res,next) {

    console.log('logging..!');
    next();

});


app.set('view engine','pug');

app.set('views','./views');

const partinfos =  [

    {icparts:1,partnumber:'VOE 87651'},
    {icparts:2,partnumber:'LP 876582'},
    {icparts:3,partnumber:'VOE 87653'}
];

console.log(`configuration ${config.get('name')}`);
console.log(`configuration ${config.get('mail.to')}`);

app.get("/",(req,res) => 
{
    res.render('parts',{title: 'parts info',message: 'pug html'});


   // res.send('Hello Express!!!!')
});

app.get("/api/parts",(req,res) => 
{
    res.send(partinfos);
});


app.get("/api/parts/:id",(req,res) => {

    const partinfo =  partinfos.find(p => p.icparts == parseInt(req.params.id));
    if (!partinfo) res.status(404).send('File Not Found');

   res.send(partinfo);


});

app.post("/api/parts",(req,res) =>
{

   const { error } =  validation(req.body);
   if(error) res.status(400).send(error.details[0].message);
   
   const partinfo = 
   {
       icparts:partinfos.length + 1,
       partnumber:req.body.partnumber

   }

   partinfos.push(partinfo);

   res.send(partinfos);

});

function validation(partinfos)
{
   const schema = 
   {
     partnumber:Joi.string().min(3).max(50).required()
   };

  return  Joi.validate(partinfos,schema);
}

const port = process.env.port || 3000

app.listen(port,() => console.log(`listening Port ${port}`))