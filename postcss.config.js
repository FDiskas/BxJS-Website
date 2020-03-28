const tailwindcss = require(`tailwindcss`)

module.exports = {
  plugins: [
    tailwindcss({
      theme: {},
      variants: {},
      plugins: [],
    }),
    require(`autoprefixer`),
    require(`cssnano`)({
      preset: `default`,
    }),
  ],
}
