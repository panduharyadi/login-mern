const express = require('express')
const cors = require('cors')
const session = require('express-session')
const port = require('dotenv')
const db = require('./config/Databases')
const SequelizeStore = require('connect-session-sequelize')
const UserRoutes = require('./routes/UsersRoute')
const ProductRoutes = require('./routes/ProductsRoute')
const AuthRoutes = require('./routes/AuthRoute')
port.config()

const app = express()

const sessionStore = SequelizeStore(session.Store)

const store = new sessionStore({
    db: db
})

app.use(express.json())

// lakukan migrate db
// try {
//     (async() => {
//         await db.sync()
//     })()
// } catch (error) {
//     console.log(error.message);
// }

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5000'
}))


app.get('/', (req, res) => {
    res.send('ini halaman utama')
})

app.use(UserRoutes)
app.use(ProductRoutes)
app.use(AuthRoutes)

// lakukan migrate
// store.sync()

app.listen(process.env.APP_PORT, () => {
    console.log(`App has listening on port ${process.env.APP_PORT}`);
})