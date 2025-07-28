//  const cashfree = Cashfree({
//                 mode: "sandbox",
//             });

// document.getElementById("renderBtn").addEventListener("click", async () => {

//     try{
//         // Fetch payment seesion ID from backend
//         const response = await fetch("http://localhost:3400/pay", {
//             method: "POST",
//         });

//         const data = await response.json();
//         const paymentSessionId = data.paymentSessionId;

//         // Initilize checkout options
//         let checkoutOptions = {
//         paymentSessionId: paymentSessionId,
//         redirectTarget: "_self",
//         };

//         // Start the ckecout process
//         await cashfree.checkout(checkoutOptions);
//     }catch(err) {
//         console.error("Error:", err)
//     }
// });