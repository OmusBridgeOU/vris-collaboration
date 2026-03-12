<i18n lang="yaml">
ja:
  art:
    eyebrow: アート
    title: アート
    lead: 2026 Early Spring を彩るビジュアルをスライドでご紹介します。
    items:
      logo:
        caption: Designed by おのでらりな, 嶋田 后彩樹
      kv:
        caption: Illustration by べじまいと
      art1:
        caption: Illustration by テボテボ
en:
  art:
    eyebrow: Art
    title: Art
    lead: Key visuals for VketReal mini in Sapporo 2026 Early Spring.
    items:
      logo:
        caption: Designed by おのでらりな, 嶋田 后彩樹
      kv:
        caption: Illustration by べじまいと
      art1:
        caption: Illustration by テボテボ
</i18n>

<template>
  <section
    id="art"
    class="ha-section ha-art"
  >
    <div class="ha-section__heading">
      <p class="ha-section__eyebrow">
        {{ t('art.eyebrow') }}
      </p>
      <h2 class="ha-section__title">
        {{ t('art.title') }}
      </h2>
      <p class="ha-section__lead">
        {{ t('art.lead') }}
      </p>
    </div>

    <div class="slider-shell">
      <HmSlider
        slidename="art-slider"
        :itemsId="itemIds"
        :amount="artworks.length"
        :arrow="true"
        :pagination="true"
        :loop="true"
        :center="true"
        :page="false"
        :autoplay="true"
        :interval="4500"
        gapPc="24px"
        gapSp="16px"
        widthPc="100%"
        widthSp="100%"
        :duration="400"
        easing="ease-out"
        :draggable="true"
        :slidesPerViewPc="3"
        :slidesPerViewSp="1"
      >
        <template #item>
          <HmSliderItem
            v-for="art in artworks"
            :id="art.id"
            :key="art.id"
          >
            <button
              class="art-card-button"
              type="button"
              :aria-label="art.alt"
              @click="openArtDialog(art)"
            >
              <figure class="art-card">
                <div class="art-media">
                  <img
                    :src="art.src"
                    :alt="art.alt"
                    loading="lazy"
                  >
                </div>
                <figcaption class="art-caption">
                  {{ art.caption }}
                </figcaption>
              </figure>
            </button>
          </HmSliderItem>
        </template>
        <template #pagination>
          <span class="pagination-dot" />
        </template>
        <template #navigationprevious>
          <span class="nav-arrow">‹</span>
        </template>
        <template #navigationnext>
          <span class="nav-arrow">›</span>
        </template>
      </HmSlider>
    </div>

    <HaDialogElement
      ref="artDialog"
      closedby="any"
      @close="handleDialogClose"
    >
      <template #inner>
        <div
          v-if="selectedArt"
          class="art-dialog"
        >
          <div class="art-dialog__media">
            <img
              :src="selectedArt.src"
              :alt="selectedArt.alt"
            >
          </div>
          <p class="art-dialog__caption">
            {{ selectedArt.caption }}
          </p>
        </div>
      </template>
    </HaDialogElement>
  </section>
</template>

<script setup lang="ts">
import HaDialogElement from '#base/app/components/ha/HaDialogElement.vue'
import HmSlider from '#base/app/components/hm/HmSlider.vue'
import HmSliderItem from '#base/app/components/hm/HmSliderItem.vue'
import type { ComponentPublicInstance } from 'vue'

interface Artwork {
  id: string
  src: string
  alt: string
  caption: string
}

const { t } = useI18n()

const artworks = computed<Artwork[]>(() => [
  {
    id: 'art-logo',
    src: '/images/2026EarlySpring/2026EarlySpringLogo.png',
    alt: 'VketReal mini in Sapporo 2026 Early Spring logo',
    caption: t('art.items.logo.caption'),
  },
  {
    id: 'art-kv',
    src: '/images/2026EarlySpring/2026EarlySpring-kv.png',
    alt: 'VketReal mini in Sapporo 2026 Early Spring key visual',
    caption: t('art.items.kv.caption'),
  },
  {
    id: 'art-1',
    src: '/images/2026EarlySpring/art-1.png',
    alt: 'Illustration featuring character with snow globe and Sapporo night view',
    caption: t('art.items.art1.caption'),
  },
])

const itemIds = computed(() => artworks.value.map(art => art.id))

type HaDialogElementExposed = {
  openDialog: () => void
  closeDialog: () => void
}

const artDialog = ref<ComponentPublicInstance<HaDialogElementExposed> | null>(null)
const selectedArt = ref<Artwork | null>(null)

const openArtDialog = async (art: Artwork) => {
  selectedArt.value = art
  await nextTick()
  artDialog.value?.openDialog()
}

const handleDialogClose = () => {
  selectedArt.value = null
}
</script>

<style scoped lang="scss">
@use "#vris/app/assets/styles/_variables" as v;
@use "#vris/app/assets/styles/_mixins" as m;
@use "#vris/app/assets/styles/_functions" as f;

.ha-art {
  display: flex;
  flex-direction: column;
  gap: f.rem(28px);

  .ha-section__heading {
    margin-bottom: 0;
  }
}

.slider-shell {
  position: relative;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;

  :deep(.slider-body) {
    position: relative;
    padding: f.rem(6px) f.rem(48px);
  }

  :deep(.slider-arrow) {
    position: absolute;
    z-index: 2;
    top: 50%;
    transform: translateY(-50%);
  }

  :deep(.button--previous) {
    left: f.rem(6px);
  }

  :deep(.button--next) {
    right: f.rem(6px);
  }

  :deep(.slider-pagination) {
    position: absolute;
    bottom: f.rem(-40px);
    left: 50%;
    transform: translateX(-50%);

    display: flex;
    gap: f.rem(8px);
  }
}

.art-card-button {
  cursor: pointer;

  display: block;

  width: 100%;
  padding: 0;
  border: 0;

  text-align: left;

  background: transparent;
}

  .art-card {
    display: grid;
    grid-template-rows: 1fr auto;
    gap: f.rem(12px);

  margin: 0;
  padding: f.rem(12px);
  border-radius: 20px;

  background: rgba(v.$white, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 16px 50px rgba(v.$navy, 0.22);

  .art-media {
    overflow: hidden;
    aspect-ratio: 16 / 9;
    border-radius: 16px;
    background: #000;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .art-caption {
    margin: 0;
    font-size: f.rem(14px);
    color: #333;
    letter-spacing: 0.01em;
  }
}

.art-dialog {
  display: grid;
  gap: f.rem(12px);
  justify-items: center;

  width: min(1000px, 92vw);
  margin: 0 auto;
  padding: f.rem(16px);

  .art-dialog__media {
    overflow: hidden;
    display: grid;
    place-items: center;

    width: 100%;
    max-height: 80vh;

    img {
      display: block;

      width: 100%;
      height: auto;
      max-height: 80vh;

      object-fit: contain;
    }
  }

  .art-dialog__caption {
    margin: 0;

    font-size: f.rem(14px);
    color: #333;
    text-align: center;
    letter-spacing: 0.01em;
  }
}

.pagination-dot {
  display: block;

  width: f.rem(12px);
  height: f.rem(12px);
  border: 1px solid rgba(v.$navy, 0.35);
  border-radius: 50%;

  background: rgba(v.$navy, 0.25);
}

.nav-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: f.rem(32px);
  height: f.rem(32px);
  border-radius: 50%;

  font-size: f.rem(18px);
  line-height: 1;
  color: #333;

  background: rgba(v.$navy, 0.08);
}

@include m.sp {
  .ha-art {
    gap: f.rem(22px);
  }

  .slider-shell {
    max-width: 100%;
  }

  .art-card {
    padding: f.rem(10px);
    border-radius: 16px;

    .art-caption {
      font-size: f.rem(13px);
    }
  }

  .nav-arrow {
    width: f.rem(28px);
    height: f.rem(28px);
    font-size: f.rem(16px);
  }
}
</style>
