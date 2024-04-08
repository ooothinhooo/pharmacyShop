import { Navbar } from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { PharmaHome } from "./Pages/PharmaHome";
import { PharmaCategory } from "./Pages/PharmaCategory";
import { PharmaProduct } from "./Pages/PharmaProduct";
import { PharmaCart } from "./Pages/PharmaCart";
// import { LoginSignup } from "./Pages/LoginSignup";
import { Footer } from "./Components/Footer/Footer";
import { Page404 } from "./Pages/Page404";
import { Checkout } from "./Pages/Checkout";
import { Account } from "./Pages/Account";
function App() {
  return (
    <div className="app">
      <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<PharmaHome/>}></Route>
            <Route path="/duoc-pham" element={<PharmaCategory title="Dược Phẩm" category={"Dược phẩm"}/>}></Route>
            <Route path="/cham-soc-suc-khoe" element={<PharmaCategory title="Chăm sóc sức khoẻ" category={"Chăm sóc sức khoẻ"}/>}></Route>
            <Route path="/cham-soc-ca-nhan" element={<PharmaCategory title="Chăm sóc cá nhân" category={"Chăm sóc cá nhân"}/>}></Route>
            <Route path="/san-pham-tien-loi" element={<PharmaCategory title="Sản phẩm tiện lợi" category={"Sản phẩm tiện lợi"}/>}></Route>
            <Route path="/thuc-pham-chuc-nang" element={<PharmaCategory title="Thực phẩm chức năng" category={"Thực phẩm chức năng"}/>}></Route>
            <Route path="/me-va-be" element={<PharmaCategory title="Mẹ và Bé" category={"Mẹ và Bé"}/>}></Route>
            <Route path="/cham-soc-nhan-sac" element={<PharmaCategory title="Chăm sóc nhan sắc" category={"Chăm sóc nhan sắc"}/>}></Route>
            <Route path="/thiet-bi-y-te" element={<PharmaCategory title="Thiết bị y tế" category={"Thiết bị y tế"}/>}></Route>

            <Route path="/products" element={<PharmaProduct/>}>
              <Route path=":productId" element={<PharmaProduct/>}></Route>
            </Route>
            
            <Route path="/cart" element={<PharmaCart/>}></Route>
            <Route path="/checkout" element={<Checkout/>}></Route>
            {/* <Route path="/login" element={<LoginSignup />}></Route> */}
            <Route path="/account" element={<Account />}>
              <Route path=":accountOption" element={<Account />}></Route>
            </Route>
            <Route path="*" element={<Page404/>}></Route>
          </Routes>
          <Footer />
      </Router>
    </div>
  );
}

export default App;
