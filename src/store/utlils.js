export const setState = (state, data) => {
  const keys = Object.keys(data)

  keys.forEach(el => {
    // eslint-disable-next-line
    if (state.hasOwnProperty(el)) {
      state[el] = data[el]
    }
  })
}
