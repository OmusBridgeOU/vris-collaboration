<i18n lang="yaml">
ja:
  title: 会場マップ
  alt: VketReal in 札幌 2026 Autumn 会場配置図・出展一覧
  enlarge: クリック・タップで拡大表示
  close: 閉じる
  original: 原寸画像を開く（新しいタブ）
en:
  title: Venue Map
  alt: VketReal in Sapporo 2026 Autumn floor map and exhibitor list (Japanese)
  enlarge: Click or tap to enlarge
  close: Close
  original: Open full-size image (new tab)
</i18n>

<script setup lang="ts">
const { t } = useI18n()
const dialog = ref<HTMLDialogElement | null>(null)
const mapSrc = '/venue-map-2026-autumn.png'
let previousOverflow: string | undefined

const restoreScrolling = () => {
  if (previousOverflow !== undefined) {
    document.documentElement.style.overflow = previousOverflow
    previousOverflow = undefined
  }
}

const openMap = () => {
  if (!dialog.value || dialog.value.open) return
  dialog.value.showModal()
  previousOverflow = document.documentElement.style.overflow
  document.documentElement.style.overflow = 'hidden'
}

const closeMap = () => {
  dialog.value?.close()
  restoreScrolling()
}

onBeforeUnmount(restoreScrolling)
</script>

<template>
  <div class="venue-map">
    <HaSectionTitle
      :title="t('title')"
      label="FLOOR MAP"
    />
    <button
      type="button"
      class="preview"
      aria-haspopup="dialog"
      :aria-label="t('enlarge')"
      @click="openMap"
    >
      <img
        :src="mapSrc"
        :alt="t('alt')"
        width="2000"
        height="1414"
        loading="lazy"
      >
      <span class="hint">{{ t('enlarge') }}</span>
    </button>
    <dialog
      ref="dialog"
      class="map-dialog"
      :aria-label="t('title')"
      @click.self="closeMap"
      @close="restoreScrolling"
    >
      <div class="toolbar">
        <a
          :href="mapSrc"
          target="_blank"
          rel="noopener noreferrer"
        >{{ t('original') }}</a>
        <button
          type="button"
          class="close"
          autofocus
          @click="closeMap"
        >
          {{ t('close') }} ×
        </button>
      </div>
      <div class="image-container">
        <img
          :src="mapSrc"
          :alt="t('alt')"
          width="2000"
          height="1414"
        >
      </div>
    </dialog>
  </div>
</template>

<style lang="scss" scoped>
.venue-map {
  > .preview {
    cursor: zoom-in;

    overflow: hidden;
    display: block;

    width: 100%;
    border-radius: 12px;

    background: #fff;

    > img {
      display: block;
      width: 100%;
      height: auto;
    }

    > .hint {
      display: block;
      padding: 12px;
      font-weight: 700;
      color: #062d61;
    }
  }
}

.map-dialog {
  position: fixed;
  inset: 0;

  width: min(96vw, 2000px);
  max-width: 96vw;
  max-height: 92dvh;
  margin: auto;
  padding: 0;
  border: 0;
  border-radius: 12px;

  background: #fff;

  &::backdrop {
    background: rgb(0 0 0 / 80%);
  }

  > .toolbar {
    position: sticky;
    top: 0;

    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: space-between;

    padding: 12px 16px;

    color: #062d61;

    background: #fff;

    > a {
      text-decoration: underline;
    }

    > .close {
      cursor: pointer;

      flex-shrink: 0;

      min-height: 44px;
      padding: 8px 16px;
      border: 1px solid currentcolor;
      border-radius: 8px;
    }
  }

  > .image-container {
    overflow: auto;

    > img {
      display: block;
      width: 100%;
      min-width: 1000px;
      height: auto;
    }
  }
}
</style>
