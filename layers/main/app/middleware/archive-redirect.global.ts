export default defineNuxtRouteMiddleware((to) => {
  const runtimeConfig = useRuntimeConfig()

  if (runtimeConfig.public.outputEnv !== 'production') {
    return
  }

  const debugQuery = to.query.debug
  const isDebug = Array.isArray(debugQuery)
    ? debugQuery.includes('1')
    : debugQuery === '1'

  if (isDebug) {
    return
  }

  return navigateTo(runtimeConfig.public.archivedUrl, {
    external: true,
    redirectCode: 302,
  })
})
