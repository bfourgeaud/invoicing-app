import { defineConfig } from 'windicss/helpers'

function range(size:number, startAt = 1) {
  return Array.from(Array(size).keys()).map(i => i + startAt)
}

export default defineConfig({
  extract: {
    include: ['**/*.{jsx,tsx,css}'],
    exclude: ['node_modules', '.git', '.next'],
  },
  plugins: [
    require('windicss/plugin/line-clamp'),
    require('windicss/plugin/aspect-ratio')
  ],
  shortcuts: {
    'content': 'max-w-4xl mx-auto',
    'label': 'block text-sm font-bold mb-2',
    'input': 'shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline',
    'inputError': 'text-red-500 text-xs italic',
    'bg-image': 'bg-no-repeat bg-cover bg-center',
    'flexbox': 'flex items-center justify-center',
    'btn': 'font-semibold py-2 px-4 rounded focus:(outline-none shadow-outline) disabled:(opacity-50 cursor-not-allowed)',
    'inline-group': 'inline-flex items-center',
    'btn-blue': 'bg-blue-500 hover:(bg-blue-700) text-white',
    'btn-green': 'bg-teal-500 hover:(bg-teal-700) text-white',
    'btn-orange': 'bg-amber-500 hover:(bg-amber-700) text-white',
    'btn-red': 'bg-red-500 hover(bg-red-700) text-white'
  },
})