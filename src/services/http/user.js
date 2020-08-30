const logIn = http => data =>
  http({
    method: 'post',
    url: '/api/login',
    data
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
  deleteLayout: deleteLayout(http)
})
