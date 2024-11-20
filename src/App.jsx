import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import HomePage from './Pages/HomePage';
import  NavBar  from "./Components/NavBar"
import DetailsPage from "./Pages/DetailsPage";
import TypesPage from "./Pages/TypesPage"




function App() {

  return <>
  <BrowserRouter>
  <NavBar></NavBar>
  <Routes>
  <Route path='/' element={<HomePage></HomePage>}></Route>
  <Route path='/pokemon/:id' element={<DetailsPage></DetailsPage>}></Route> 
  <Route path='/types/:type' element={<TypesPage></TypesPage>}></Route>
  {/* <Route path='/items/:name' element={<DetailsItems></DetailsItems>}></Route>
  <Route path= '/sorts' element={<SortPage></SortPage>}></Route>
  <Route path= '/sorts/:id' element={<SortDetails></SortDetails>}></Route>  */}







  </Routes>
  
  
  
  </BrowserRouter>
  
  </>
}

export default App;