function formatDate(date) {
  return date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: formatDate(Date()),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: formatDate(new Date()),
  },
];

export { messages };
