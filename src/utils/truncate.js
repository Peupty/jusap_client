export default (str, len) =>
  str.length >= len ? str.slice(0, len).trim() + '...' : str
