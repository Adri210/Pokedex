import { createRouter, createWebHistory } from 'vue-router'
import PokemonsView from '@/views/PokemonsView.vue'
import PokemonDetailsView from '@/views/PokemonDetailsView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/pokemons',
    },
    {
      path: '/pokemons',
      name: 'pokemons',
      component: PokemonsView
    },
    {
      path: '/pokemons/:id',
      name: 'pokemon-details',
      component: PokemonDetailsView
    },
    {
      path: '/:pathMatch(.*)',
      name: 'NotFound',
      component: NotFoundView
    }
  ]
})

export default router
