import resolve from 'rollup-plugin-node-resolve';

const components = [
  "",
  "button/",
  "link-icon/",
  "link-nav/",
  "link-social/",
  "list/"
]

const configs = components.reduce((acc, component) => {
  const configES6 = {
    input: `docs/${component}index.js`,
    output: {
      file: `docs/${component}index.bundle.js`,
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
