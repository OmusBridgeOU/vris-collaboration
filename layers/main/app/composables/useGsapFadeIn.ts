import { gsap } from 'gsap'

export const useGsapFadeIn = () => {
  const fadeInUp = (
    target: string | Element | Ref<Element | null>,
    options?: { delay?: number, duration?: number, distance?: number },
  ) => {
    const el = isRef(target) ? target.value : target
    if (!el) return

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: options?.distance ?? 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: options?.duration ?? 0.8,
        delay: options?.delay ?? 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el as Element,
          start: 'top 75%',
          once: true,
        },
      },
    )
  }

  // 複数要素を順番にアニメーション（stagger）
  const fadeInUpStagger = (
    targets: string | Element[],
    options?: { stagger?: number, duration?: number, delay?: number, distance?: number },
  ) => {
    gsap.fromTo(
      targets,
      { opacity: 0, y: options?.distance ?? 40 },
      {
        opacity: 1,
        y: 0,
        duration: options?.duration ?? 0.8,
        delay: options?.delay ?? 0,
        ease: 'power2.out',
        stagger: options?.stagger ?? 0.15,
        scrollTrigger: {
          trigger: (typeof targets === 'string' ? targets : targets[0]) as Element,
          start: 'top 85%',
          once: true,
        },
      },
    )
  }

  return { fadeInUp, fadeInUpStagger }
}
