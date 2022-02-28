import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllItems } from '../actions/menuitemsActions'
import FoodItem from '../components/FoodItem'
import Filter from '../components/Filter'

export default function Homepage(){
    const dispatch = useDispatch();

    const itemsstate = useSelector(state => state.getAllItemsReducer);

    //check for state of request
    //if loading give response else give error message
    //return all items array from mongodb in react to render foodItem components
    const { items, error, loading } = itemsstate;

    useEffect(() => {
        dispatch(getAllItems());
    }, [dispatch]);

    return (
        <div>
            <Filter/>
            <div className="row justify-content-center">
                {loading ? (<h1>Loading...</h1>) : error ? (<h1>Something went wrong</h1>) : (
                    items.map(foodItem => {

                        return <div className="col-md-4 p-3" key={foodItem._id}>
                            <div className='m-2'>
                                <FoodItem foodItem={foodItem} />
                            </div>
                        </div>
                    })
                )}

            </div>
        </div>
    )
}