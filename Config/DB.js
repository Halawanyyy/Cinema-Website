const mysql = require("mysql");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cinema'
});

db.connect((err) => {   
    if (err) {
        console.error('Error connecting to database:', err.stack);
        return;
    }
    console.log('Connected to database');
});

const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        privilege VARCHAR(50) DEFAULT 'user' NOT NULL
    )
`;

db.query(createUsersTable, (err) => {
    if (err) {
        console.error('Error creating users table:', err.stack);
        return;
    }
    console.log('Users table created successfully');
});

const createMoviesTable = `
    CREATE TABLE IF NOT EXISTS movies(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        seats INT NOT NULL,
        ticket_price INT NOT NULL,
        show_date DATE,
        show_time TIME
    )
`;

db.query(createMoviesTable, (err) => {
    if (err) {
        console.error('Error creating movies table:', err.stack);
        return;
    }
    console.log('Movies table created successfully');
});

const createBookingTable = `
    CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        movie_id INT,
        user_id INT,
        tickets INT NOT NULL,
        payment_method VARCHAR(50),
        FOREIGN KEY (movie_id) REFERENCES movies(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
    )
`;

db.query(createBookingTable, (err) => {
    if (err) {
        console.error('Error creating bookings table:', err.stack);
        return;
    }
    console.log('Bookings table created successfully');
});

module.exports = db;
