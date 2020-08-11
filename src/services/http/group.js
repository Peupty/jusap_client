const getPosts = http => (id, page) =>
  http({
    method: 'get',
    url: `/api/group/${id}?size=5&page=${page}`
  })

const create = http => data =>
  http({
    method: 'post',
    url: '/api/group/new',
    data
  })

const getGroups = http => () =>
  http({
    method: 'get',
    url: '/api'
  })

const findGroups = http => search =>
  http({
    method: 'get',
    url: `/api/group?search=${search};member=false`
  })

export default http => ({
  getPosts: getPosts(http),
  create: create(http),
  getGroups: getGroups(http),
  findGroups: findGroups(http)
})
