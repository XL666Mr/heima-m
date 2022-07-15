class Storage {
  get (key) {
    const val = localStorage.getItem(key)
    try {
      return JSON.parse(val)
    } catch (error) {
      return val
    }
  }

  set (key, val) {
    if (typeof val === 'object') {
      return localStorage.setItem(key, JSON.stringify(val))
    } else {
      return localStorage.setItem(key, val)
    }
  }

  remove (key) {
    localStorage.removeItem(key)
  }
}
const storage = new Storage()
export default storage
