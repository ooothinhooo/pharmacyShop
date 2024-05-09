import express from "express";
// use pg or mongoose
import pg from "pg";
import mongoose from "mongoose";
// /////////////////////////////
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import cors from "cors";
import { log } from "console";

const app = express();
const port = 4000;

// connect postgresSQL

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "pharmacy",
  password: "Tan281201!",
  port: 5432,
});

db.connect();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
// mongoose.connect(
//   "mongodb+srv://thientan2812:Tan281201!@cluster0.ibc2q3o.mongodb.net/pharmacyShop"
// );

// API creation
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });
const uploadAvatar = multer({ storage: storage });
// Create upload endpoint for images

app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: true,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Create upload user endpoint for images

app.post("/uploadAvatar", uploadAvatar.single("user"), (req, res) => {
  res.json({
    success: true,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Create add product endpoint
app.post("/addProduct", async (req, res) => {
  const {
    name,
    usage,
    unit,
    instructions,
    dosage,
    description,
    packaging,
    quantity,
    effect,
    image,
    price,
    sale,
    type_medicine,
  } = req.body;

  try {
    db.query(
      "INSERT INTO medicines (name, usage, unit, instructions, dosage, description, packaging, quantity, effect, image, price, sale, type_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
      [
        name,
        usage,
        unit,
        instructions,
        dosage,
        description,
        packaging,
        quantity,
        effect,
        image,
        price,
        sale,
        type_medicine,
      ]
    );

    console.log(req.body);

    res.json({
      success: true,
      name: name,
    });
  } catch (err) {
    console.log(err);
  }
});

// Create updates for product endpoint
app.post("/updateProduct", async (req, res) => {
  const {
    id,
    name,
    usage,
    unit,
    instructions,
    dosage,
    description,
    packaging,
    quantity,
    effect,
    image,
    price,
    sale,
    nametype,
  } = req.body;

  console.log(id);
  console.log(name);
  console.log(usage);
  console.log(unit);
  console.log(instructions);
  console.log(dosage);
  console.log(description);
  console.log(packaging);
  console.log(quantity);
  console.log(effect);
  console.log(image);
  console.log(price);
  console.log(sale);
  console.log(nametype);

  try {
    db.query(
      "UPDATE medicines SET name = $1, usage = $2, unit = $3, instructions = $4, dosage = $5, description = $6, packaging = $7, quantity = $8, effect = $9, image = $10, price = $11, sale = $12, type_id = $13 WHERE idm = $14",
      [
        name,
        usage,
        unit,
        instructions,
        dosage,
        description,
        packaging,
        quantity,
        effect,
        image,
        price,
        sale,
        nametype,
        id,
      ]
    );

    res.json({
      success: true,
      name: name,
    });
  } catch (err) {
    console.log(err);
  }
});

// Create delete products endpoint
app.post("/deleteProduct", async (req, res) => {
  const { id } = req.body;

  try {
    db.query("DELETE FROM medicines WHERE idm = $1", [id]);
    res.json({
      success: true,
      message: "Product deleted",
    });
  } catch (err) {
    console.log(err);
  }
});

// Create update products endpoint
app.post("/updateProduct", async (req, res) => {
  let {
    id,
    name,
    usage,
    unit,
    instructions,
    dosage,
    description,
    packaging,
    quantity,
    effect,
    image,
    price,
    sale,
    type_medicine,
  } = req.body;

  try {
    db.query(
      "UPDATE medicines SET name = $1, usage = $2, unit = $3, instructions = $4, dosage = $5, description = $6, packaging = $7, quantity = $8, effect = $9, image = $10, price = $11, sale = $12, type_id = $13 WHERE idm = $14",
      [
        name,
        usage,
        unit,
        instructions,
        dosage,
        description,
        packaging,
        quantity,
        effect,
        image,
        price,
        sale,
        type_medicine,
        id,
      ]
    );

    res.json({
      success: true,
      name: name,
    });
  } catch (err) {
    console.log(err);
  }
});

// Create get all products endpoint
app.get("/allProducts", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM medicines JOIN medicinetypes ON medicines.type_id = medicinetypes.idType"
    );
    res.json({
      success: true,
      products: result.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// Create get all medicine types endpoint
app.get("/allTypes", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM medicinetypes");
    res.json({
      success: true,
      types: result.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// create add type endpoint
app.post("/addType", async (req, res) => {
  let { name } = req.body;

  try {
    db.query("INSERT INTO medicinetypes (nametype) VALUES ($1)", [name]);

    res.json({
      success: true,
      name: name,
    });
  } catch (err) {
    console.log(err);
  }
});

// Create update type endpoint
app.post("/updateType", async (req, res) => {
  let { id, name } = req.body;

  try {
    db.query("UPDATE medicinetypes SET nametype = $1 WHERE idType = $2", [
      name,
      id,
    ]);

    res.json({
      success: true,
      name: name,
    });
  } catch (err) {
    console.log(err);
  }
});

// Create delete medicine type endpoint
app.post("/deleteType", async (req, res) => {
  const { id } = req.body;
  try {
    const check = await db.query("SELECT * FROM medicines WHERE type_id = $1", [
      id,
    ]);
    if (check.rows.length > 0) {
      res.json({
        success: false,
        message: "Type has products",
      });
    } else {
      db.query("DELETE FROM medicinetypes WHERE idType = $1", [id]);
      res.json({
        success: true,
        message: "Type deleted",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// Create get all accounts endpoint
app.get("/allAccounts", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM accounts");
    res.json({
      success: true,
      accounts: result.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// Create update account endpoint
app.post("/updateAccount", async (req, res) => {
  let { id, username, password } = req.body;

  console.log(req.body);
  console.log("id: " + id);
  console.log("username: " + username);
  console.log("password: " + password);

  try {
    db.query("UPDATE accounts SET username = $1, password = $2 WHERE id = $3", [
      username,
      password,
      id,
    ]);

    res.json({
      success: true,
      username: username,
    });
  } catch (err) {
    console.log(err);
  }
});

// Create delete account endpoint
app.post("/deleteAccount", async (req, res) => {
  const { id } = req.body;

  try {
    db.query("DELETE FROM customers WHERE id_user = $1", [id]);
    db.query("DELETE FROM accounts WHERE id = $1", [id]);
    res.json({
      success: true,
      message: "Account deleted",
    });
  } catch (err) {
    console.log(err);
  }
});

// Create get all customers endpoint
app.get("/allCustomers", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM customers JOIN accounts ON customers.id_user = accounts.id LEFT JOIN addresses_user ON accounts.id = addresses_user.ida WHERE addresses_user.default_address = 1 OR addresses_user.default_address IS NULL"
    );
    res.json({
      success: true,
      customers: result.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// Create get all order endpoint
app.get("/allOrdersAdmin", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM orders JOIN accounts ON orders.ida = accounts.id JOIN customers ON customers.id_user = accounts.id"
    );
    res.json({
      success: true,
      orders: result.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// Create get all order details admin endpoint
app.get("/allOrderDetailsAdmin", async (req, res) => {
  const { id } = req.query;
  try {
    const result = await db.query(
      "SELECT * FROM orders_detail JOIN orders ON orders_detail.order_id = orders.order_id JOIN medicines ON orders_detail.medicine_id = medicines.idm JOIN accounts ON orders.ida = accounts.id JOIN customers ON customers.id_user = accounts.id WHERE orders_detail.order_id = $1",
      [id]
    );
    res.json({
      success: true,
      orders: result.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// Create update status order endpoint
app.post("/updateStatusOrder", async (req, res) => {
  const { order_id, status } = req.body;

  console.log("id: " + order_id);
  console.log("status: " + status);

  try {
    db.query("UPDATE orders SET status = $1 WHERE order_id = $2", [
      status,
      order_id,
    ]);
    res.json({
      success: true,
      message: "Status updated",
    });
  } catch (err) {
    console.log(err);
  }
});

// Create get all suppliers endpoint
app.get("/allSuppliers", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM suppliers");
    res.json({
      success: true,
      suppliers: result.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// Create add supplier endpoint
app.post("/addSupplier", async (req, res) => {
  let { name, phone, address } = req.body;

  try {
    db.query(
      "INSERT INTO suppliers (sup_name, sup_phone, sup_address) VALUES ($1, $2, $3)",
      [name, phone, address]
    );

    res.json({
      success: true,
      name: name,
    });
  } catch (err) {
    console.log(err);
  }
});

// Create update supplier endpoint
app.post("/updateSupplier", async (req, res) => {
  let { id, supplier } = req.body;

  try {
    db.query(
      "UPDATE suppliers SET sup_name = $1, sup_phone = $2, sup_address = $3 WHERE id = $4",
      [supplier.name, supplier.phone, supplier.address, id]
    );

    res.json({
      success: true,
      name: supplier.name,
    });
  } catch (err) {
    console.log(err);
  }
});

// Create delete supplier endpoint
app.post("/deleteSupplier", async (req, res) => {
  const { id } = req.body;

  try {
    db.query("DELETE FROM suppliers WHERE id = $1", [id]);
    res.json({
      success: true,
      message: "Supplier deleted",
    });
  } catch (err) {
    console.log(err);
  }
});

// Create get all voucher endpoint
app.get("/allVouchers", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM vouchers");
    res.json({
      success: true,
      vouchers: result.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// Crate add voucher endpoint
app.post("/addVoucher", async (req, res) => {
  let {
    code,
    value,
    min_order_value,
    type,
    date_start,
    date_end,
    quantity,
    apply,
  } = req.body;

  console.log("code: " + code);
  console.log("value: " + value);
  console.log("min_order_value: " + min_order_value);
  console.log("voucher_type: " + type);
  console.log("start_date: " + date_start);
  console.log("end_date: " + date_end);
  console.log("quantity: " + quantity);
  console.log("apply: " + apply);

  try {
    db.query(
      "INSERT INTO vouchers (voucher_code, value, min_order_value, voucher_type, start_date, end_date, quantity, apply ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        code,
        value,
        min_order_value,
        type,
        date_start,
        date_end,
        quantity,
        apply,
      ]
    );

    res.json({
      success: true,
      code: code,
    });
  } catch (err) {
    console.log(err);
  }
});

// create endpoint for delete voucher
app.post("/deleteVoucher", async (req, res) => {
  const { id } = req.body;

  try {
    db.query("DELETE FROM vouchers WHERE voucher_id = $1", [id]);
    res.json({
      success: true,
      message: "Voucher deleted",
    });
  } catch (err) {
    console.log(err);
  }
});

// create endpoint for update status voucher
app.post("/updateStatusVoucher", async (req, res) => {
  const { id, status } = req.body;

  try {
    db.query("UPDATE vouchers SET status = $1 WHERE voucher_id = $2", [
      status,
      id,
    ]);
    res.json({
      success: true,
      message: "Status updated",
    });
  } catch (err) {
    console.log(err);
  }
});

// create endpoint for update voucher
app.post("/updateVoucher", async (req, res) => {
  let { id, voucher } = req.body;

  console.log(req.body);
  console.log("code: " + voucher.code);
  console.log("value: " + voucher.value);
  console.log("min_order_value: " + voucher.min_order_value);
  console.log("voucher_type: " + voucher.type);
  console.log("start_date: " + voucher.date_start);
  console.log("end_date: " + voucher.date_end);
  console.log("quantity: " + voucher.quantity);
  console.log("apply: " + voucher.apply);
  console.log("id: " + id);
  try {
    db.query(
      "UPDATE vouchers SET voucher_code = $1, value = $2, min_order_value = $3, voucher_type = $4, start_date = $5, end_date = $6, quantity = $7, apply = $8 WHERE voucher_id = $9",
      [
        voucher.code,
        voucher.value,
        voucher.min_order_value,
        voucher.type,
        voucher.date_start,
        voucher.date_end,
        voucher.quantity,
        voucher.apply,
        id,
      ]
    );

    res.json({
      success: true,
      code: voucher.code,
    });
  } catch (err) {
    console.log(err);
  }
});

// Create get search products endpoint
app.get("/search", async (req, res) => {
  try {
    const { query } = req.query;

    const result = await db.query(`
      SELECT * FROM medicines
      WHERE name ILIKE '%${query}%'
    `);

    res.json({
      success: true,
      products: result.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Lỗi máy chủ" });
  }
});

// Create Endpoint for register the user
app.post("/register", async (req, res) => {
  if (!req.body.password || !req.body.username) {
    return res.status(400).json({
      success: false,
      error: "Không được để trống username hoặc password",
    });
  }

  let check = await db.query("SELECT * FROM accounts WHERE username = $1", [
    req.body.username,
  ]);

  if (check.rows.length > 0) {
    return res.status(400).json({
      success: false,
      error: "Tên tài khoản đã tồn tại",
    });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const { username, password } = req.body;
  const cartData = JSON.stringify(cart);

  try {
    const result = await db.query(
      "INSERT INTO accounts (username, password, carts) VALUES ($1, $2, $3) RETURNING id",
      [username, password, cartData]
    );

    const userId = result.rows[0].id;

    await db.query("INSERT INTO customers (id_user) VALUES ($1)", [userId]);

    const data = {
      user: {
        id: userId,
      },
    };

    const token = jwt.sign(data, "secret_pharmacy");
    res.json({
      success: true,
      token,
    });
  } catch (err) {
    console.log(err);
  }
});

// Create Endpoint for login the user
app.post("/login", async (req, res) => {
  if (!req.body.password || !req.body.username) {
    return res.status(400).json({
      success: false,
      error: "Không được để trống username hoặc password",
    });
  }

  let user = await db.query("SELECT * FROM accounts WHERE username = $1", [
    req.body.username,
  ]);

  if (user.rows.length > 0) {
    const passCompare = req.body.password === user.rows[0].password;
    if (passCompare) {
      const data = {
        user: {
          id: user.rows[0].id,
        },
      };

      const token = jwt.sign(data, "secret_pharmacy");
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        error: "Mật khẩu không đúng",
      });
    }
  } else {
    res.json({
      success: false,
      error: "Tên đăng nhập không đúng",
    });
  }
});

// Create middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({
      errors: "Please authenticate using valid token",
    });
  } else {
    try {
      const data = jwt.verify(token, "secret_pharmacy");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({
        errors: "Please authenticate using valid token",
      });
    }
  }
};

// Create get user profile endpoint
app.post("/userProfile", fetchUser, async (req, res) => {
  try {
    const user = await db.query("SELECT * FROM customers WHERE id_user = $1", [
      req.user.id,
    ]);

    // log(user.rows[0]);
    let userData = user.rows[0];
    console.log(userData);
    res.json(userData);
  } catch (err) {
    res.status(401).json({
      success: false,
      error: "Invalid Token",
    });
  }
});

// Create endpoint adding product in cartData
app.post("/addToCart", fetchUser, async (req, res) => {
  let userData = await db.query("SELECT * FROM accounts WHERE id = $1", [
    req.user.id,
  ]);
  let cartData = userData.rows[0].carts;
  let { itemId } = req.body;
  cartData[itemId] += 1;
  // let newCartData = JSON.stringify(cartData);
  // console.log(newCartData);
  await db.query("UPDATE accounts SET carts = $1 WHERE id = $2", [
    cartData,
    req.user.id,
  ]);
  res.json({
    success: true,
    message: "Product added to cart",
  });

  // console.log(req.user.id);
});

// Create endpoint removing product in cartData
app.post("/removeFromCart", fetchUser, async (req, res) => {
  let userData = await db.query("SELECT * FROM accounts WHERE id = $1", [
    req.user.id,
  ]);
  let cartData = userData.rows[0].carts;
  let { itemId } = req.body;
  if (cartData[itemId] > 0) {
    cartData[itemId] -= 1;
  }
  // let newCartData = JSON.stringify(cartData);
  // console.log(newCartData);
  await db.query("UPDATE accounts SET carts = $1 WHERE id = $2", [
    cartData,
    req.user.id,
  ]);
  res.json({
    success: true,
    message: "Product removed from cart",
  });

  // console.log(req.user.id);
});

// Create endpoint for getting cartData
app.post("/getCart", fetchUser, async (req, res) => {
  console.log("Get cart");
  let userData = await db.query("SELECT * FROM accounts WHERE id = $1", [
    req.user.id,
  ]);
  let cartData = userData.rows[0].carts;
  res.json(cartData);
});

// Create endpoint for update profile user
app.post("/updateProfile", fetchUser, async (req, res) => {
  let { image, name, gender, date, phone, email } = req.body;

  const currentUser = await db.query(
    "SELECT * FROM customers WHERE id_user = $1",
    [req.user.id]
  );

  // if have not image then use old url avatar
  if (!image) {
    image = currentUser.rows[0].avatar;
  }

  try {
    await db.query(
      "UPDATE customers SET avatar = $1, namecus = $2, gender = $3, date = $4, phone = $5, email = $6 WHERE id_user = $7",
      [image, name, gender, date, phone, email, req.user.id]
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

// Create endpoint for update address user
app.post("/AddAddress", fetchUser, async (req, res) => {
  let { name, phone, street, ward, district, province, isDefaultAddress } =
    req.body;
  const address = `${street}, ${ward}, ${district}, ${province}`;
  console.log(address);
  console.log(isDefaultAddress);
  try {
    // Check if the user already has a default address
    const existingDefaultAddress = await db.query(
      "SELECT * FROM addresses_user WHERE default_address = '1' AND ida = $1",
      [req.user.id]
    );

    // If the user already has a default address, update the old default address to non-default
    if (existingDefaultAddress.rows.length > 0) {
      await db.query(
        "UPDATE addresses_user SET default_address = '0' WHERE idau = $1",
        [existingDefaultAddress.rows[0].idau]
      );
    }

    // Add a new address with the corresponding default_address value
    if (isDefaultAddress) {
      await db.query(
        "INSERT INTO addresses_user (name_user, phone, address, default_address, ida) VALUES ($1, $2, $3, '1', $4)",
        [name, phone, address, req.user.id]
      );
    } else {
      await db.query(
        "INSERT INTO addresses_user (name_user, phone, address, ida) VALUES ($1, $2, $3, $4)",
        [name, phone, address, req.user.id]
      );
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

// Create get all addresses endpoint
app.get("/allAddresses", fetchUser, async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM addresses_user WHERE ida = $1",
      [req.user.id]
    );
    res.json({
      success: true,
      addresses: result.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// Create update address endpoint
app.post("/updateAddress", fetchUser, async (req, res) => {
  let { id, name, phone, street, ward, district, province, isDefaultAddress } =
    req.body;
  const address = `${street}, ${ward}, ${district}, ${province}`;
  console.log(address);
  console.log(isDefaultAddress);
  try {
    // Check if the user already has a default address
    const existingDefaultAddress = await db.query(
      "SELECT * FROM addresses_user WHERE default_address = '1' AND ida = $1",
      [req.user.id]
    );

    // If the user already has a default address, update the old default address to non-default
    if (existingDefaultAddress.rows.length > 0) {
      await db.query(
        "UPDATE addresses_user SET default_address = '0' WHERE idau = $1",
        [existingDefaultAddress.rows[0].idau]
      );
    }

    // Add a new address with the corresponding default_address value
    if (isDefaultAddress) {
      await db.query(
        "UPDATE addresses_user SET name_user = $1, phone = $2, address = $3, default_address = '1' WHERE idau = $4",
        [name, phone, address, id]
      );
    } else {
      await db.query(
        "UPDATE addresses_user SET name_user = $1, phone = $2, address = $3 WHERE idau = $4",
        [name, phone, address, id]
      );
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

// Create delete Address endpoint
app.post("/deleteAddress", async (req, res) => {
  const { id } = req.body;
  try {
    db.query("DELETE FROM addresses_user WHERE idau = $1", [id]);
    res.json({
      success: true,
      message: "Address deleted",
    });
  } catch (err) {
    console.log(err);
  }
});

// Create order endpoints
app.post("/addOrder", fetchUser, async (req, res) => {
  let { order_date, total, order_note, cartItems, address } = req.body;
  let hasProduct = [];
  // console.log(cartItems);

  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      hasProduct.push(item);
    }
  }
  // console.log(hasProduct);

  try {
    const result = await db.query(
      "INSERT INTO orders (order_date, total_order, order_note, address, ida) VALUES ($1, $2, $3, $4, $5) RETURNING order_id",
      [order_date, total, order_note, address, req.user.id]
    );

    const orderId = result.rows[0].order_id;

    for (let i = 0; i < hasProduct.length; i++) {
      const product = await db.query("SELECT * FROM medicines WHERE idm = $1", [
        hasProduct[i],
      ]);

      db.query(
        "INSERT INTO orders_detail (order_id, medicine_id, quantity_order, price, total) VALUES ($1, $2, $3, $4, $5)",
        [
          orderId,
          hasProduct[i],
          cartItems[hasProduct[i]],
          product.rows[0].price -
            (product.rows[0].price * product.rows[0].sale) / 100,
          (product.rows[0].price -
            (product.rows[0].price * product.rows[0].sale) / 100) *
            cartItems[hasProduct[i]],
        ]
      );
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log("lỗi:" + err);
  }
});

// Create all order endpoint
app.get("/allOrders", fetchUser, async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM orders WHERE ida = $1", [
      req.user.id,
    ]);
    res.json({
      success: true,
      orders: result.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// Create get all order detail endpoint
app.post("/allOrderDetails", async (req, res) => {
  const { idOrder } = req.body;
  console.log("idOrder: " + idOrder);
  try {
    const result = await db.query(
      "SELECT * FROM orders_detail JOIN orders ON orders_detail.order_id = orders.order_id  JOIN medicines ON orders_detail.medicine_id = medicines.idm  JOIN accounts ON orders.ida = accounts.id JOIN customers ON customers.id_user = accounts.id WHERE orders.order_id = $1",
      [idOrder]
    );

    res.json({
      success: true,
      orderDetails: result.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// Create cancel Order endpoint for user
app.post("/cancelOrder", async (req, res) => {
  const { idOrder } = req.body;
  try {
    db.query("UPDATE orders SET status = 4 WHERE order_id = $1", [idOrder]);
    res.json({
      success: true,
      message: "Order canceled",
    });
  } catch (err) {
    console.log(err);
  }
});

// Create confirm Order endpoint for user
app.post("/confirmOrder", async (req, res) => {
  const { idOrder } = req.body;
  try {
    db.query("UPDATE orders SET status = 3 WHERE order_id = $1", [idOrder]);
    res.json({
      success: true,
      message: "Order confirmed",
    });
  } catch (err) {
    console.log(err);
  }
});

// listen endpoint
app.listen(port, (e) => {
  if (!e) {
    console.log(`Server is running on port ${port}`);
  } else {
    console.log("Error: " + e);
  }
});
