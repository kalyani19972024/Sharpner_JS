
const express=require('express')
const app=express();

app.use(express.json());

let users=[
    {id:1 , name:smith},
    {id:2 , name:bos}
];

//GET all users
app.get('/users',(req,res)=> {
    res.json(users);
});

app.get('/users/:id',(req,res)=> {
    const userId=parseInt(req.params.id);
    const user= users.find(u =>u.id === user.id);

    if(!user){
        return res.status(404).json({message:'user not found'});
    }
    res.json(user);
})

//POST to add a new user
app.post('/users',(req,res)=>{
    const {name}=req.body ;
    const newuser={id:users.length+1 ,name};
    users.push(newuser);
    res.status(201).json(newuser);
});



app.listen(2000,()=>{
    console.log("server is running");
})