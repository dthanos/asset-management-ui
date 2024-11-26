import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as labs from 'vuetify/labs/components'
import * as directives from 'vuetify/directives'

const variant = 'filled'
const density = 'comfortable'

const myCustomLightTheme = {
    dark: false,
    background: '#FFFFFF',
    primary: '#2f5faa',
    secondary: '#fab400',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    grey: '#808080',

    primaryShade1: '#5e95d2',
    secondaryShade1: '#FFd164',
    primaryShade2: '#397cc7',
    secondaryShade2: '#FFc439',
    primaryShade3: '#094e9b',
    secondaryShade3: '#c68b00',
    primaryShade4: '#073c78',
    secondaryShade4: '#9b6d00',
}
const defaults = {
    VSelect: {
        variant,
        density,
        color: 'primary',
    },
    VTextField: {
        variant,
        density,
        color: 'primary',
    },
}
export default createVuetify({
    components: {
        ...components,
        ...labs
    },
    defaults,
    directives,
    icons: {
        defaultSet: 'mdi',
    },
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme,
        },
    },
})

