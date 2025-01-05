import Form from "./Componenets/Form";
import { useState } from "react";
import ExpenseList from "./Expense-Tracker/components/expenseList";
import ExpenseFilter from "./Expense-Tracker/components/ExpenseFilter";
import ExpenseForm from "./Expense-Tracker/components/ExpenseForm";
import categories from "./Expense-Tracker/categories";
import { set } from "zod";
import "./App.css"

function App() {
  const [selectedCategory,setSelectedCategory]=useState('');
  const [expenses,setExpenses]=useState([
    {
      id: 1,
      description: "Example",
      amount: 0,
      category: "Groceries",
    }
    
  ]);

  const visibleExpenses = selectedCategory ? expenses.filter((e) => e.category === selectedCategory) : expenses;
   
  return (
    <div>
      <div className="mb-5">
        <ExpenseForm onSubmit={expense => setExpenses([...expenses,{...expense,id: expenses.length + 1}])
        } />
      </div>
      <div className="mb-3">
      <ExpenseFilter onSelectCategory={(category) => setSelectedCategory(category) }/> 
      </div>
       
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter(e=>e.id !== id))}
      />
    </div>
  );
}
export default App;
