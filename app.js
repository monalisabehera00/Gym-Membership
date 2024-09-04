const express=require("express");
const path=require("path");
const app=express();
const fs=require("fs");
const port=3000;
//EXPRESS SPECIFIC STUFF

app.use('/static',express.static('static'))//serving static files
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine','pug')//set the template engine as pug
app.set('views',path.join(__dirname,'views'))//set the views directory

//END POINTS
app.get('/',(req,res)=>{
    const con ="this is the best content"
    const params={'title':'pug is the best',content:con}
res.status(200).render('index.pug',params)
});

// app.post('/',(req,res)=>{
//     console.log(req.body)
//     const params={'title':'your form has been submited sucessfully '}
//      res.status(200).render('index.pug',params);
// })

app.post('/',(req,res)=>{
    name=req.body.name
    age=req.body.age
    gender=req.body.gender
    address=req.body.address
    more=req.body.more
    let outputToWrite=`the name of the client is${name},${age}years old,${gender},residing at ${address},more about him/her:${more}`
    fs.writeFileSync('output.txt',outputToWrite)

    const params={'title':'your form has been submited sucessfully '}
res.status(200).render('index.pug',params);
});





//START THE SERVER
app.listen(port,()=>{
    console.log(`this application started sucessfully on port ${port}`)
})