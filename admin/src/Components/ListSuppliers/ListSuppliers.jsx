// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Pagination } from "antd";

const ListSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  const [current, setCurrent] = useState(1);
  const pageSize = 5;

  const fetchInfo = async () => {
    const response = await fetch("http://localhost:4000/allSuppliers");
    const data = await response.json();
    setSuppliers(data.suppliers);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="list_product flex flex-col items-center w-full min-h-[750px] h-auto py-[10px] px-[50px] m-[30px] rounded bg-white">
      <h1 className="uppercase text-[28px] font-semibold m-5">NHÀ CUNG CẤP</h1>
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] w-full gap-4">
        <p>Mã</p>
        <p>Tên nhà cung cấp</p>
        <p>Địa chỉ</p>
        <p>Số điện thoại</p>
        <p></p>
        <p></p>
        <p></p>
      </div>
      <div className="list_product-allProduct w-full">
        <hr />
        {suppliers.length > 0 &&
          suppliers
            .slice((current - 1) * pageSize, current * pageSize)
            .map((supplier, index) => {
              if (supplier.status === 2) {
                return (
                  <div
                    key={index}
                    className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] w-full gap-4 items-center p-3"
                  >
                    <p>{supplier.id}</p>
                    <p>{supplier.sup_name}</p>
                    <p>{supplier.sup_address}</p>
                    <p>{supplier.phone}</p>
                    <button className="border p-2 rounded-xl border-primaryColor transition-all duration-200 hover:bg-green-500 hover:text-white">
                      Xem chi tiết
                    </button>
                    <button className="border p-2 rounded-xl border-primaryColor transition-all duration-200 hover:bg-green-500 hover:text-white">
                      Chỉnh sửa
                    </button>
                    <button className="hover:text-primaryColor">
                      <i className="fa-solid fa-trash cursor-pointer m-auto"></i>
                    </button>
                  </div>
                );
              } else {
                return null;
              }
            })}

        {
          <Pagination
            className="text-center"
            current={current}
            onChange={setCurrent}
            pageSize={pageSize}
            total={suppliers.length}
            responsive={true}
          />
        }
      </div>
    </div>
  );
};

export default ListSuppliers;
