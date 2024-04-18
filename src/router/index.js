import { createRouter, createWebHistory } from 'vue-router'
import PokemonsView from '../views/PokemonsView.vue'
import PokemonDetailsView from '../views/PokemonDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Pokemons',
      component: PokemonsView
    },
    {
      path: '/:id',
      name: 'Pokemon Details',
      component: PokemonDetailsView
    }
  ]
})

export default router
