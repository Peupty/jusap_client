export default data => {
  const group = {
    name: '',
    description: '',
    category: '',
    imagePath: '',
    accept: 0,
    private: 0,
    reactionId: 1,
    color: ''
  }
  return data ? Object.assign(group, data) : group
}
