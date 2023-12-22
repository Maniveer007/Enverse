import { ethers } from 'ethers'
import React, { useState } from 'react'
import abi from '../abi/CRYPTO_RED_LETTER.json'
import { useNavigate, useParams } from 'react-router-dom'

const Participate_com = (props) => {
    const navigate=useNavigate()
    const [isclaimed,setisclaimed]=useState(false)
    const [error,seterror]=useState(false)
    const {contractaddress}=useParams()

    const participatee=async ()=>{
        const provider=new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", []);
        const signer =await provider.getSigner();
        const addr=await signer.getAddress()
        console.log(addr);
        console.log(props.address);
        console.log(signer);
        const contract =new ethers.Contract(props.address,[
            {
                "inputs": [],
                "name": "participate",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "requestId",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            }]
            ,signer)
        // console.log(await provider.getCode(props.address));
        console.log(contract);
        try {
            const tx=await contract.participate({gasLimit:3000000});
            console.log(tx);
            await tx.wait();
            setisclaimed(true);
            navigate(`/claim/${contractaddress}`)
        } catch (error) {
            console.log(error);
            seterror(true)
        }
    }
  return (<>{
    error?(<><h1>error</h1></>):(<>{isclaimed?(<>
    <div>Congratulations you have participated successfully</div>
    </>):(<div ><button className= "bg-orange-500 text-white rounded px-4 py-2 hover:bg-orange-600 focus:outline-none focus:bg-orange-600 ml-20 mt-5" onClick={participatee}>Claim Participation</button></div>)}</>)
  }
    
  </>
  )
}

export default Participate_com