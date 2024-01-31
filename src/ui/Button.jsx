import React from 'react'
import { Link } from 'react-router-dom';

export default function Button({children,disabled,to,type,onClick}) {



  const base = 'bg-yellow-400 uppercase font-semibold tracking-wide text-stone-800 rounded-full transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed'

  const styles = {
    primary: base+' px-4 py-3 md:px-6 md:py-4',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    secondary: 'border-2 border-stone-400 uppercase font-semibold tracking-wide text-stone-400 rounded-full transition-colors duration-300 hover:text-stone-800 hover:bg-stone-400 focus:bg-stone-400 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5',
    round:base + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
  }

  if (to)
    return (
      <Link to = {to} className={styles[type]}>{children}</Link>
    );
  
    if (onClick){
      return (
        <button onClick={onClick} className={styles[type]}  disabled={disabled}>{children}</button>
      )
    }

  return (
          <button className={styles[type]}  disabled={disabled}>{children}</button>
  )
}
