import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'

import '../public/reset.css'
import axios from 'axios'

import router from './router/globalRouter'
import store from './store/globalStore'

const BaseWrapper = defineAsyncComponent(() => import('./components/UI/BaseWrapper'))
const BaseInput = defineAsyncComponent(() => import('./components/UI/BaseInput'))
const BaseButton = defineAsyncComponent(() => import('./components/UI/BaseButton'))
const BaseBadge = defineAsyncComponent(() => import('./components/UI/BaseBadge'))
const TheHeader = defineAsyncComponent(() => import('./layout/TheHeader'))
const Spinner = defineAsyncComponent(() => import('./components/UI/Spinner'))

const app = createApp(App)



app.component('TheHeader', TheHeader)
app.component('BaseWrapper', BaseWrapper)
app.component('BaseButton', BaseButton)
app.component('BaseBadge', BaseBadge)
app.component('BaseInput', BaseInput)
app.component('Spinner', Spinner)

app
  .use(store)
  .use(router)
  .mount('#app')
