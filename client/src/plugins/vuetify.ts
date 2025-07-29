import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import type { ThemeDefinition } from 'vuetify'

const rubyRedTheme: ThemeDefinition = {
  dark: false,
  colors: {
    // background: '#FFFDFA',
    // surface: '#FDE8EB',
    // primary: '#E0115F',      // ruby red
    // secondary: '#F06292',    // light ruby red
    // accent: '#F8BBD0',       // soft pink accent
    // error: '#C2185B',        // deep ruby red
    // info: '#B5EAD7',         // pastel teal
    // success: '#C7CEEA',      // pastel purple
    // warning: '#FFF5BA',      // pastel yellow
    white: '#faf8f5',
    pink_1: '#ebb4c1', 
    pink_2: '#a55166',
    pink_3: '#690f0f'
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'rubyRed',
    themes: {
      rubyRed: rubyRedTheme,
    },
  },
})
