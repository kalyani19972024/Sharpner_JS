
const {Book,BorrowedBook} = require('../model');


exports.borrowBook= async(req,res)=> {
    const {title}= req.body ;
    const now=new Date();
    const returndate= new Date(now.getTime() + 1* 60 * 60 * 1000);

    let book=await Book.findOne({where:{title}});
    if(!book){
       book=await Book.create({title});
    } 

    const borrowed= await BorrowedBook.create({
       bookId:book.id ,
       borrowDate:now ,
       returnDate:returndate,
       currentFine:0 ,
    });
     
    res.json(borrowed);
};

exports.getBorrowedBooks = async (req, res) => {
  const borrowed = await BorrowedBook.findAll({
    where: { isReturned: false },
    include: [Book],
  });

  const now = new Date();

  for (let b of borrowed) {
    const due = new Date(b.returnDate);
    if (now > due) {
      const hoursLate = Math.ceil((now - due) / (1000 * 60 * 60));
      b.fineAmount = hoursLate * 10;
      await b.save();
    }
  }

  res.json(borrowed);
};

exports.returnBook = async (req, res) => {
  const borrow = await BorrowedBook.findByPk(req.params.id);

  if (borrow.fineAmount === 0) {
    borrow.isReturned = true;
    await borrow.save();
    res.json({ success: true });
  } else {
    res.json({ success: false, fineAmount: borrow.fineAmount });
  }
};

exports.payFineAndReturn = async (req, res) => {
  const borrow = await BorrowedBook.findByPk(req.params.id);
  borrow.fineAmount = 0;
  borrow.isReturned = true;
  await borrow.save();
  res.json({ success: true });
};