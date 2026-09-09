<template>
  <div
    class="ha-youtube-embed"
    :style="{ aspectRatio: `${aspectWidth} / ${aspectHeight}` }"
  >
    <iframe
      class="ha-youtube-embed__iframe"
      :src="embedSrc"
      :title="title"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      :allowfullscreen="allowFullscreen"
      referrerpolicy="strict-origin-when-cross-origin"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  videoId: string // YouTubeの動画ID（例: 'dQw4w9WgXcQ'）。URL全体ではなくIDのみを渡す
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
  title?: string
  showUnrelatedVideos?: boolean
  allowFullscreen?: boolean
  privacyEnhanced?: boolean
  aspectWidth?: number
  aspectHeight?: number
}>(), {
  autoplay: false,
  muted: false,
  loop: false,
  controls: true,
  title: 'YouTube video player',
  showUnrelatedVideos: false,
  allowFullscreen: true,
  privacyEnhanced: true,
  aspectWidth: 16,
  aspectHeight: 9,
})

const embedSrc = computed(() => {
  const host = props.privacyEnhanced ? 'www.youtube-nocookie.com' : 'www.youtube.com'
  const params = new URLSearchParams({
    autoplay: props.autoplay ? '1' : '0',
    mute: props.muted ? '1' : '0',
    loop: props.loop ? '1' : '0',
    controls: props.controls ? '1' : '0',
    rel: props.showUnrelatedVideos ? '1' : '0',
    playsinline: '1',
  })

  // loop=1を機能させるには、YouTube側の仕様上playlistパラメータに同じvideoIdを渡す必要がある
  if (props.loop) {
    params.set('playlist', props.videoId)
  }

  return `https://${host}/embed/${props.videoId}?${params.toString()}`
})
</script>

<style scoped>
.ha-youtube-embed {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.ha-youtube-embed__iframe {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;
  border: none;
}
</style>
