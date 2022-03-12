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
    require('windicss/plugin/aspect-ratio'),
    require('windicss/plugin/typography')
  ],
  shortcuts: {
    'content': 'max-w-4xl mx-auto',
    'label': 'block text-sm font-bold mb-2',
    'input': 'shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline',
    'inputError': 'text-red-500 text-xs italic',
    'bg-image': 'bg-no-repeat bg-cover bg-center',
    'flexbox': 'flex items-center justify-center',
    'inline-group': 'inline-flex items-center',
    'btn-blue': 'bg-blue-500 hover:(bg-blue-700) text-white',
    'btn-green': 'bg-teal-500 hover:(bg-teal-700) text-white',
    'btn-orange': 'bg-$burntSienna hover:bg-[#ff9797] text-white',
    'btn-red': 'bg-red-500 hover(bg-red-700) text-white',
    
    'btn': 'h-12 px-6 border-none transition-all duration-200 ease whitespace-nowrap font-bold text-xs leading-4 tracking-tight rounded-3xl',
    'btn-purple' : 'bg-$purple text-white hover:bg-$heliotrope',
    'btn-light': 'bg-[#f9fafe] text-$shipCove hover:bg-$selago',
    'btn-dark': 'bg-[#373b53] text-$baliHai hover:bg-$vulcan',
    'btn-long': 'bg-[#f9fafe] text-$shipCove w-full'
  },
  theme: {
    screens: {
      tablet: '768px',
      laptop: '1024px',
      desktop: '1440px'
    },
    extend: {
      scale: {
        flip: '-1'
      },
      content: {
        checkbox: 'url("/assets/icon-check.svg")'
      }
    }
  }
})