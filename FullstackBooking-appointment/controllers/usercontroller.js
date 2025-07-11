
const User = require('../model/user');


exports. addUser = async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const user = await User.create({ name, email, age });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getUsers = async (req,res)=> {
  try{
      const  users= await User.findAll();
      res.status(200).json(users); 
  }catch(error){
       res.status(500).json({error:'Failed to fetch errors'});
  }
};


exports.deleteUser = async(req,res) => {
      const id=req.params.id ;
   try{
       await User.destroy({where:{id}});
       res.json({message:'User deleted'});
   }catch{
       res.status(500).json({error:'Delete failed'});
   }
}

