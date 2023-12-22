import React, { useState } from 'react'
import CryptoJS from 'crypto-js';
import { useParams } from 'react-router-dom'
import { phase } from '../phase';
import Participate_com from '../components/participate';
import redletter from './redlet.png'

const Participate = () => {
    const [error , seterror] = useState(false) ;
    const [isdecrepted,setisdecrepted]=useState(false)
    var {contractaddress}=useParams()
    console.log(contractaddress);
    const [address,setaddress]=useState("")
    contractaddress=contractaddress.replaceAll('_','/')

    // setaddress(contractaddress)

    const decryptWithAES = (encryptedText, passphrase) => {
        const bytes = CryptoJS.AES.decrypt(encryptedText, passphrase);
        return bytes.toString(CryptoJS.enc.Utf8);
    };


    console.log(decryptWithAES(contractaddress,phase));

    const decrypt=()=>{
        // console.log(decryptWithAES(contractaddress,phase));
        const add=decryptWithAES(contractaddress,phase)
        setaddress(add);
        // console.log(address);
        setisdecrepted(true)
    }
  return (<>{
    !error ? (
    <div className=" bg-gradient-to-t from-fuchsia-400 via-fuchsia-200 to-fuchsia-400 min-h-screen flex items-center justify-center">{
    isdecrepted?(<><div ><Participate_com address={decryptWithAES(contractaddress,phase)}/>
    </div></>):(<><a  onClick={decrypt}><img className = "cursor-pointer" src={redletter} alt = "Redletter" /></a></>)
    // {decryptWithAES(contractaddress,phase)}</>):(<><a onClick={decrypt}><img src={"https://www.announcementconverters.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/C/-/C-CRE75-EURO.jpg"}/></a></>)
    }</div>) : 
      (
        <h1>Error Occured</h1>
      )
    }
    </>
  )
}

export default Participate