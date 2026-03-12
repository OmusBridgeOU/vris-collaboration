<i18n lang="yaml">
ja:
  title: VketReal in 札幌 2025 Summer
  date: 2025年7月21日(月・祝)
  location: さっぽろテレビ塔
  description: 世界最大級のメタバースイベント 「バーチャルマーケット(Vket)」から派生した、 「バーチャルの姿のままリアルに飛び出す！」リアルイベント！初の有志主催で開催！
  button:
    contact: チケット購入！
en:
  title: VketReal in SAPPORO 2025 Summer
  date: July 21, 2025 (Mon)
  location: Sapporo TV Tower
  description: The largest metaverse event in the world, "Virtual Market (Vket)", is branching out into a real-world event! The first self-organized event where "virtual beings leap into reality"!
  button:
    contact: Buy Tickets!
</i18n>

<template>
  <section
    id="hero"
    ref="sectionRef"
    class="ho-hero-section"
  >
    <div class="background" />
    <div class="hero-content">
      <h1 class="hero-title">
        <HaImage
          src="/images/2025Summer/logo.png"
          :alt="t('title')"
          class="logo"
        />
      </h1>
      <p class="hero-subtitle">
        {{ t('date') }} {{ t('location') }}
      </p>
      <div class="hero-description">
        {{ t('description') }}
      </div>
      <div class="cta-button">
        <HaLink
          to="https://livepocket.jp/e/vketreal_vris"
          class="button"
          forceAnchorLink
          blank
        >
          {{ t('button.contact') }}
        </HaLink>
      </div>
      <div class="character-display">
        <HaImage
          :src="randomCharacterImage"
          :alt="`キャラクター ${randomCharacterIndex + 1}`"
          class="character-image"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)

// キャラクター画像のリスト
const characterImages = [
  '/images/2025Summer/character-3d-1.png',
  '/images/2025Summer/character-3d-2.png',
  '/images/2025Summer/character-3d-3.png',
]

// ランダムに選択されたキャラクター
const randomCharacterIndex = ref(0)
const randomCharacterImage = computed(() => characterImages[randomCharacterIndex.value])

// コンポーネントマウント時にランダムキャラクターを選択
onMounted(() => {
  randomCharacterIndex.value = Math.floor(Math.random() * characterImages.length)
})

defineExpose({
  sectionRef,
})
</script>

<style lang="scss" scoped>
@use "#vris/app/assets/styles/_variables" as v;
@use "#vris/app/assets/styles/_mixins" as m;

.ho-hero-section {
  scroll-snap-align: start;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100dvh;

  color: #fff;
  text-align: center;

  > .background {
    position: absolute;
    z-index: 0;
    inset: 0;

    background-position: center;
    background-size: cover;
    backdrop-filter: blur(8px);
  }

  .hero-content {
    z-index: 3;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .hero-title {
    z-index: 3;
    margin-bottom: 2rem;
    font-size: 4rem;
    font-weight: 800;

    .logo {
      max-width: 100%;
      height: auto;
    }
  }

  .hero-subtitle {
    z-index: 3;
    margin-bottom: 2rem;
    font-size: 2rem;
    text-shadow:
      2px 2px 4px rgb(0 0 0 / 50%),
      -2px -2px 4px rgb(0 0 0 / 50%),
      2px -2px 4px rgb(0 0 0 / 50%),
      -2px 2px 4px rgb(0 0 0 / 50%);
  }

  .hero-description {
    position: relative;
    z-index: 3;

    margin-bottom: 3rem;

    font-size: 1.2rem;
    text-shadow:
      2px 2px 4px rgb(0 0 0 / 50%),
      -2px -2px 4px rgb(0 0 0 / 50%),
      2px -2px 4px rgb(0 0 0 / 50%),
      -2px 2px 4px rgb(0 0 0 / 50%);
  }

  .cta-button {
    margin-top: 2rem;
    text-align: center;
    visibility: hidden;

    .button {
      display: inline-block;

      padding: 1rem 3rem;
      border-radius: 50px;

      font-weight: bold;
      color: #fff;
      text-decoration: none;

      background: #00A95F;

      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        background: #008a4e;
      }
    }
  }

  .character-display {
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    .character-image {
      width: auto;
      max-width: 300px;
      height: auto;
      max-height: 400px;

      // フェードイン効果
      opacity: 0;
      object-fit: contain;

      animation: fadein-up 1s ease-out 0.5s forwards;
    }
  }
}

@keyframes fadein-up {
  from {
    transform: translateY(30px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@include m.sp {
  .ho-hero-section {
    .hero-content {
      padding: 0 1.5rem;
    }

    .hero-title {
      margin-bottom: 1.5rem;
      font-size: 2.5rem;

      .logo {
        max-width: 90%;
      }
    }

    .hero-subtitle {
      margin-bottom: 1.5rem;
      font-size: 1.2rem;
    }

    .hero-description {
      margin-bottom: 2rem;
      padding: 0 0.5rem;
      font-size: 0.95rem;
      line-height: 1.6;
    }

    .cta-button {
      .button {
        padding: 0.875rem 2.5rem;
        font-size: 0.95rem;
      }
    }

    .character-display {
      .character-image {
        max-width: 250px;
        max-height: 320px;
      }
    }
  }
}

@include m.xs {
  .ho-hero-section {
    .hero-content {
      padding: 0 1rem;
    }

    .hero-title {
      margin-bottom: 1rem;
      font-size: 2rem;
    }

    .hero-subtitle {
      margin-bottom: 1rem;
      font-size: 1rem;
    }

    .hero-description {
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
    }

    .cta-button {
      .button {
        padding: 0.75rem 2rem;
        font-size: 0.875rem;
      }
    }

    .character-display {
      .character-image {
        max-width: 200px;
        max-height: 260px;
      }
    }
  }
}
</style>
