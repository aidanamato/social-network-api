module.exports = {
  format_date: (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} at ${
      date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    }`;
  }
}