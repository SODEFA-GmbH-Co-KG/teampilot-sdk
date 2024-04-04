function get(key) {
  return process.env[key]
}

function set(key, value) {
  process.env[key] = value
}

export { get, set }
