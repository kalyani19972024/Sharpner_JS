import { GoogleGenAI } from "@google/genai";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  // Individual states for each manual field
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [amount, setAmount] = useState('');
  // const [date, setDate] = useState('');

  // State for AI input and the main list
  const [aiInput, setAiInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const[listening,setListening]=useState(false);

  const ai= new GoogleGenAI({apiKey:process.env.REACT_APP_GEMINI_API_KEY});
  // const ai = new GoogleGenAI({
  // apiKey: process.env.REACT_APP_GEMINI_API_KEY,
  // httpOptions: { apiVersion: "v1" } // Forces stable API version
  // });


  // Handler for Manual Addition
  // const handleManualAdd = (e) => {
  //   e.preventDefault();
  //   const newExpense = { title, description, amount, date };
  //   setExpenses([newExpense, ...expenses]);
    
  //   // Resetting manual fields
  //   setTitle('');
  //   setDescription('');
  //   setAmount('');
  //   setDate('');
  // };

  // Handler for AI Addition (Mock logic)
   const handleAiExpense = async (text) => {

    const inputToProcess=text || aiInput ;

    if (! inputToProcess) return;

    setLoading(true); // Step 1: Start loading
    
    try {
       const prompt = `
        Extract expense details from this text: "${inputToProcess}".
        Respond ONLY with a raw JSON object containing: 
        { "title": string, "amount": number, "description": string }.
        Do not include markdown formatting or extra text.
      `;

      // Step 2: Send request to Gemini

      const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite", 
      // Contents must be an array of objects
      contents: [{ role: "user", parts: [{ text: prompt }] }] 
    });
      
    
      console.log(response);
      const rawText = response.text;

      // Step 3: Console the raw response
      // console.log("Raw Gemini Response:", rawText);

      // 2. Clean the text to handle cases where AI adds ```json ... ``` wrappers
      const cleanText = rawText.replace(/```json|```/g, "").trim();

      // Step 4: Parse into JSON
      const parsedData = JSON.parse(cleanText);

      // Step 5: Add to list
      const newExpense = {
        id: Date.now(),
        ...parsedData,
        date: new Date().toLocaleDateString()
      };

      setExpenses((prev) => [...prev, newExpense]);
      setAiInput(""); // Clear input
      
    } catch (error) {
      console.error("Failed to parse or fetch AI response:", error);
      alert("AI couldn't understand that. Try: 'Spent 20 on coffee'");
    } finally {
      setLoading(false); // Step 6: Stop loading
    }
  };
   const handleVoiceInput=()=>{
     if(!("webkitSpeechRecognition" in window)){
          alert("Voice input not supported in the browser");
          return;
     } 
     
     const recognition=new window.webkitSpeechRecognition();
     recognition.lang="en-IN";
     recognition.interimResults=false;
     recognition.continuous=false;

     recognition.onstart=()=>setListening(true);
     recognition.onend=()=>setListening(false);

     recognition.onresult=(event)=>{
          const transcript=event.results[0][0].transcript;
          setAiInput(transcript);
          handleAiExpense (transcript);

     }
     recognition.start();
  };
  

  return (
    <div className="container py-5">
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold">AI Expense Tracker</h1>
        
      </header>

      <div className="row g-4 mb-5">
        {/* Manual Section */}
        {/* <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white">Add Expense Manually</div>
            <div className="card-body">
              <form onSubmit={handleManualAdd}>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Title</label>
                  <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Description</label>
                  <textarea className="form-control" rows="2" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className="row">
                  <div className="col-6 mb-3">
                    <label className="form-label small fw-bold">Amount</label>
                    <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label small fw-bold">Date</label>
                    <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-2">Add Expense</button>
              </form>
            </div>
          </div> */}
        {/* </div> */}

        {/* AI Section */}
        <div className="col-lg-6">
          <div className="card shadow-sm h-100 border-info">
            <div className="card-header bg-info text-white">Add Expense with AI or Voice</div>
            <div className="card-body d-flex flex-column justify-content-center">
              <div className="mb-3">
                <label className="form-label small fw-bold">Describe your expense</label>
                <input 
                  type="text" 
                  className="form-control form-control-lg" 
                  placeholder="e.g. Spent 500 on groceries yesterday" 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                />
              </div>
               <button onClick={handleAiExpense} disabled={loading}>
                 {loading ? "Processing..." : "Add with AI"}
               </button>

               <button onClick={handleVoiceInput} className={`${listening ?"bg-red-500" :"bg-purple-500"} text-black p-2 rounded`}>
                 {listening?"Listening...." : "Speak"}
               </button>

              
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
    
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-4">Expense List</h5>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {expenses.length > 0 ? expenses.map((exp, index) => (
                  <tr key={index}>
                    <td className="fw-semibold">{exp.title}</td>
                    <td className="text-muted">{exp.description}</td>
                    <td className="text-primary fw-bold">₹{exp.amount}</td>
                    <td>{exp.date}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">No data to display. Start by adding an expense above!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


