import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import { authAction } from '../store/store'
import Message from '../components/Message'



const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [update,setUpdate] = useState(null)
  const [orders, setOrders] = useState(null)
  const [user,setUser] = useState(null)
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token)



 // const orders = useSelector((state) => state.cart.orders)

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

 

  
  let flag = 0
  let userupdate = {}

  const submitHandler = async (e) => {
    
    e.preventDefault()
    if(email==token.email){
      setMessage(null)
    }
    if(email!=token.email){
      setMessage('Invalid Email')
      return;
    }
    if(password!=confirmPassword){

      setMessage('Passwords do not match')
      return;
    }
    else{
      await fetch('https://shopit-qstb.onrender.com/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                if(user.email === email&&password==""){
                    flag = 1
                    userupdate = {
                        ...user,
                        name: name
                    }
                }
                if(user.email === email&&password!=""){
                  flag = 1
                  userupdate = {
                      ...user,
                      name: name,
                      password: password
                  }
              }
            })
        })

        if(flag === 1){
            console.log(userupdate);
            fetch(`https://shopit-qstb.onrender.com/users/${userupdate._id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userupdate)
          })
        dispatch(authAction.login(userupdate))
        setUpdate(true)
    }
    
    

      
      }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {update && <Message variant='success'>{"Updated Succesfully"}</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        
          <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                
                onChange={ event => {
                  const result = event.target.value.replace(/[^a-z]/gi, '');
              
                  setName(result);
                }}
              ></Form.Control>
            </Form.Group>
            {(name ==='' || name.length < 7)? <Message className ="message" variant = 'danger'> Name should consists of minmum 7 characters </Message> :<Message className="message-success" variant = 'success'>Perfect</Message>}
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mb-3' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {password.length< 8 ? <Message className ="message" variant = 'danger'>Password should be {'>'}8 characters</Message> :<Message className="message-success" variant = 'success'>Perfect</Message>}

            <Form.Group className='mb-3' controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {confirmPassword !== password && confirmPassword !== '' ? <Message className ="message" variant = 'danger'>confirm password should be same as password</Message> :<Message className="message-success" variant = 'success'>Perfect</Message>}

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>

                {/* <th>ID</th> */}
                <th>PRICE</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>VIEW ITEMS</th>
             
              </tr>
            </thead>
            <tbody>
              {orders&&orders.filter(order =>order.user_id===token._id ).map((order) => (
                <tr key={order._id}>
                  {/* <td>{orders.id}</td> */}
                  <td>{order.orders.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                     <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                 
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        
      </Col>
    </Row>
  )
}

export default ProfileScreen