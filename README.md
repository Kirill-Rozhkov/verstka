Для запуска проекта необходимо:

1. скачать пакеты npm i
2. запустить проект npm start
3. добавиться в mongodb

API:

1. https://rapidapi.com/TockaAyman/api/currencyconverter9
2. https://api.openweathermap.org/data/2.5/weather?q=$%7Bcity%7D&units=imperial&appid=$%7BweatherApiKey%7D
3. https://6559fa956981238d054d0040.mockapi.io/users

http://localhost:3000/\*

где \*:
login,register,admin,user,weather, currency,history

app.use("/", registerRouter); регистрация
app.use("/", loginRouter); логин
app.use("/admin", adminRouter); админ
app.use("/user", userRouter); пользователь
app.use("/", weatherApi); 1 апи
app.use("/", currencyApi); 2 апи
app.use("/", history) история
