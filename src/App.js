import './App.css'
import { ethers } from 'ethers'
import GreeterABI from './artifacts/contracts/Greeter.sol/Greeter.json'

const greeterContractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'

function App() {
  //request access to the user's Metamask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  async function fetchGreeting() {
    if (typeof window.ethereum != undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(
        greeterContractAddress,
        GreeterABI.abi,
        provider
      )

      try {
        const data = await contract.greet()
        console.log('from solidty Greeter contract, greet() method', data)
      } catch (err) {
        console.log('Error,' + err)
      }
    }
  }

  async function setGreeting() {
    if (typeof window.ethereum != undefined) {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(
        greeterContractAddress,
        GreeterABI.abi,
        signer
      )
      const transaction = await contract.setGreeting(
        'Hello Ethereum!, I am Kannan'
      )
      await transaction.wait()

      fetchGreeting()
    }
  }

  return (
    <div className="App">
      <h1>Hello DApp Development</h1>
      <button onClick={fetchGreeting}>Fetch Greeting</button>
      <button onClick={setGreeting}>Set Greeting</button>
    </div>
  )
}

export default App
