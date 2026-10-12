import pool from './pool.js';

async function getAllmessages() {
  try {
    const { rows } = await pool.query('SELECT * FROM messages');
    return rows;
  } catch (err) {
    console.error('Database query failed:', err.message);
  }
}

async function getMessageById(messageId) {
  try {
    const { rows } = await pool.query('SELECT * FROM messages WHERE id = $1', [
      messageId,
    ]);
    return rows[0] || null;
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

async function getReplies(messageId) {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM replies
       WHERE message_id = $1
       ORDER BY date_created DESC`,
      [messageId],
    );
    return rows;
  } catch (err) {
    console.error('Database query failed:', err.message);
  }
}

export { getAllmessages, addNewMessage, getReplies, getMessageById };
