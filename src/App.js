import logo from './logo.svg';
import './App.css';
import { useState } from 'react'

//the web3 module
import { Web3 } from 'web3';
//import the contract addr and abi

const ADDRESS = "0xf6a55b0df11a1Bc14D65B8E1A28Ff496e436c911";
const ABI = [{"inputs":[{"internalType":"uint256","name":"startingPoint","type":"uint256"},{"internalType":"string","name":"_startingMessage","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"decreaseNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"increaseNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"message","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_newMessage","type":"string"}],"name":"setMessage","outputs":[],"stateMutability":"nonpayable","type":"function"}];	
function App() {
  const [number, setNumber] = useState(["none"]);
  const [currentMessage, setCurrentMessage] = useState(["none"])
  const [newMessage, setNewMessage] = useState("");
  
//initialze web3 OBJECT ie eth or blockchain
const web3 = new Web3(window.ethereum);

//initialize contract  ABI and address
const Ian_contract = new web3.eth.Contract(ABI, ADDRESS);

//reading function 
async function getNumber() {
  const result = await Ian_contract.methods.getNumber().call();

  setNumber(result.toString())
  
}


async function getMessage(){
  const message = await Ian_contract.methods.message().call();
  setCurrentMessage(message);

  getMessage()
}

//writing function
//number
//increasing the number
async function increaseNumber() {
 // connecting the account that is the wallet
 const accountsConnected = await web3.eth.requestAccounts();
 const tx = await Ian_contract.methods.increaseNumber().send({ from: accountsConnected[0] });

 getNumber();
}
async function updateMessage(){
  const connectedAccounts = await web3.eth.requestAccounts();
  const Transaction = await Ian_contract.methods.setMessage(newMessage).send({from: connectedAccounts[0]});

}

// for decreasing the number
async function decreaseNumber(){
  const accountsPresent = await web3.eth.requestAccounts();
  const transact = await Ian_contract.methods.decreaseNumber().send({from: accountsPresent[0] });
  getNumber();
}


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       <button onClick={getNumber}>Get number</button>
       <br/>
       <button>Get Message</button>
       <br/>
       <p>number: {number}</p>
       <button onClick={increaseNumber}>Increase the number</button>
       <br />
       <button onClick={decreaseNumber}>decrease the number</button>
       <br/>
       <button onClick={getMessage}>get Message</button>
       <br />
       <p>message: {currentMessage}</p>

       <input
       type='text'
       value={newMessage}
       onChange={(e) => setNewMessage(e.target.value)}
       placeholder="Enter your message"
       />

    
       
       <br/>
       <button onClick={updateMessage}>update message</button>
       <br />

      </header>
    </div>
  );
  
}

export default App;
