export default userList => {
  const str = userList.join(', ')

  return str.length > 20 ? str.slice(0, 20) + '...' : str
}
