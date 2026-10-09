import pool from './pool.js';

async function getAllmessages() {
  try {
    const { rows } = await pool.query('SELECT * FROM messages');
    return rows;
  } catch (err) {
    console.error('Database query failed:', err.message);
  }
}

async function addNewMessage(author, message) {
  await pool.query(
    'INSERT INTO messages (text, username, date_created) VALUES ($1, $2, NOW())',
    [message, author],
  );
}

export { getAllmessages, addNewMessage };
