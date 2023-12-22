import { BigNumber, ethers } from 'ethers'
import React, { useState } from 'react'
import { NFT_RED_LETTER } from '../bytecode/NFT_RED_LETTER'
import abi from '../abi/NFT_RED_LETTER.json'
import { phase } from '../phase';
import AES from 'crypto-js/aes';

const CreateNFTredletter = () => {
  const [iscreated,setiscreated]=useState(false);
  const [error , seterror] = useState(false) ;
  const[ercaddress,setercaddress]=useState()
//   const[maxparticipants,setmaxparticipants]=useState()
  const[NFTS,setNFTS]=useState()
  const [contractaddress,setcontractaddress]=useState("")

  const createNFT=async()=>{
    
    const provider=new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer =await provider.getSigner();
      const address=await signer.getAddress();
console.log('rsgs');
const Contract=new ethers.ContractFactory(abi,NFT_RED_LETTER,signer);
console.log('rsgs');

const contract=await Contract.deploy("0xa0B66fe91aaC3cd0D11E62DD3fB7aC30FD8664dd",ercaddress)
console.log('rsgs');
const txhash=await contract.deployTransaction.wait();
console.log(txhash.contractAddress);
      setcontractaddress(txhash.contractAddress)
      const erc20=new ethers.Contract(ercaddress,[ {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }],signer)

    const log=await erc20.transfer(txhash.contractAddress,NFTS,{gasLimit:3000000});
    console.log(log);
await log.wait()
    
    const log2=await contract.load({gasLimit:3000000})
    console.log(log2);

    const linkcontract=new ethers.Contract('0x326C977E6efc84E512bB9C30f76E30c160eD06FB',[{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}],signer)
        
    const linktx=await linkcontract.transfer(txhash.contractAddress,BigNumber.from("400000000000000000"),{gasLimit:3000000})

    await linktx.wait();
    const encryptWithAES = (text, passphrase) => {
        return AES.encrypt(text, passphrase).toString();
      };
      var text=encryptWithAES(txhash.contractAddress,phase)
      text=text.replaceAll('/','_')

      await navigator.clipboard.writeText(`${window.location.href}participate/${text}`)
    setiscreated(true);
  }


  const generatelink=async ()=>{
    const encryptWithAES = (text, passphrase) => {
        return AES.encrypt(text, passphrase).toString();
      };
    var text=encryptWithAES(contractaddress,phase)
    console.log(text);
      text=text.replaceAll('/','_')
    console.log(text);

    await navigator.clipboard.writeText(`${window.location.href}participate/${text}`)
    window.alert("copied")
    console.log("copyed");
}

  return (<>{!error ? (
  <>
  {
    iscreated?(<><div><button onClick={generatelink}>Click to generate link</button></div></>):
    (
        <div className=" bg-gradient-to-t from-fuchsia-400 via-fuchsia-200 to-fuchsia-400 min-h-screen flex items-center justify-center">
        <div className = "bg-gradient-to-tl from-yellow-300 via-yellow-100 to-yellow-300 rounded-lg p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Create Crypto Red letter</h2>
            {/* <form> */}
                <div className="mb-4">
                    <label for="text" className="block text-gray-600">Enter Erc20 address</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        placeholder="Erc20 address"
                        onChange={(e)=>{setercaddress(e.target.value)}}
                    />
                </div>

                {/* <div className="mb-4">
                    <label for="number" className="block text-gray-600">Enter total participants</label>
                    <input
                        type="number"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        placeholder="Total participants"
                        onChange={(e)=>{setmaxparticipants(e.target.value)}}
                    />
                </div> */}

                <div className="mb-4">
                    <label for="number" className="block text-gray-600">Enter total NFT's</label>
                    <input
                        type="number"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        placeholder="Total NFT's"
                        onChange={(e)=>{setNFTS(e.target.value)}}
                    />
                </div>

                <button
                    onClick={createNFT}
                    className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ml-20 mt-5"
                >
                    Create NFT
                </button>
            {/* </form> */}
        </div>
    </div>
    )
  }
  </> ) : 
    (
        <h1>Error Occured </h1>
    )
  }
  </>
  )
}

export default CreateNFTredletter