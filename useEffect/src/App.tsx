import { useState } from "react";
import "./App.css";
import ProductList from "./component/ProductList";

function App() {
  const [category, setCategory] = useState('')
  
  return (
    <>
      <select name="" className="form-select" onChange={(Event) => setCategory(Event.target.value)}>
        <option value =""></option>
        <option value="clothing">clothing</option>
        <option value="Household">Household</option>
        
      </select>
      <ProductList  category={category} />
    </>
  );
}

export default App;
