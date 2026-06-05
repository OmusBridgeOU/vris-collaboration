import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

  // FirstViewのスクロールに連動してblurをかける
  const firstViewBlur = (
    target: string | Element | Ref<Element | null>,
    options?: { maxBlur?: number },
  ) => {
    gsap.registerPlugin(ScrollTrigger)

    const el = isRef(target) ? target.value : target
    if (!el) return

    gsap.to(el, {
      filter: `blur(${options?.maxBlur ?? 14}px)`,
      ease: 'none',
      scrollTrigger: {
        trigger: el as Element,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }

  // FirstViewが画面外に出たらヘッダーを出現させる
  const headerRevealOnScroll = (
    target: string | Element | Ref<Element | null>,
    trigger: string | Element | Ref<Element | null>,
    options?: { duration?: number },
  ) => {
    gsap.registerPlugin(ScrollTrigger)

    const targetEl = isRef(target) ? target.value : target
    const triggerEl = isRef(trigger) ? trigger.value : trigger
    if (!targetEl || !triggerEl) return

    gsap.fromTo(
      targetEl,
      { yPercent: -100, autoAlpha: 0 },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: options?.duration ?? 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: triggerEl as Element,
          start: 'bottom top',
          toggleActions: 'play none none reverse',
        },
      },
    )
  }

  // ScrollTriggerを全て破棄（ページ離脱時に呼ぶ）
  const destroyScrollTriggers = () => {
    ScrollTrigger.getAll().forEach(t => t.kill())
  }

  return {
    fadeInUp,
    fadeInUpStagger,
    firstViewBlur,
    headerRevealOnScroll,
    destroyScrollTriggers,
  }
}
