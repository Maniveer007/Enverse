// import logo from './logo.svg';

import { useState } from 'react';
import './Home.css'
// import './App.css';
import CreateCryptoredletter from '../components/createCryptoredletter';
import CreateNFTredletter from '../components/createNFTredletter';


const imageContainerStyle = {
  position: 'absolute',
  height: '300px',
  width: '65%',
  top: 0,
  clipPath: 'polygon(0 0, 60% 0, 45% 100%, 0% 100%)', // Adjusted clipPath for the first image
};

function Home() {
  const [error , seterror] = useState(false) ;
  const [crypto,setcrypto] =useState(false)
  const [NFT,setNFT] =useState(false)
  return (
    <>{
      !error ? (
    <>{
      !crypto&&!NFT?(<>
        <div className="bg-gradient-to-t from-fuchsia-400 via-fuchsia-200 to-fuchsia-400 flex min-h-screen flex-col items-center justify-between p-24 relative">
          <div className="bg-gradient-to-tl from-yellow-300 via-yellow-100 to-yellow-300 rounded-lg flex flex-row justify-center items-center space-x-4 transform -skew-x-30 w-full mt-10">
            <div className="w-1/2 h-full" style={imageContainerStyle}>
              <img
                // src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3J5cHRvY3VycmVuY3l8ZW58MHx8MHx8fDA%3D"
                src = "Bit.png"
                alt="Bit Image"
                onClick={()=>{setcrypto(true)}}
                className="object-cover w-full h-full transform skew-x-30 absolute top-0 left-0 cursor-pointer"
                layout="fill"
              />
            </div>
            <div className="w-1/2 h-full" style={{ ...imageContainerStyle, backgroundImage: 'url(http://via.placeholder.com/350x150/fc9fc9)', clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 35% 100%)' }}>
              <img
                // src="https://cdn.pixabay.com/photo/2022/02/19/17/59/nft-7023209_640.jpg"
                src = "NFT.png"
                alt="NFT Image"
                onClick={()=>{setNFT(true)}}
                className="object-cover w-full h-full transform skew-x-30 absolute top-0 left-0 cursor-pointer"
                layout="fill"
              />
            </div>
          </div>
        </div>
      </>):(<>{
        crypto&&(<CreateCryptoredletter/>)||NFT&&(<CreateNFTredletter/>)
      }</>)
    }
    </> ) 
      :
      (
        <h1>Error Occured</h1>
      )
    }
    </>
  );
}

export default Home;
