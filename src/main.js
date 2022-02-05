import { createApp } from 'vue'
import App from './App.vue'

import '../public/reset.css'

import router from './router/globalRouter'
import store from './store/globalStore'

import BaseWrapper from './components/UI/BaseWrapper'
import BaseButton from './components/UI/BaseButton'
import BaseBadge from './components/UI/BaseBadge'
import TheHeader from './layout/TheHeader'

const app = createApp(App)

app.component('TheHeader', TheHeader)
app.component('BaseWrapper', BaseWrapper)
app.component('BaseButton', BaseButton)
app.component('BaseBadge', BaseBadge)

app
  .use(store)
  .use(router)
  .mount('#app')
