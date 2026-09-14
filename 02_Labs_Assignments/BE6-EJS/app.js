const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise'); // Use promise-based MySQL
const app = express();
app.set('view engine', 'ejs');        // Tell Express to use EJS templates
app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true })); // For parsing form data
// ── Database config ──
const DB_NAME = 'cai'; // Change this to switch databases

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/register.html")
})

app.post('/students', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(
            'INSERT INTO users (first_name, last_name, email, password, created_at) VALUES (?, ?, ?, ?, NOW())',
            [first_name, last_name, email, password]
        );
        res.status(201).json({ id: result.insertId, first_name, last_name, email });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(409).json({ error: 'Email already registered. Please use a different email.' });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Failed to register. Please try again.' });
        }
    } finally {
        connection.release();
    }
});

// Route to fetch students
app.get("/students", async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query("SELECT * FROM users");
        // Render the 'index.ejs' file and pass the 'rows' as 'students'
        res.render("index", { students: rows });
    } catch (err) {
        console.error(err);
        res.status(500).send("Database query failed");
    } finally {
        if (connection) connection.release();
    }
});



// Minimal READ (GET) single user route
app.get('/students/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
        if (!rows[0]) return res.status(404).json({ error: 'Student not found' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    } finally {
        connection.release();
    }
});

// Minimal UPDATE (PUT) route
app.put('/students/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, password } = req.body;
    const connection = await pool.getConnection();
    try {
        await connection.query(
            'UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?',
            [first_name, last_name, email, password, id]
        );
        res.json({ message: 'Student updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update student' });
    } finally {
        connection.release();
    }
});

// Minimal DELETE route
app.delete('/students/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await pool.getConnection();
    try {
        await connection.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({ message: 'Student deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete student' });
    } finally {
        connection.release();
    }
});

/// ทดสอบผ่าน http://localhost:3000/getQuery?a=1&b=2
app.get('/getQuery', function (req, res) {
    console.log(req.query) // JavaScript object
    res.send(req.query); // JSON
})

/// ทดสอบผ่าน http://localhost:3000/student/3/26
app.get('/student/:id/:age', function (req, res) {
    console.log(req.params.id)
    console.log(req.params.age)
    res.send(req.params)
})

/// ทดสอบผ่าน http://localhost:3000/add/5/10
app.get('/add/:a/:b', function (req, res) {
    var a = parseInt(req.params.a)
    var b = parseInt(req.params.b)
    //res.send((a+b).toString())
    res.send({ "result": (a + b).toString() })
}
)
/// ทดสอบผ่าน http://localhost:3000/calculation/divide?first=55&second=6
app.get("/calculation/:method", (req, res) => {
    const method = req.params.method; // divide
    const first = +req.query.first; // 55
    const second = +req.query.second; // 6
    if (method === "add") {
        res.send({ "result": first + second })
    } else if (method === "subtract") {
        res.send({ "result": first - second })
    } else if (method === "multiply") {
        res.send({ "result": first * second })
    } else if (method === "divide") {
        res.send({ "result": first / second })
    }
})

/// ทดสอบใส่ body {"name": "Oak"} ผ่าน Postman ไปยัง POST localhost:3000/user  
app.post("/user", (req, res) => {
    const user = {
        name: req.body.name,
    };
    res.send(user)
})

// ── Auto-create database & table if they don't exist ──
async function initDB() {
    // Connect without specifying a database first
    const tempPool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        waitForConnections: true,
        connectionLimit: 3,
    });

    const conn = await tempPool.getConnection();
    try {
        // Create the database if it doesn't exist
        await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
        console.log(`✔ Database \`${DB_NAME}\` ready.`);

        // Create the users table if it doesn't exist
        await conn.query(`
            CREATE TABLE IF NOT EXISTS \`${DB_NAME}\`.\`users\` (
                id          INT          NOT NULL AUTO_INCREMENT,
                first_name  VARCHAR(100) NOT NULL,
                last_name   VARCHAR(100) NOT NULL,
                email       VARCHAR(150) NOT NULL UNIQUE,
                password    VARCHAR(255) NOT NULL,
                created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);
        console.log('✔ Table `users` ready.');
    } finally {
        conn.release();
        await tempPool.end();
    }
}

// Start the server (after DB is ready)
initDB()
    .then(() => {
        app.listen(3000, () => {
            console.log('Server started on port 3000!');
        });
    })
    .catch((err) => {
        console.error('❌ Failed to initialize database:', err.message);
        process.exit(1);
    });