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

// Create upload endpoint for images

app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
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

// Create delete products endpoint
app.post("/deleteProduct", async (req, res) => {
  const { id } = req.body;

  try {
    db.query("DELETE FROM medicines WHERE id = $1", [id]);
    res.json({
      success: true,
      message: "Product deleted",
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

// Create get search products endpoint
app.get("/search", async (req, res) => {
  try {
    const { query } = req.query;

    const result = await db.query(`
      SELECT * FROM medicines
      WHERE name LIKE '%${query}%'
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
  let check = await db.query("SELECT * FROM accounts WHERE username = $1", [
    req.body.username,
  ]);

  if (check.rows.length > 0) {
    return res.status(400).json({
      success: false,
      error: "username already exists",
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
        error: "Password is incorrect",
      });
    }
  } else {
    res.json({
      success: false,
      error: "Username is incorrect",
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

// listen endpoint
app.listen(port, (e) => {
  if (!e) {
    console.log(`Server is running on port ${port}`);
  } else {
    console.log("Error: " + e);
  }
});