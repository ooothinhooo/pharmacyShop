import React, { useState } from "react";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetail, setProductDetail] = useState({
    name: "",
    type_medicine: "1",
    dosage: "",
    usage: "",
    unit: "Viên",
    packaging: "",
    effect: "",
    instructions: "",
    description: "",
    quantity: "",
    price: "",
    sale: "",
    image: "",
  });
  const imageHandle = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandle = (e) => {
    setProductDetail({ ...productDetail, [e.target.name]: e.target.value });
  };

  const AddProduct = async () => {
    console.log(productDetail);

    let responseData;
    let product = productDetail;
    let formData = new FormData();
    formData.append("product", image);

    await fetch('http://localhost:4000/upload',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    }).then((resp) => resp.json()).then((data) => {responseData=data})

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addProduct',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }).then((resp) => resp.json()).then((data) => {
        data.success ? alert('Thêm sản phẩm thành công') : alert('Thêm sản phẩm thất bại')
      })
    }
  }

  return (
    <div className="add_product box-border w-full max-w-[800px] py-[30px] px-[50px] my-5 mx-[30px] rounded bg-white">
      <div className="add_product-itemField">
        <p>Tên thuốc</p>
        <input
          value={productDetail.name}
          onChange={changeHandle}
          type="text"
          name="name"
          placeholder="Nhập thuốc"
        />
      </div>

      <div className="add_product-itemField">
        <p>Loại thuốc</p>
        <select value={productDetail.type_medicine} onChange={changeHandle} name="type_medicine" className="add_product-selector">
          <option value="1">Dược phẩm</option>
          <option value="2">Chăm sóc sức khoẻ</option>
          <option value="3">Chăm sóc cá nhân</option>
          <option value="4">Sản phẩm tiện lợi</option>
          <option value="5">Thực phẩm chức năng</option>
          <option value="6">Mẹ và Bé</option>
          <option value="7">Chăm sóc sắc đẹp</option>
          <option value="8">Thiết bị y tế</option>
        </select>
      </div>

      <div className="add_product-itemField">
        <p>liều lượng</p>
        <input
          value={productDetail.dosage}
          onChange={changeHandle}
          type="text"
          name="dosage"
          placeholder="Liều lượng"
        />
      </div>

      <div className="add_product-itemField">
        <p>Công dụng</p>
        <input
          value={productDetail.usage}
          onChange={changeHandle}
          type="text"
          name="usage"
          placeholder="Công dụng"
        />
      </div>

      <div className="add_product-itemField">
        <p>Đơn vị tính</p>
        <select value={productDetail.unit} onChange={changeHandle} name="unit" className="add_product-selector">
          <option value="Viên">Viên</option>
          <option value="vỉ">vỉ</option>
          <option value="Hộp">Hộp</option>
          <option value="Cái">Cái</option>
          <option value="Tuýp">Tuýp</option>
        </select>
      </div>

      <div className="add_product-itemField">
        <p>Quy cách đóng gói</p>
        <input
          value={productDetail.packaging}
          onChange={changeHandle}
          type="text"
          name="packaging"
          placeholder="Quy cách đóng gói"
        />
      </div>

      <div className="add_product-itemField">
        <p>Tác dụng phụ</p>
        <input
          value={productDetail.effect}
          onChange={changeHandle}
          type="text"
          name="effect"
          placeholder="Tác dụng phụ"
        />
      </div>

      <div className="add_product-itemField">
        <p>Hướng dẫn sử dụng</p>
        <input
          value={productDetail.instructions}
          onChange={changeHandle}
          type="text"
          name="instructions"
          placeholder="Hướng dẫn sử dụng"
        />
      </div>

      <div className="add_product-itemField">
        <p>Mô tả</p>
        <input
          value={productDetail.description}
          onChange={changeHandle}
          type="text"
          name="description"
          placeholder="Mô tả"
        />
      </div>

      <div className="add_product-itemField">
        <p>Số lượng</p>
        <input
          value={productDetail.quantity}
          onChange={changeHandle}
          type="text"
          name="quantity"
          placeholder="Số lượng"
        />
      </div>

      <div className="add_product-price">
        <div className="add_product-itemField">
          <p>Price</p>
          <input
            value={productDetail.price}
            onChange={changeHandle}
            type="text"
            name="price"
            placeholder="Giá"
          />
        </div>

        <div className="add_product-itemField">
          <p>Sale Price</p>
          <input
            value={productDetail.sale}
            onChange={changeHandle}
            type="text"
            name="sale"
            placeholder="Giảm bao nhiêu phần trăm"
          />
        </div>
      </div>

      <div className="add_product-itemField">
        <p>Hình ảnh</p>
        <label htmlFor="file_input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt="upload"
            className="w-[120px] h-[120px] rounded-xl object-contain my-[10px]"
          />
        </label>
        <input
          onChange={imageHandle}
          type="file"
          name="image"
          id="file_input"
          hidden
        />
      </div>

      <button onClick={() => {AddProduct()}} className="mt-5 w-[160px] h-[50px] rounded bg-primaryColor border-none cursor-pointer text-white text-[16px] font-medium">
        Thêm
      </button>
    </div>
  );
};

export default AddProduct;
