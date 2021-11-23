module.exports = {
  format_date: (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} at ${
      date.getLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    }`;
  }
}