import { Client } from 'pg';

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, text VARCHAR ( 255 ), username VARCHAR ( 255 ), date_created TIMESTAMPTZ 
);

CREATE TABLE IF NOT EXISTS replies (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    message_id INTEGER REFERENCES messages(id) ON DELETE CASCADE, text VARCHAR ( 255 ), username VARCHAR ( 255 ), date_created TIMESTAMPTZ 
);

INSERT INTO messages (text, username, date_created)
VALUES 
('Hi there!', 'Amando', NOW()), 
('Hello World!', 'Charles', NOW());

INSERT INTO replies (message_id, text, username, date_created)
VALUES 
(1,'Hello Welcome!', 'Bob', NOW()), 
(1,'cool', 'Amy', NOW()),
(2,'Hello Universe!', 'Jenny', NOW());
`;

const dbUrl = process.argv[2];

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: dbUrl,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
