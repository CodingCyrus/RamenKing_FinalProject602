import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToOrder } from '../actions/orderActions';

export default function FoodItem({ foodItem }) {
  const [quantity, setquantity] = useState(1)
  const [size, setsize] = useState('S')
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //add to order function
  const dispatch = useDispatch()
  function addtoorder() {
    dispatch(addToOrder(foodItem, quantity, size))
  }


  return (
    <div className='shadow p-1 mb-5 bg-white rounded' key={foodItem._id}>

      <div onClick={handleShow}>
        <h1>{foodItem.item}</h1>
        <img src={foodItem.imageURL} alt="ramen" className="img-fluid"></img>
      </div>

      <div className="flex-container">
        <div className='w-50 m-1'>
          <p>Portion Size:</p>
          <select className='form-control' value={size} onChange={(s) => { setsize(s.target.value) }}>
            {foodItem.sizes.map(size => {
              return <option value={size}>{size}</option>
            })}
          </select>
        </div>
        <div className='w-50 m-1'>
          <p>Qty:</p>
          <select className='form-control' value={quantity} onChange={(s) => { setquantity(s.target.value) }}>
            {[...Array(12).keys()].map((x, i) => {
              return <option value={i + 1}>{i + 1}</option>
            })}
          </select>
        </div>
      </div>

      <div className='flex-container'>
        <div className='m-1 w-50'>
          <h2>${foodItem.prices[0][size] * quantity}</h2>
        </div>
        <div className='m-1 w-50'>
          <button className="btn" onClick={addtoorder}>ADD ORDER</button>
        </div>
      </div>

      <Modal show={show}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>{foodItem.item}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img src={foodItem.imageURL} alt="ramen" className="img-fluid"></img>
          <p>{foodItem.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className='btn' onClick={handleClose}>CLOSE</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
