/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import upload_area from "../../assets/upload_area.svg";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const ProductDetail = ({
  productToUpdate,
  onClose,
  productDetail,
  fetchInfo,
}) => {
  const [typeMedicine, setTypeMedicine] = useState([]);
  const [imageProduct, setImageProduct] = useState(false);
  const [updateProduct, setUpdateProduct] = useState({
    id: productToUpdate ? productToUpdate.idm : "",
    name: productToUpdate ? productToUpdate.name : "",
    nametype: productToUpdate ? productToUpdate.idtype : "",
    dosage: productToUpdate ? productToUpdate.dosage : "",
    usage: productToUpdate ? productToUpdate.usage : "",
    unit: productToUpdate ? productToUpdate.unit : "",
    packaging: productToUpdate ? productToUpdate.packaging : "",
    effect: productToUpdate ? productToUpdate.effect : "",
    description: productToUpdate ? productToUpdate.description : "",
    price: productToUpdate ? productToUpdate.price : "",
    sale: productToUpdate ? productToUpdate.sale : "",
    quantity: productToUpdate ? productToUpdate.quantity : "",
    image: productToUpdate ? productToUpdate.image : "",
    instructions: productToUpdate ? productToUpdate.instructions : "",
  });

  const handleChange = (event) => {
    setUpdateProduct({
      ...updateProduct,
      [event.target.name]: event.target.value,
    });
  };

  const fetchTypeMedicine = async () => {
    fetch("http://localhost:4000/allTypes")
      .then((response) => response.json())
      .then((data) => {
        setTypeMedicine(data.types);
      });
  };

  useEffect(() => {
    fetchTypeMedicine();
  }, []);

  const imageHandle = (e) => {
    setImageProduct(e.target.files[0]);
  };

  const UpdateProduct = async () => {
    console.log(updateProduct);

    let responseData = {};
    let product = updateProduct;

    if (imageProduct) {
      let formData = new FormData();
      formData.append("product", imageProduct);

      await fetch("http://localhost:4000/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })
        .then((resp) => resp.json())
        .then((data) => {
          responseData = data;
        });
      if (responseData.success) {
        product.image = responseData.image_url;
      }
    }

    await fetch("http://localhost:4000/updateProduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          fetchInfo();
          toast.success("Câp nhật sản phẩm thành công");
          onClose();
        } else {
          toast.error("Cập nhật sản phẩm thất bại");
          onClose();
        }
      });
  };

  return (
    // <div className="fixed z-30 top-0 left-0 right-0 bottom-0 bg-[rgba(0,_0,_0,_0.3)] flex justify-center items-center">
    //   <div className="bg-white min-w-[650px] max-w-[400px] max-h-[calc(100vh-100px)] h-auto rounded-md px-4 w-full">
    //     <div className="flex justify-start items-center py-[10px] relative">
    //       <h1 className="text-[24px] font-medium">
    //         {productToUpdate ? "Cập nhật sản phẩm" : "Chi tiết sản phẩm"}
    //       </h1>
    //       <i
    //         onClick={onClose}
    //         className="fa-solid fa-xmark text-[#000] text-[24px] absolute right-[0px] top-[10px] cursor-pointer"
    //       ></i>
    //     </div>

    //     <div className="border-b my-3"></div>

    //     <table className="w-full border-separate [border-spacing:0_10px]">
    //       <tbody>
    //         <tr className="text-left">
    //           <td className="w-[30%] align-top font-semibold">Mã Thuốc:</td>
    //           <td>{productDetail.id}</td>
    //         </tr>
    //         <tr className="text-left">
    //           <td className="w-[30%] align-top font-semibold">Tên thuốc:</td>
    //           <td>{productDetail.name}</td>
    //         </tr>
    //         <tr className="text-left">
    //           <td className="w-[30%] align-top font-semibold">Loại thuốc:</td>
    //           <td>{productDetail.nametype}</td>
    //         </tr>
    //         <tr className="text-left">
    //           <td className="w-[30%] align-top font-semibold">Liều lượng:</td>
    //           <td>{productDetail.dosage}</td>
    //         </tr>
    //         <tr className="text-left">
    //           <td className="w-[30%] align-top font-semibold">Công dụng:</td>
    //           <td>{productDetail.usage}</td>
    //         </tr>
    //         <tr className="text-left">
    //           <td className="w-[30%] align-top font-semibold">Đơn vị tính:</td>
    //           <td>{productDetail.unit}</td>
    //         </tr>
    //         <tr className="text-left">
    //           <td className="w-[30%] align-top font-semibold">
    //             Quy cách đóng gói:
    //           </td>
    //           <td>{productDetail.packaging}</td>
    //         </tr>
    //         <tr className="text-left">
    //           <td className="w-[30%] align-top font-semibold">Tác dụng phụ:</td>
    //           <td>{productDetail.effect}</td>
    //         </tr>
    //         <tr className="text-left">
    //           <td className="w-[30%] align-top font-semibold">Mô tả ngắn:</td>
    //           <td>{productDetail.description}</td>
    //         </tr>
    //       </tbody>
    //     </table>

    //     <div className="flex justify-end my-8">
    //       <button
    //         onClick={onClose}
    //         className="border py-2 px-3 rounded-md mr-4 bg-neutral-200 font-medium hover:bg-neutral-300"
    //       >
    //         Quay lại
    //       </button>
    //       {productToUpdate && (
    //         <button
    //           // onClick={() => updateAddress()}
    //           className="border py-2 px-4 rounded-md bg-green-600 text-white font-medium hover:bg-green-800"
    //         >
    //           Cập nhật
    //         </button>
    //       )}
    //     </div>
    //   </div>
    <div className=" fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50">
      <div className="max-w-[650px] w-[650px] relative">
        <div className="bg-white rounded grid gap-2">
          {/* <div className="absolute w-full flex-col space-y-1.5 flex mt-2 md:mt-0 justify-center px-4 py-2.5 md:px-6 md:pt-6 md:pb-4"></div> */}
          <div className="flex justify-start items-center px-[10px] relative">
            <h1 className="text-[24px] font-medium">
              {productToUpdate ? "Cập nhật sản phẩm" : "Chi tiết sản phẩm"}
            </h1>
          </div>
          <div className="border-b"></div>
          <div className="grid">
            <div
              className="overflow-hidden h-full max-h-[calc(100dvh-138px)] px-4 [&>div]:relative md:max-h-[calc(100vh-300px)] md:px-4"
              style={{
                position: "relative",
                "--radix-scroll-area-corner-width": "0px",
                "--radix-scroll-area-corner-height": "0px",
              }}
            >
              <style>{`
                [data-radix-scroll-area-viewport] {
                  scrollbar-width: none;
                  -ms-overflow-style: none;
                  -webkit-overflow-scrolling: touch;
                }
                [data-radix-scroll-area-viewport]::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <div
                data-radix-scroll-area-viewport
                className="h-full w-full rounded-[inherit]"
                style={{ overflow: "hidden scroll" }}
              >
                <table className="w-full border-separate [border-spacing:0_10px]">
                  <tbody>
                    <tr className="text-left">
                      <td className="w-[30%] align-top font-semibold">
                        Mã Thuốc:
                      </td>
                      {productToUpdate ? (
                        <td>{updateProduct.id}</td>
                      ) : (
                        <td>{productDetail.idm}</td>
                      )}
                    </tr>
                    <tr className="text-left">
                      <td className="w-[30%] align-top font-semibold">
                        Tên thuốc:
                      </td>
                      {productToUpdate ? (
                        <td>
                          <textarea
                            className="outline outline-1 rounded-md p-1"
                            name="name"
                            id=""
                            rows={2}
                            cols={50}
                            value={updateProduct.name}
                            onChange={handleChange}
                          ></textarea>
                        </td>
                      ) : (
                        <td>{productDetail.name}</td>
                      )}
                    </tr>
                    <tr className="text-left">
                      <td className="w-[30%] align-top font-semibold">
                        Loại thuốc:
                      </td>
                      {productToUpdate ? (
                        <td>
                          <select
                            className="outline-1 outline rounded-md"
                            name="nametype"
                            value={updateProduct.nametype}
                            onChange={handleChange}
                          >
                            {typeMedicine.map((type) => (
                              <option key={type.idtype} value={type.idtype}>
                                {type.nametype}
                              </option>
                            ))}
                          </select>
                        </td>
                      ) : (
                        <td>{productDetail.nametype}</td>
                      )}
                    </tr>
                    <tr className="text-left">
                      <td className="w-[30%] align-top font-semibold">
                        Liều lượng:
                      </td>
                      {productToUpdate ? (
                        <td>
                          <textarea
                            className="outline outline-1 rounded-md p-1"
                            name="dosage"
                            id=""
                            rows={2}
                            cols={50}
                            value={updateProduct.dosage}
                            onChange={handleChange}
                          ></textarea>
                        </td>
                      ) : (
                        <td>{productDetail.dosage}</td>
                      )}
                    </tr>
                    <tr className="text-left">
                      <td className="w-[30%] align-top font-semibold">
                        Công dụng:
                      </td>
                      {productToUpdate ? (
                        <td>
                          <textarea
                            className="outline outline-1 rounded-md p-1"
                            name="usage"
                            id=""
                            rows={5}
                            cols={50}
                            value={updateProduct.usage}
                            onChange={handleChange}
                          ></textarea>
                        </td>
                      ) : (
                        <td>{productDetail.usage}</td>
                      )}
                    </tr>
                    <tr className="text-left">
                      <td className="w-[30%] align-top font-semibold">
                        Đơn vị tính:
                      </td>
                      {productToUpdate ? (
                        <td>
                          <input
                            type="text"
                            name="unit"
                            className="border-b outline-none w-full"
                            value={updateProduct.unit}
                            onChange={handleChange}
                          />
                        </td>
                      ) : (
                        <td>{productDetail.unit}</td>
                      )}
                    </tr>
                    <tr className="text-left">
                      <td className="w-[30%] align-top font-semibold">
                        Quy cách đóng gói:
                      </td>
                      {productToUpdate ? (
                        <td>
                          <input
                            type="text"
                            name="packaging"
                            className="border-b outline-none w-full"
                            value={updateProduct.packaging}
                            onChange={handleChange}
                          />
                        </td>
                      ) : (
                        <td>{productDetail.packaging}</td>
                      )}
                    </tr>
                    <tr className="text-left">
                      <td className="w-[30%] align-top font-semibold">
                        Tác dụng phụ:
                      </td>
                      {productToUpdate ? (
                        <td>
                          <textarea
                            className="outline outline-1 rounded-md p-1"
                            name="effect"
                            id=""
                            rows={2}
                            cols={50}
                            value={updateProduct.effect}
                            onChange={handleChange}
                          ></textarea>
                        </td>
                      ) : (
                        <td>{productDetail.effect}</td>
                      )}
                    </tr>

                    <tr className="text-left">
                      <td className="w-[30%] align-top font-semibold">
                        Hướng dẫn sử dụng:
                      </td>
                      {productToUpdate ? (
                        <td>
                          <textarea
                            className="outline outline-1 rounded-md p-1"
                            name="instructions"
                            id="instructions"
                            rows={2}
                            cols={50}
                            value={updateProduct.instructions}
                            onChange={handleChange}
                          ></textarea>
                        </td>
                      ) : (
                        <td>{productDetail.instructions}</td>
                      )}
                    </tr>

                    <tr className="text-left">
                      <td className="w-[30%] align-top font-semibold">
                        Số lượng:
                      </td>
                      {productToUpdate ? (
                        <td>
                          <input
                            value={updateProduct.quantity}
                            onChange={handleChange}
                            type="text"
                            name="quantity"
                            placeholder="Số lượng"
                            className="border-b outline-none w-full"
                          />
                        </td>
                      ) : (
                        <td>{productDetail.quantity}</td>
                      )}
                    </tr>

                    <tr className="text-left">
                      <td className="w-[30%] align-top font-semibold">Giá:</td>
                      {productToUpdate ? (
                        <td>
                          <input
                            value={updateProduct.price}
                            onChange={handleChange}
                            type="text"
                            name="price"
                            placeholder="Giá"
                            className="border-b outline-none w-full"
                          />
                        </td>
                      ) : (
                        <td>{productDetail.price}</td>
                      )}
                    </tr>

                    <tr className="text-left">
                      <td className="w-[30%] align-top font-semibold">
                        Giá Sale:
                      </td>
                      {productToUpdate ? (
                        <td>
                          <input
                            value={updateProduct.sale}
                            onChange={handleChange}
                            type="text"
                            name="sale"
                            placeholder="Giảm bao nhiêu phần trăm"
                            className="border-b outline-none w-full"
                          />
                        </td>
                      ) : (
                        <td>{productDetail.sale}</td>
                      )}
                    </tr>

                    <tr className="text-left">
                      <td className="w-[30%] align-top font-semibold">
                        Mô tả ngắn:
                      </td>
                      {productToUpdate ? (
                        <td>
                          <textarea
                            className="outline outline-1 rounded-md p-1"
                            name=""
                            id=""
                            rows={2}
                            cols={50}
                            value={updateProduct.description}
                            onChange={handleChange}
                          ></textarea>
                        </td>
                      ) : (
                        <td>{productDetail.description}</td>
                      )}
                    </tr>

                    <tr className="text-left">
                      <td className="w-[30%] align-top font-semibold">
                        Hình ảnh sản phẩm:
                      </td>
                      {productToUpdate ? (
                        <td>
                          <label htmlFor="file_input">
                            {imageProduct ? (
                              <img
                                src={URL.createObjectURL(imageProduct)}
                                alt="upload"
                                className="w-[120px] h-[120px] rounded-xl object-contain my-[10px]"
                              />
                            ) : productToUpdate ? (
                              <img
                                src={productToUpdate.image}
                                alt="upload"
                                className="w-[120px] h-[120px] rounded-xl object-contain my-[10px]"
                              />
                            ) : (
                              <img
                                src={upload_area}
                                alt="upload"
                                className="w-[120px] h-[120px] rounded-xl object-contain my-[10px]"
                              />
                            )}
                          </label>
                          <input
                            onChange={imageHandle}
                            type="file"
                            name="image"
                            id="file_input"
                            hidden
                          />
                        </td>
                      ) : (
                        <td>
                          <img
                            src={productDetail.image}
                            alt="upload"
                            className="w-[120px] h-[120px] rounded-xl object-contain my-[10px]"
                          />
                        </td>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute rounded-sm opacity-100 outline-0 hover:opacity-80 [&>svg]:w-6 [&>svg]:h-6 right-3 top-2"
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414z"
                fill="#0D0D0D"
              />
            </svg>
          </button>
          {productToUpdate && (
            <div className="flex items-end justify-center p-2 shadow-top">
              <button
                onClick={() => UpdateProduct()}
                className="relative flex justify-center outline-none font-semibold text-white bg-primaryColor border-0 hover:bg-green-700 text-base px-6 py-3 h-[3.375rem] items-center rounded-lg w-full"
              >
                <span>Cập nhật</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default ProductDetail;
