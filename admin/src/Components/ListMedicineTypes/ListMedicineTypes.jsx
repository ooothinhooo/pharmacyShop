// eslint-disable-next-line no-unused-vars
import React from "react";
import { Pagination } from "antd";
import { useEffect } from "react";
import { useState } from "react";

const ListMedicineTypes = () => {
  const [types, setTypes] = useState([]);

  const [current, setCurrent] = useState(1);
  const pageSize = 5;

  const fetchInfo = async () => {
    const response = await fetch("http://localhost:4000/allTypes");
    const data = await response.json();
    setTypes(data.types);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="list_product flex flex-col items-center w-full min-h-[750px] h-auto py-[10px] px-[50px] m-[30px] rounded bg-white">
      <h1 className="my-5">DANH MỤC THUỐC</h1>
      <div className="grid grid-cols-[0.5fr_5fr_1fr_1fr] w-full gap-4">
        <p>Mã</p>
        <p>Tên danh mục</p>
        <p></p>
        <p></p>
      </div>
      <div className="list_product-allProduct w-full">
        <hr />
        {types.length > 0 &&
          types
            .slice((current - 1) * pageSize, current * pageSize)
            .map((type, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-[0.5fr_5fr_1fr_1fr] w-full gap-4 items-center p-3"
                >
                  <p>{type.idtype}</p>
                  <p>{type.nametype}</p>
                  <button className="border p-2 rounded-xl border-primaryColor transition-all duration-200 hover:bg-green-500 hover:text-white">
                    Chỉnh sửa
                  </button>
                  <button className="hover:text-primaryColor">
                    <i className="fa-solid fa-trash cursor-pointer m-auto"></i>
                  </button>
                </div>
              );
            })}

        {
          <Pagination
            className="text-center"
            current={current}
            onChange={setCurrent}
            pageSize={pageSize}
            total={types.length}
            responsive={true}
          />
        }
      </div>
    </div>
  );
};

export default ListMedicineTypes;
