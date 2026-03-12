<template>
  <div
    class="vertical-slider-wrap"
    :style="{
      '--slide-amount': props.amount,
      '--height-pc': props.heightPc,
      '--height-sp': props.heightSp,
    }"
    role="presentation"
  >
    <div
      class="vertical-slider-body"
      role="presentation"
    >
      <div
        ref="slider"
        class="vertical-slider-inner"
        role="presentation"
        :style="{
          '--gap-pc': props.gapPc,
          '--gap-sp': props.gapSp,
        }"
        @touchstart="startDragging"
        @touchmove="inDragging"
        @touchend="endDragging"
        @mousedown="startDragging"
        @mousemove="inDragging"
        @mouseup="endDragging"
        @mouseleave="endDragging"
      >
        <template v-if="props.loop">
          <div
            ref="clonedSlideBefore"
            class="vertical-slider -before"
            :class="{
              '-center': props.center ? true : false,
            }"
            role="presentation"
            aria-hidden="true"
          >
            <slot name="item"></slot>
          </div>
        </template>
        <div
          :id="props.slidename"
          ref="receivedSlideItemsContainer"
          class="vertical-slider"
          :class="{
            '-center': props.center,
          }"
          role="presentation"
        >
          <slot name="item"></slot>
        </div>
        <template v-if="props.loop">
          <div
            ref="clonedSlideAfter"
            class="vertical-slider -after"
            :class="{
              '-center': props.center,
            }"
            role="presentation"
            aria-hidden="true"
          >
            <slot name="item"></slot>
          </div>
        </template>
      </div>
    </div>
    <template v-if="props.pagination">
      <ol
        class="vertical-slider-pagination"
        role="tablist"
      >
        <li
          v-for="index in props.amount"
          :key="index"
          class="vertical-slider-pagination-item"
          role="presentation"
        >
          <button
            :aria-label="
              i18n.locale.value === 'ja'
                ? `スライド${index}枚目を表示する`
                : `Display slide ${index}`
            "
            :aria-controls="props.itemsId[index - 1]"
            :aria-selected="index === Math.abs(currentSlide) + 1"
            role="tab"
            class="vertical-slider-pagination-button"
            type="button"
            @click="jumpSlider(index - 1), stopAutoPlay()"
          >
            <slot name="pagination"></slot>
          </button>
        </li>
      </ol>
    </template>
    <template v-if="props.arrow">
      <button
        class="vertical-slider-arrow button--previous"
        :aria-label="
          i18n.locale.value === 'ja'
            ? `スライドを1枚戻す`
            : `Show previous slide`
        "
        :aria-controls="props.slidename"
        :disabled="!props.loop && disabledPrevious"
        type="button"
        @click="moveSlider('previous'), stopAutoPlay()"
      >
        <slot name="navigationprevious"></slot>
      </button>
      <button
        class="vertical-slider-arrow button--next"
        :aria-label="
          i18n.locale.value === 'ja' ? `スライドを1枚進める` : `Show next slide`
        "
        :aria-controls="props.slidename"
        :disabled="!props.loop && disabledNext"
        type="button"
        @click="moveSlider('next'), stopAutoPlay()"
      >
        <slot name="navigationnext"></slot>
      </button>
    </template>
    <template v-if="props.page">
      <div
        role="progressbar"
        class="vertical-slider-page"
        aria-valuemin="1"
        :aria-valuemax="props.amount"
        :aria-valuenow="Math.abs(currentSlide) + 1"
      >
        <span
          class="vertical-slider-page-start"
          role="presentation"
        >{{
          Math.abs(currentSlide) + 1
        }}</span>
        <span
          class="vertical-slider-page-total"
          role="presentation"
        >{{
          props.amount
        }}</span>
      </div>
    </template>
    <template v-if="props.autoplay">
      <button
        type="button"
        :aria-controls="props.slidename"
        :aria-label="
          i18n.locale.value === 'ja'
            ? `スライドの自動再生を開始する`
            : `Start automatic playback of slides`
        "
        @click="startAutoPlay"
      >
        <slot name="autoplaystart"></slot>
      </button>
      <button
        type="button"
        :aria-controls="props.slidename"
        :aria-label="
          i18n.locale.value === 'ja'
            ? `スライドの自動再生を停止する`
            : `Stop automatic playback of slides`
        "
        @click="stopAutoPlay"
      >
        <slot name="autoplaystop"></slot>
      </button>
    </template>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  slidename: string
  itemsId: string[]
  arrow: boolean
  pagination: boolean
  amount: number
  loop: boolean
  center: boolean
  page: boolean
  autoplay: boolean
  interval: number
  gapPc: string
  gapSp: string
  heightPc: string
  heightSp: string
  duration: number
  easing: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear'
  draggable: boolean
}>()

const emit = defineEmits<{
  activeIndexChange: [{ index: number }]
}>()

const i18n = useI18n()
const slider = ref<HTMLElement | null>(null) // スライド直上の親要素
const currentSlide = ref(0) // 現在のスライド番号
const disabledNext = ref(false) // ループしない場合に次へボタンをdisabledにするフラグ
const disabledPrevious = ref(false) // ループしない場合に前へボタンをdisabledにするフラグ
const previousY = ref(0) // アニメーションタイムラインのスライド開始位置
const nextY = ref(0) // アニメーションタイムラインのスライド終了位置
const clonedSlideBefore = ref<HTMLElement | null>(null) // ループする場合の前のスライド
const clonedSlideAfter = ref<HTMLElement | null>(null) // ループする場合の後のスライド
const receivedSlideItemsContainer = ref<HTMLElement | null>(null) // アクティブなスライドを判定するために受け取ったスライド要素を全て格納

// 矢印でスライドを移動させる関数
const moveSlider = async (direction: 'previous' | 'next') => {
  if (!slider.value) {
    return
  }
  if (direction === 'previous') {
    updateCurrentSlide('previous')
  } else if (direction === 'next') {
    updateCurrentSlide('next')
  }
  // loopがfalseのとき、currentIndex次第でボタンのdisabledを制御する
  if (!props.loop) {
    controlButton()
  }
  if (slider.value instanceof HTMLElement === false) {
    throw new Error('slider要素はHTMLElementではありません')
  }
  await slideY(slider.value, previousY.value, nextY.value)
  // アクティブなスライドを更新
  setActiveSlide()
  // コンポーネントにアクティブなインデックスの変更を通知
  emit('activeIndexChange', { index: Math.abs(currentSlide.value) })
}

// スライドアニメーション（縦方向）
const slideY = (target: HTMLElement | null, from: number, to: number) => {
  return target?.animate(
    [
      { transform: `translateY(${from}%)` },
      { transform: `translateY(${to}%)` },
    ],
    {
      duration: props.duration,
      iterations: 1,
      easing: props.easing,
      fill: 'both',
    },
  ).finished
}

// loopがfalseな場合にボタンのdisabledを制御する関数
const controlButton = () => {
  if (!slider.value) {
    throw new Error('slider要素はnull')
  }
  if (currentSlide.value === 0) {
    // 1枚目表示中は戻るボタンをdisabledにする
    disabledNext.value = false
    disabledPrevious.value = true
  } else if (currentSlide.value * -1 === props.amount - 1) {
    // 最後のスライド表示中は進むボタンをdisabledにする
    disabledNext.value = true
    disabledPrevious.value = false
  } else {
    // それ以外はdisabledを解除する
    disabledNext.value = false
    disabledPrevious.value = false
  }
}

// ページネーションでスライドを移動させる関数
const jumpSlider = async (index: number) => {
  if (!slider.value) {
    throw new Error('slider要素はnull')
  }
  if (slider.value instanceof HTMLElement === false) {
    throw new Error('slider要素はHTMLElementではありません')
  }
  updateCurrentSlide('pagination', index)
  controlButton()
  if (slider.value instanceof HTMLElement) {
    await slideY(slider.value, previousY.value, nextY.value)
    // アクティブなスライドを更新
    setActiveSlide()
    emit('activeIndexChange', { index: Math.abs(currentSlide.value) })
  }
}

// currentSlideを更新する関数
const updateCurrentSlide = (
  type: 'next' | 'previous' | 'pagination',
  index?: number,
) => {
  const backToFirstSlideNoLoop = () => {
    previousY.value = ((100 / props.amount) * props.amount - 1) * -1
    currentSlide.value = 0
    nextY.value = 0
  }

  const slideNextByArrowNoLoop = () => {
    previousY.value = (100 / props.amount) * currentSlide.value
    currentSlide.value -= 1
    nextY.value = (100 / props.amount) * currentSlide.value
  }

  const slideNextByArrowLoop = () => {
    if (currentSlide.value * -1 === props.amount - 1) {
      previousY.value = 100 / props.amount
      currentSlide.value = 0
      nextY.value = 0
    } else {
      previousY.value = (100 / props.amount) * currentSlide.value
      currentSlide.value -= 1
      nextY.value = (100 / props.amount) * currentSlide.value
    }
  }

  const slideBackByArrowNoLoop = () => {
    previousY.value = (100 / props.amount) * currentSlide.value
    currentSlide.value += 1
    nextY.value = (100 / props.amount) * currentSlide.value
  }

  const slideBackByArrowLoop = () => {
    if (currentSlide.value === 0) {
      previousY.value = (100 / props.amount) * props.amount * -1
      currentSlide.value = props.amount * -1 + 1
      nextY.value = (100 / props.amount) * currentSlide.value
    } else {
      previousY.value = (100 / props.amount) * currentSlide.value
      currentSlide.value += 1
      nextY.value = (100 / props.amount) * currentSlide.value
    }
  }

  const slideJumpByPagination = () => {
    previousY.value = (100 / props.amount) * currentSlide.value
    if (index === undefined) return
    currentSlide.value = index * -1
    nextY.value = (100 / props.amount) * currentSlide.value
  }

  // ループがfalseで最後のスライドの場合、最初に戻す(自動再生時のみこの条件に一致する)
  if (
    type === 'next'
    && props.loop === false
    && Math.abs(currentSlide.value) === props.amount - 1
  ) {
    return backToFirstSlideNoLoop()
  }

  // 矢印による次に進む操作かつループがfalseの場合
  if (type === 'next' && props.loop === false) {
    return slideNextByArrowNoLoop()
  }

  // 矢印による次に進む操作かつループがtrueの場合
  if (type === 'next' && props.loop) {
    return slideNextByArrowLoop()
  }

  // 矢印による前に戻る操作かつループがfalseの場合
  if (type === 'previous' && props.loop === false) {
    return slideBackByArrowNoLoop()
  }

  // 矢印による前に戻る操作かつループがtrueの場合
  if (type === 'previous' && props.loop) {
    return slideBackByArrowLoop()
  }

  // ページネーションによるスライド移動の場合
  if (type === 'pagination' && index !== undefined) {
    return slideJumpByPagination()
  }
}

// アクティブなスライドに-activeクラスを付与し、それ以外のスライドをアクセシビリティツリーから除外する関数
const setActiveSlide = () => {
  const sliderItems = receivedSlideItemsContainer.value?.querySelectorAll<HTMLElement>('.slider-item')
  if (sliderItems) {
    sliderItems.forEach((item: HTMLElement, index: number) => {
      if (index === Math.abs(currentSlide.value)) {
        item.classList.add('-active')
        item.removeAttribute('aria-hidden')
      } else {
        item.classList.remove('-active')
        item.setAttribute('aria-hidden', 'true')
      }
    })
  }
}

// 複製されたスライドからid属性を除去する関数
const removeId = () => {
  if (props.loop) {
    if (!clonedSlideBefore.value) {
      throw new Error('clonedSlideBefore要素はnull')
    }
    if (!clonedSlideAfter.value) {
      throw new Error('clonedSlideBefore要素はnull')
    }
    // clonedSlideBefore.valueの子要素の,slider-item全てからid属性を除去する
    const clonedSlideBeforeItems
      = clonedSlideBefore.value.querySelectorAll<HTMLElement>('.slider-item')
    clonedSlideBeforeItems.forEach((item: HTMLElement) => {
      item.removeAttribute('id')
    })
    // clonedSlideBefore.valueの子要素の.slider-item全てからid属性を除去する
    const clonedSlideAfterItems
      = clonedSlideAfter.value.querySelectorAll<HTMLElement>('.slider-item')
    clonedSlideAfterItems.forEach((item: HTMLElement) => {
      item.removeAttribute('id')
    })
  }
}

// ドラッグとスワイプでスライドを移動させる関数
let startY = 0
let moveY = 0
let isDragging = false
let movingDown = false

// ドラッグとスワイプ開始時の処理
const startDragging = (event: MouseEvent | TouchEvent) => {
  if (event instanceof MouseEvent) {
    event.preventDefault()
  }
  if (!props.draggable) return
  // ドラッグ開始地点を保存
  if (event instanceof MouseEvent) {
    startY = event.pageY
  } else if (event instanceof TouchEvent && event.touches[0]) {
    startY = event.touches[0].pageY
  } else {
    return
  }
  isDragging = true
}

// ドラッグ中の処理
const inDragging = (event: MouseEvent | TouchEvent) => {
  if (event instanceof MouseEvent) {
    event.preventDefault()
  }
  if (!props.draggable) return
  if (!isDragging) return
  // 移動距離を計算
  if (event instanceof MouseEvent) {
    moveY = (startY - event.pageY) * -1
  } else if (event instanceof TouchEvent && event.touches[0]) {
    moveY = (startY - event.touches[0].pageY) * -1
  } else {
    return
  }
  // 上下どちらに移動しているか判別
  movingDown = moveY < 0
  if (!slider.value) {
    throw new Error('slider要素はnull')
  }
  slider.value.style.translate = `0 ${moveY * 0.3}px`
}

// ドラッグ終了時の処理
const endDragging = async (event: MouseEvent | TouchEvent) => {
  if (event instanceof MouseEvent) {
    event.preventDefault()
  }
  if (!props.draggable) return
  if (!isDragging) return
  isDragging = false

  if (movingDown && moveY < -50) {
    // 現在のスライドが最後のスライドの場合はreturn
    if (!props.loop && Math.abs(currentSlide.value) === props.amount - 1) {
      if (!slider.value) {
        throw new Error('slider要素はnull')
      }
      slider.value.style.translate = '0 0'
      return
    }
    await moveSlider('next')
  } else if (movingDown === false && moveY > 50) {
    // 現在のスライドが最初のスライドの場合はreturn
    if (props.loop === false && currentSlide.value === 0) {
      if (!slider.value) {
        throw new Error('slider要素はnull')
      }
      slider.value.style.translate = '0 0'
      return
    }
    await moveSlider('previous')
  }

  if (!slider.value) {
    throw new Error('slider要素はnull')
  }
  slider.value.style.translate = '0 0'

  stopAutoPlay()
  moveY = 0
}

// スライダーを自動再生する関数
let timer: number | undefined
const startAutoPlay = () => {
  timer = window.setInterval(() => {
    void moveSlider('next')
  }, props.interval)
}

// スライダーの自動再生を停止する関数
const stopAutoPlay = () => {
  if (!props.autoplay) return
  clearInterval(timer)
}

// スライダーを初期化
onMounted(() => {
  setActiveSlide()
  removeId()
  controlButton()
  if (props.autoplay) {
    startAutoPlay()
  }
})

// 外部からアクセス可能な関数をエクスポート
defineExpose({
  moveSlider,
  jumpSlider,
  startAutoPlay,
  stopAutoPlay,
})
</script>

<style lang="scss" scoped>
@use '#vris/app/assets/styles/_variables' as v;
@use '#vris/app/assets/styles/_mixins' as m;

.vertical-slider-wrap {
  --slide-item-height: var(--height-pc);
  --slide-amount: var(--slide-amount);

  position: relative;
  width: 100%;
  height: 100%;

  @include m.sp {
    --slide-item-height: var(--height-sp);
  }

  .vertical-slider-body {
    position: relative;

    container-type: block-size;
    overflow: clip;

    width: 96%;
    height: 100%;

    .vertical-slider-inner {
      position: relative;
      height: calc(var(--slide-item-height) * var(--slide-amount) * 1%);

      .vertical-slider {
        display: flex;
        flex-direction: column;
        align-items: stretch;

        width: 100%;
        height: 100%;

        &.-center {
          transform: translateY(
            calc((100 - var(--slide-item-height)) / 2 * 1cqb)
          );
        }

        &.-before {
          position: absolute;
          top: 0;
          left: 0;
          translate: 0 -100%;
        }

        &.-after {
          position: absolute;
          top: 0;
          left: 0;
          translate: 0 100%;
        }
      }

      :deep(.slider-item) {
        flex-shrink: 0;
        height: calc(100% / var(--slide-amount));
        padding-block: calc(var(--gap-pc) * 0.5);

        @include m.sp {
          padding-block: calc(var(--gap-sp) * 0.5);
        }
      }
    }
  }

  .vertical-slider-arrow {
    position: absolute;
    z-index: 10;
    left: 50%;
    transform: translateX(-50%);

    &.button--previous {
      top: -60px;
    }

    &.button--next {
      bottom: -60px;
    }

    @include m.sp {
      &.button--previous {
        top: -50px;
      }

      &.button--next {
        bottom: -50px;
      }
    }
  }
}
</style>
