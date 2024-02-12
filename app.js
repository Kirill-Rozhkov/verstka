const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const { connectToMongoDB } = require("./db.js"); // Путь к вашему файлу db.js
const session = require("express-session");

// Подключаем ejs
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// подключаем бд
mongoose.connect("mongodb://localhost:27017");

// Подключаем маршрутизаторы
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const weatherApi = require("./routes/weatherApi");
const currencyApi = require("./routes/currencyApi");
const history = require("./routes/history");
const mockApi = require("./routes/mockApi");
app.use(
  session({
    secret: "123", // Change this to a random string
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 600000 },
    // Set secure to true if your app is served over HTTPS
  })
);

// const apiRouter = require("./routes/apiRouter");
connectToMongoDB()
  .then((client) => {
    // Добавляем экземпляр базы данных в локальные переменные приложения
    app.locals.db = client.db();

    // Используем маршруты
    app.use("/", registerRouter); // General routes
    app.use("/", loginRouter);
    app.use("/admin", adminRouter); // Place more specific routes first
    app.use("/user", userRouter); // General routes
    app.use("/", weatherApi);
    app.use("/", currencyApi);
    app.use("/", history);
    app.use("/", mockApi);
    // app.use("/",apiRouter)
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas", error);
  });

// Используем маршрутизаторы
// app.use('/', mainRouter);
// app.use('/users', userRouter);
// app.use('/', registerRouter);
// app.use('/', loginRouter);

// Запускаем сервер
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
