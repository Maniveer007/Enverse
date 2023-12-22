// import logo from './logo.svg';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Claim from './pages/claim';
import Participate from './pages/participate';



function App() {
 
  return (
    <BrowserRouter>
    {/* <Header/> */}
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/claim/:contractaddress" element={<Claim/>} />
      <Route path="/participate/:contractaddress" element={<Participate/>} />
      {/* <Route path="*" element={<Pagenotfound/>} /> */}
    </Routes></BrowserRouter>
  );
}

export default App;
