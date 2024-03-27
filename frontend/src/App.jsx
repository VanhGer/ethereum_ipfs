// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Form from "./Form.jsx";
import StoredList from "./StoredList.jsx";
import {useState} from "react";
import axios from 'axios';
function App() {
    const [items, setItems] = useState([]);

    const reloadStore = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/getStore');
            setItems(response.data);
            console.log('Reloaded successfully', response.data);
        } catch (error) {
            console.error('Reloaded failed:', error);
        }
    }
    return (
        <div>
            <h1>Ethereum + IPFS demo </h1>
            <Form/>
            <StoredList items={items}/>
            <div className={"reloadStore"}>
                <button onClick={reloadStore}>Reload</button>
            </div>
        </div>
    )
}

export default App
