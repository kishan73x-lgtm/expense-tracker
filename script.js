const form = document.getElementById("expenseForm")   
const titleInput = document.getElementById("title")   
const amountInput = document.getElementById("amount")   
const expenseList = document.getElementById("expenseList")   
const totalDisplay = document.getElementById("total")   


let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editId = null;


function savedLocalStorage(){
     localStorage.setItem("expenses",JSON.stringify(expenses));
}

 

function renderExpense(){
     expenseList.innerHTML = ""

     let total = 0;

     expenses.forEach(exp => {
          total +=Number(exp.amount) ;

          const li = document.createElement("li");
          li.innerHTML = `
          <span>${exp.title}  = 💸${exp.amount}</span>
          <div class="actions">
               <button data-id ="${exp.id}" data-action ="edit">✎</button>
               <button data-id ="${exp.id}" data-action ="delete">🗑</button>
          </div>
          `;
          expenseList.appendChild(li);
          
     });
     totalDisplay.textContent = total;
     
}


form.addEventListener("submit",(e)=>{
     e.preventDefault()
     const title = titleInput.value.trim();
     const amount = amountInput.value.trim();
     
     
     if(!title || amount<= 0){
          alert("enter valid expense details") 
          return;
     }
     if(editId){
          expenses = expenses.map(exp => exp.id === editId ? {...exp,title,amount}: exp);
          editId = null;
          form.querySelector("button").textContent = "✔"
     }else{
          expenses.push({
          id:Date.now().toString(),
          title,
          amount
     })
     }
     titleInput.value = ""
     amountInput.value = ""


     savedLocalStorage()   
     renderExpense()
})


expenseList.addEventListener("click",(e)=>{
     const  id = e.target.dataset.id;
     const action = e.target.dataset.action;

     if(!id) return;

     if(action === "delete"){
          expenses = expenses.filter(exp => exp.id !== id);
     }

     if(action === "edit"){
          const expense = expenses.find(exp => exp.id === id);
          titleInput.value = expense.title;
          amountInput.value = expense.amount;

          editId = id;
          form.querySelector("button").textContent = "🗘"
     }
     
     savedLocalStorage()
     renderExpense()
});

renderExpense()


const themeToggle = document.getElementById("themeToggle");

if(localStorage.getItem("theme") === "dark"){
     document.body.classList.add("dark");
     themeToggle.textContent = "🔆"
}

themeToggle.addEventListener("click",()=>{
     document.body.classList.toggle("dark");


const isDark = document.body.classList.contains("dark");

localStorage.setItem("theme" , isDark ? "dark" : "light");

themeToggle.textContent = isDark ? "🔆": "🌙";
})