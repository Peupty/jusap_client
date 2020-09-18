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
    url: `/api/group?search=${search}`
  })

const join = http => group =>
  http({
    method: 'get',
    url: `/api/group/invite?id=${group.inviteCode}`
  })

const addPost = http => data =>
  http({
    method: 'post',
    url: '/api/group',
    data
  })

const submitJoinForm = http => ({ form, inviteCode }) =>
  http({
    method: 'post',
    url: `/api/group/invite/participant?id=${inviteCode}`,
    data: form
  })

const getParticipants = http => id =>
  http({
    method: 'get',
    url: `/api/group/${id}/participants`
  })

const getJoinRequests = http => id =>
  http({
    method: 'get',
    url: `/api/group/${id}/forms`
  })

const acceptRequests = http => (id, users) =>
  http({
    method: 'post',
    url: `/api/group/${id}/forms`,
    data: users
  })

export default http => ({
  getPosts: getPosts(http),
  create: create(http),
  getGroups: getGroups(http),
  findGroups: findGroups(http),
  join: join(http),
  addPost: addPost(http),
  submitJoinForm: submitJoinForm(http),
  getParticipants: getParticipants(http),
  getJoinRequests: getJoinRequests(http),
  acceptRequests: acceptRequests(http)
})
