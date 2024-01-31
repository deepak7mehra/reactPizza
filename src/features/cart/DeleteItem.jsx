import React from 'react'
import { deleteItem } from './cartSlice'
import { useDispatch } from 'react-redux'
import Button from '../../ui/Button';

export default function DeleteItem({pizzaId}) {
    const dispatch = useDispatch();
  return (
    <Button onClick={()=>dispatch(deleteItem(pizzaId))} type="small">Delete</Button>
  )
}
