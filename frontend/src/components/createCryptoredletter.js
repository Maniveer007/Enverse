import { BigNumber, ethers } from 'ethers';
import React, { useState } from 'react'
import { CRYPTO_RED_LETTER } from '../bytecode/CRYPTO_RED_LETTER';
import AES from 'crypto-js/aes';
import './createCryptoredletter.css';
// require('dotenv').config()
import { phase } from '../phase';
// CRYPTO
import abi from '../abi/CRYPTO_RED_LETTER.json'

const CreateCryptoredletter = () => {
    const [iscreated,setiscreated]=useState(false);
    const [error , seterror] = useState(false) ;
    // const [max,setmax]=useState(0)
    const [price,setprice]=useState(0)
    const [contractaddress,setcontractaddress]=useState("")
    let address;

    const createcontract=async()=>{

        console.log(phase);
        const provider=new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", []);
        const signer =await provider.getSigner();

        const Contract= new ethers.ContractFactory(abi,CRYPTO_RED_LETTER,signer)
        console.log(Contract);
        const contract =await Contract.deploy("0xa0B66fe91aaC3cd0D11E62DD3fB7aC30FD8664dd",{value:ethers.utils.parseUnits(price,"gwei")})
        console.log(contract);
        const txhash=await contract.deployTransaction.wait();
        console.log(txhash);
        setiscreated(true);
        
        // setcontractaddress(txhash.contractAddress)
        // console.log(contractaddress);
        const linkcontract=new ethers.Contract('0x326C977E6efc84E512bB9C30f76E30c160eD06FB',[{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}],signer)
        
        const linktx=await linkcontract.transfer(txhash.contractAddress,BigNumber.from("400000000000000000"))
        
        // await navigator.clipboard.writeText(`${window.location.href}participate/${txhash.contractAddress}`)
        await linktx.wait();
        
        // setcontractaddress(txhash.contractAddress)
        // console.log(contractaddress);
        const encryptWithAES = (text, passphrase) => {
            return AES.encrypt(text, passphrase).toString();
          };
          
        var text=encryptWithAES(txhash.contractAddress,phase)

        text=text.replaceAll('/','_')
        await navigator.clipboard.writeText(`${window.location.href}participate/${text}`)
        window.alert("copied")
    }
const generatelink=async ()=>{
    const encryptWithAES = (text, passphrase) => {
        return AES.encrypt(text, passphrase).toString();
      };
    var text=encryptWithAES(address,phase)
    console.log(text);
      text=text.replaceAll('/','_')
    console.log(text);

    await navigator.clipboard.writeText(`${window.location.href}participate/${text}`)
    // window.alert("copied")
    // window.alert("copied")
    console.log("copyed");
}

  return (<>{!error?(<>{!iscreated?(
      <div className=" bg-gradient-to-t from-fuchsia-400 via-fuchsia-200 to-fuchsia-400 min-h-screen flex items-center justify-center">
        <div className = "bg-gradient-to-tl from-yellow-300 via-yellow-100 to-yellow-300 rounded-lg p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Create Crypto Red letter</h2>
            {/* <form> */}
                {/* <div className="mb-4">
                    <label for="number" className="block text-gray-600">Enter maximum number of participants</label>
                    <input
                    type="number"
                    // id="number"
                    // name="number"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Maximum no. of participants"
                    onChange={(e)=>{setmax(e.target.value)}}
                    />
                </div> */}

                <div className="mb-4">
                    <label for="number" className="block text-gray-600">Enter total prize pool in red letter</label>
                    <input
                    type="number"
                    // id="number"
                    // name="number"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Total prize pool(in Gwei) in Red letter "
                    onChange={(e)=>{setprice(e.target.value)}}
                    />
                </div>

                <button
                    onClick={createcontract}
                    className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ml-20 mt-5"
                >
                    Create Redletter
                </button>
            {/* </form> */}
        </div>
    </div>
        )
        :
        (<div className="bg-gradient-to-t from-fuchsia-400 via-fuchsia-200 to-fuchsia-400 min-h-screen flex items-center justify-center"><button onClick={generatelink} 
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ml-20 mt-5">Click to generate link</button></div>)}
  </>): (
    <h1>Error Occured</h1>
  )
  }
  </>
  );
}

export default CreateCryptoredletter
