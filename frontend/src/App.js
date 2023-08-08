import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./bootstrapSandStone.min.css"
import { useState,useEffect } from "react";
import { Container } from "react-bootstrap";
import {useDispatch} from "react-redux";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Homescreen from "./Screens/Homescreen";
import Productscreen from "./Screens/Productscreen";
import Cartscreen from "./Screens/Cartscreen";
import LoginScreen from "./Screens/Loginscreen";
import RegisterScreen from "./Screens/Registerscreen";
import ProfileScreen from "./Screens/Profilescreen";
import ProductEditScreen from "./Screens/ProductEditScreen";
import ProductListScreen from "./Screens/ProductListScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";
import OrderListScreen from "./Screens/OrderListScreen";
import { authAction } from "./store/store";

function App() {
  const [products,setproducts] = useState(null)
  const [users,setusers] = useState(null)
  const [orders,setOrders] = useState(null)
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState(null)
 
  
  useEffect(() => {
    fetch("https://shopit-qstb.onrender.com/products")
    .then(res =>{
      
      return res.json()
       
    })
    .then(res1 =>{
        
        setproducts(res1)
        
    })
    .catch(err=>{
      console.log(err)
    })
  
    
  }, [products])

  useEffect(() => {
    fetch( "https://shopit-qstb.onrender.com/users")
    .then(res =>{
      
      return res.json()
       
    })
    .then(res1 =>{
        
        setusers(res1)
        
    })
    .catch(err=>{
      console.log(err)
    })
  
    
  }, [users])

  useEffect(() => {
    fetch( "https://shopit-qstb.onrender.com/orders")
    .then(res =>{
      
      return res.json()
       
    })
    .then(res1 =>{
        
        setOrders(res1)
        
    })
    .catch(err=>{
      console.log(err)
    })
  
    
  }, [orders])

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
  
    if(user){
      dispatch(authAction.login(user))
            if(user.Token=="Admin1001"){
              dispatch(authAction.setAdmin())
            }
    }
  },[])

  function searchProducts(query) {
    const filtered = products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
    console.log(filtered);
    setFilteredProducts(filtered);
  }
  
  return (
    <Router>
      <Header submitHandler={searchProducts}/>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={products?<Homescreen products={ filteredProducts != null ? filteredProducts : products}/>:<h5>Loading..</h5>} exact />
            <Route path="/product/:id" element={products?<Productscreen props={products} />:<h5>Loading..</h5>} />
            <Route path="/cart" element={products?<Cartscreen props={products} />:<h5>Loading..</h5>} />
            <Route path="/login" element={products?<LoginScreen />:<h5>Loading..</h5>} />
            <Route path="/signup" element={products?<RegisterScreen props={products} users = {users} />:<h5>Loading..</h5>} />
            <Route path="/profile" element={products?<ProfileScreen props={products} />:<h5>Loading..</h5>} />
            <Route path="/productedit" element={products?<ProductEditScreen props={products} />:<h5>Loading..</h5>} />
            <Route path="/productlist" element={products?<ProductListScreen props={products} />:<h5>Loading..</h5>} />
            <Route path="/payment" element={products?<PaymentScreen props={products} />:<h5>Loading..</h5>} />
            <Route path="/shipping" element={products?<ShippingScreen props={products} />:<h5>Loading..</h5>} />
            <Route path='/order/:id' element={orders?<OrderScreen orders={orders} users={users}/>:<h5>Loading..</h5>} />
            <Route path="/placeorder" element={products?<PlaceOrderScreen props={products} />:<h5>Loading..</h5>} />
            <Route path='/orderlist' element={<OrderListScreen orders={orders} users={users}/>} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
