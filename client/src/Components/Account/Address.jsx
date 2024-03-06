import React from 'react'
import { Updating } from '../Updating/Updating';

export const Address = () => {
  return (
    <div className="desktop_big flex-1 box-border bg-white rounded-xl min-h-[300px] h-fit p-6">
      <div className="desktop_head text-[24px] font-bold leading-8">
        <h1>Sổ địa chỉ nhận hàng</h1>
      </div>
      <Updating />
    </div>
  );
}
