import { useNuxtApp } from 'nuxt/app'
import { InjectionKey } from 'vue'

export const useToast = () => {
  const { $toast } = useNuxtApp()

  type ToastType = 'info' | 'success' | 'error' | 'warning'
  type ToastMethod = (text: string, options: { delay?: number, closeButton: boolean }) => void
  const toast = $toast as Partial<Record<ToastType, ToastMethod>> | undefined

  /**
   * toast追加
   */
  const addToast = (
    text: string,
    type?: ToastType,
    time?: number,
    isClosable = false,
  ) => {
    const safeType = (type && ['info', 'success', 'error', 'warning'].includes(type)) ? type : 'info'
    const notify = toast?.[safeType]
    if (notify) {
      notify(text, {
        delay: time,
        closeButton: isClosable,
      })
    }
  }

  return {
    addToast,
  }
}

export default useToast

export type ToastComposable = ReturnType<typeof useToast>

export const toastInjectionKey: InjectionKey<ToastComposable> = Symbol('toast')
