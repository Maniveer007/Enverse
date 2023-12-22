import { ethers } from 'ethers'
import React, { useState } from 'react'

const Claim_paarticipation = (props) => {
    const [isclaimed,setisclaimed]=useState(false)
    const [error,seterror]=useState(false)

    const claimparticipation=async ()=>{
        const provider=new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", []);
        const signer =await provider.getSigner();
        console.log(props.address);
        const contract =new ethers.Contract(props.address,[
            {
                "inputs": [],
                "name": "claim",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],signer)
        try {
            const tx=await contract.claim({gasLimit:3000000});
            await tx.wait();
            setisclaimed(true);
        } catch (error) {
            console.log(error);
            seterror(true)
        }
    }
  return (<>{
    error?(<><h1>error</h1></>):(<>{isclaimed?(<>Congratulations you have claimed successfully</>):(<div><button className= "bg-orange-500 text-white rounded px-4 py-2 hover:bg-orange-600 focus:outline-none focus:bg-orange-600 ml-20 mt-5" onClick={claimparticipation}>Claim Participation</button></div>)}</>)
  }
    
  </>
  )
}

export default Claim_paarticipation