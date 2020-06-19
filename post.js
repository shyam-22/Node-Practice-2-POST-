//initialise express and invoke express method
let express = require("express");
 let app = express();
 app.use(express.json());

 let Joi = require("@hapi/joi");
//generate the port
let port = process.env.NODE_ENV || 8000 ;
app.listen(port, ()=> { console.log(`port is working on ${port}`)});




let student = [
    {id:1 , name: "shyam"},
    {id:2, name: "rushi"},
    {id:3 , name: "pramod"},
    {id:4 , name: "gaurav"},
    {id:5 , name: "parag"}
];

//Insert data
app.post("/api/student/addnew", (req,res) =>{

    let valid = Joi.object({
        name : Joi.string().min(4).max(20).alphanum().required()
    });
    let {error} = valid.validate(req.body);  
    if(error)
    {
        return res.send(error.details[0].message)
    }


    let data = {
        id:student.length + 1,
        name: req.body.name 
    }
    student.push(data)
     res.send(student)
});

//Update student data
 app.put("/api/student/update/:id", (req, res) =>{
     //Id check
     //Joi validation
     //finally data save

     let data = student.find(item => item.id ===  parseInt(req.params.id))
     if(!data) 
     {
         return res.status(404).send({message : "You enter Invalid Id"})
     };

     let valid = Joi.object({
        name : Joi.string().min(4).max(20).required()
        })
        let {error} = valid.validate(req.body);
        if(error)
        {
            return res.send(error.details[0].message)
        }
        
        data.name = req.body.name
        res.send(student);
 });

 

