const gridWidth = 24
const itemWidth = 8
const itemHeight = 5
const cols = gridWidth / itemWidth

export default {
  create({ name, groups }) {
    const g = groups.map((el, index) => {
      return {
        name: el.name,
        i: el.id,
        x: (index % cols) * itemWidth,
        y: Math.floor(index / cols) * itemHeight,
        w: itemWidth,
        h: itemHeight
      }
    })
    return {
      name,
      groups: g
    }
  }
}
