import resolve from 'rollup-plugin-node-resolve';

const components = [
  "button",
  "link-icon",
  "link-nav",
  "link-social",
  "list",
  "list-elem",
  "select"
]

const configs = components.reduce((acc, component) => {
  const configES6 = {
    input: `packages/${component}/${component}.js`,
    output: {
      dir: `packages/${component}/dist/`,
      format: 'es',
    },
    plugins: [
      resolve(),
    ]
  }
  acc.push(configES6)
  return acc;
}, [])

export default [
  ...configs
]