
const Students = require('../models/students1');
const Student=require('../models/students1');
const IdentityCard = require('../models/identitycard');

const addStudents= async(req,res)=> {
     try{
           const {email,name} = req.body ;
           const student= await Student.create({
                name:name ,
                email:email
           });
           res.status(201).send(`User with name ${name} is created !  `);
     }catch (err){
            res.status(500).send(`unable to make an entry. `);
     }
     
}

const addingValuesToStudentAndIdentityTable= async(req,res)=> {
    try{
        const student=await Student.create(req.body.student);
        const idCard=await IdentityCard.create({
            ...req.body.IdentityCard,
            StudentId:student.id
        })

        res.status(201).json({student,idCard});
    }
    catch(error){
          res.status(500).json({error:error.message});
    }
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
    addingValuesToStudentAndIdentityTable,
    updateStudents,
    deleteStudents
}