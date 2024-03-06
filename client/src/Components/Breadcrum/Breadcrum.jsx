import React from 'react'

export const Breadcrum = (props) => {
    const {product} = props;
   return (
    <div className='breadcrum py-4 container text-[14px]'>
        Pharma Shop <i className="fa-solid fa-angle-right px-2 text-gray-400"></i> {product.nametype}  <i className="fa-solid fa-angle-right px-2 text-gray-400"></i> {product.name}
    </div>
  )
}
