const connection = require('../utils/db-connection');
const db=require('../utils/db-connection');

const addStudents=(req,res)=> {
     const {email,name,age} = req.body ;
     const insertQuery='INSERT INTO Students (email,name,age) VALUES (?,?)';

     db.execute(insertQuery,[email,name,age],(err) => {
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
const getStudents=(req,res)=> {
     const  getQuery='SELECT * FROM students';

     db.execute(getQuery,(err,result)=> {
          if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return ;
           }
           res.send(result);
     })
}

const getStudentsbyID=(req,res)=> {
       const id=req.params.id ;
      const getQueryID='SELECT * FROM students WHERE id=?';

      db.execute(getQueryID,[id],(err,result)=> {
         if(err){
           console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return ;
         }
         if (result.length === 0) {
            return res.status(404).send('Student not found');
         }
         res.send(result[0]);
          
      })
}

const updateStudents=(req,res) => {
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

const deleteStudents=(req,res)=> {
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
    addStudents ,
    getStudents,
    getStudentsbyID,
    updateStudents,
    deleteStudents
}