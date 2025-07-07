const connection = require('../utils/db-connection');
const db=require('../utils/db-connection');

const addEntries=(req,res)=> {
     const {email,name} = req.body ;
     const insertQuery='INSERT INTO Students (email,name) VALUES (?,?)';

     db.execute(insertQuery,[email,name],(err) => {
          if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return ;
          }
          console.log('value has been inserted');
          res.status(200).send(`Student with name ${name} successfully added`);
     })

     
}

const updateEntries=(req,res) => {
    const {id}=req.params ;
    const {name}=req.body ;
    const updateQuery="UPDATE Students set name=? Where id= ?" ;

    db.execute(updateQuery,[name,id],(err,result)=> {
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return ;
          }
        if(result.affectedRows === 0)  {
            res.status(404).send("Student not found");
            return ;
        }
        
          res.status(200).send('user has been updated');
    })
}

const deleteEntries=(req,res)=> {
     const  {id} =req.params ;
     const  deleteQuery=`DELETE FROM Students where id=?`;
 
     db.execute(deleteQuery,[id],(err,result) => {
        if(err) {
            console.log(err.message);
            res.status(500).send(err.message);
        }
           if(result.affectedRows === 0)  {
            res.status(404).send("Student not found");
            return ;
        }
        
          res.status(200).send(`user with id ${id} is deleted`);
     })
}



module.exports={
    addEntries ,
    updateEntries,
    deleteEntries
}