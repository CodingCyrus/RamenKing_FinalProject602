import logo from './logo.svg';
import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'
import { BrowserRouter, Routes, Route, Link, Switch } from 'react-router-dom'
import Navbar from './components/NavBar';
import Homescreen from './pages/homepage';
import OrderPage from './pages/orderpage';
import RegisterPage from './pages/registerpage';
import LoginPage from './pages/loginpage';
import UserOrdersPage from './pages/userorderpage'
import Adminpage from './pages/adminpage';
import Additem from './pages/additem';
import Menuitemslist from './pages/menuitemslist';
import Orderslist from './pages/orderslist';
import Userslist from './pages/userslist';
import Edititem from './pages/Edititem';

//Browser Router URL links for application pages and components
function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homescreen />}> </Route>
          <Route path="/order" element={<OrderPage />}> </Route>
          <Route path="/register" element={<RegisterPage />}> </Route>
          <Route path="/login" element={<LoginPage />}> </Route>
          <Route path="/userorders" element={<UserOrdersPage />}> </Route>
          <Route path="/admin" element={<Adminpage />}> </Route>
          <Route path="/admin/" element={<Userslist />}> </Route>
          <Route path="/admin/userslist" element={<Userslist />}> </Route>
          <Route path="/admin/menuitemslist" element={<Menuitemslist />}> </Route>
          <Route path="/admin/additem" element={<Additem />}> </Route>
          <Route path="/admin/orderslist" element={<Orderslist />}> </Route>
          <Route path="/admin/edititem/:itemid" element={<Edititem />}> </Route>
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
