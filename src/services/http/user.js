const logIn = http => data =>
  http({
    method: 'post',
    url: '/api/login',
    data
  })

const logOut = http => () =>
  http({
    method: 'get',
    url: '/api/logout'
  })

const getData = http => () =>
  http({
    method: 'get',
    url: '/api/me'
  })

const createLayout = http => layout =>
  http({
    method: 'post',
    url: '/api/layouts/single',
    data: layout
  })

const editLayout = http => layout =>
  http({
    method: 'post',
    url: '/api/layouts/edit',
    data: layout
  })

const deleteLayout = http => name =>
  http({
    method: 'delete',
    url: `/api/layouts/${name}`
  })

export default http => ({
  logIn: logIn(http),
  createLayout: createLayout(http),
  editLayout: editLayout(http),
  deleteLayout: deleteLayout(http),
  getData: getData(http),
  logOut: logOut(http)
})
