import { useStore } from '@/store/index'
import router from '@/router'

/**
 * @param {string} name
 * @param {Dictionary<string> | undefined} params
 * @param {Query} query
 * @param {Route} destination
 */
export function openFullscreen (
  name,
  params = null,
  query = null
  // destination = null
) {
  const store = useStore()
  store.setStoreRoute({
    key: name,
    route: router.currentRoute.value
  })
  console.log('openFullscreen', name, router.currentRoute.value)
  router.push({ name, params, query })
  // if (destination || router.currentRoute.value.name !== name) {
  //   router.push({ name, params, query })
  // }
}

/**
 *
 * @param {string} fallback
 * @param {Query} replaceQuery
 */
export function closeFullscreen (fallback, replaceQuery = null) {
  // const key = router.currentRoute.value.name || ''
  const store = useStore()
  // const storedRoute = { key: key, route: null }
  const storedRoute = store.storeRoute.route

  // store.commit('storeRoute', { key: key, route: null })

  if (storedRoute) {
    const { name, params, query } = storedRoute

    if (name && name !== router.currentRoute.value.name) {
      return router.push({ name, params, query: replaceQuery || query })
    }
  }

  if (fallback && router.currentRoute.value.name !== fallback) {
    router.push({ name: fallback })
  }
}
