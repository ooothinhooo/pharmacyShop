import React from 'react'
import { Updating } from '../Updating/Updating';

export const Test_reports = () => {
  return (
    <div className="desktop_big flex-1 box-border bg-white rounded-xl min-h-[300px] h-fit p-6">
      <div className="desktop_head text-[24px] font-bold leading-8">
        <h1>Kết quả xét nghiệm</h1>
      </div>
      <Updating />
    </div>
  );
}
