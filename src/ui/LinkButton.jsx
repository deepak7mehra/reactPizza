import React from 'react'
import { Link } from 'react-router-dom'

export default function LinkButton({children,to}) {
  return (
    <Link to={to} className='text-sm hover:underline text-blue-500 hover:text-blue-600'>
    {children}
    </Link>
  )
}
