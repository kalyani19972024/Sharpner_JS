
const students1=require('./students1');
const department=require('./department');
const IdentityCard = require('./identitycard');
const courses=require('./courses');
const studentCourses=require('./studentCourses');
//one to one 

students1.hasOne(IdentityCard);
IdentityCard.belongsTo(students1);


//one to many
 department.hasMany(students1);
students1.belongsTo(department);


//many to many 
students1.belongsToMany(courses,{through:studentCourses});
courses.belongsToMany(students1,{through:studentCourses});



module.exports={
    students1,department,IdentityCard,courses,studentCourses
}