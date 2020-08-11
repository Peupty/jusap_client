const logIn = http => data =>
  http({
    method: 'post',
    url: '/api/login',
    data
  })

const createLayout = http => layout => Promise.resolve()

export default http => ({
  logIn: logIn(http),
  createLayout: createLayout(http)
})
