import Vue from 'vue'
import { GridLayout, GridItem } from 'vue-grid-layout'
import Group from '@/components/Group.vue'
import Post from '@/components/Post.vue'

Vue.component('grid-layout', GridLayout)
Vue.component('grid-item', GridItem)
Vue.component('app-group', Group)
Vue.component('app-post', Post)
