import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterItems } from '../actions/menuitemsActions'

export default function Filter() {
    const dispatch = useDispatch()
    const [searchkey, setsearchkey] = useState('')
    const [category, setcategory] = useState('all')
  return (
    <div className='container'>
        <div className='row justify-content center'>

            <div className="col-md-3 w-100">
                <input
                onChange={(e)=>{setsearchkey(e.target.value)}}
                value={searchkey} type="text" className = "form-control w-100" placeholder="search menu items"/>
            </div>
            <div className='col-md-3 w-100'>
                <select className='form-control w-100 mt-2' value={category} onChange={(e)=>setcategory(e.target.value)}>
                    <option value="all">All</option>
                    <option value="ramen">Ramen</option>
                    <option value="rice">Rice</option>
                    <option value="dumpling">Dumplings</option>
                </select>
            </div>
            <div className='col-md-3 w-100'>
                <button className='btn w-100 mt-2' onClick={()=>{dispatch(filterItems(searchkey , category))}}>FILTER</button>
            </div>

        </div>
    </div>
  )
}

