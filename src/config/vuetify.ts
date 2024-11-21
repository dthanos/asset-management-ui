// import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as labs from 'vuetify/labs/components'
import * as directives from 'vuetify/directives'

const myCustomLightTheme = {
    dark: false,
}
export default createVuetify({
    components: {
        ...components,
        ...labs
    },
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

