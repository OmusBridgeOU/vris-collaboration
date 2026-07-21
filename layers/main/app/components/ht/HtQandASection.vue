<i18n lang="yaml">
ja:
  items:
    item1:
      title: 'VketReal in 札幌 とはどのようなイベントですか？'
      contents:
        - 'HIKKY主催のイベントVketRealから派生した、VRSNSで活躍するクリエイターが集う有志主催のリアルイベントです。'
    item2:
      title: 'チケットはどこで買えますか？'
      contents:
        - 'オンラインにて事前販売予定しております。'
    item3:
      title: '入場制限等はありますか？'
      contents:
        - 'チケットの枚数の制限等はありません。'
    item4:
      title: '当日券はありますか？'
      contents:
        - '用意する予定です。'
en:
  items:
    item1:
      title: 'What kind of event is VketReal in Sapporo?'
      contents:
        - 'An in-person event that brings together creators active in the VR/SNS scene.'
        - 'A community-run event derived from VketReal, organized by HIKKY.'
    item2:
      title: 'Where can I purchase tickets?'
      contents:
        - 'Tickets are planned to be sold online in advance.'
    item3:
      title: 'Is there a limit on the number of attendees?'
      contents:
        - 'There is no limit on the number of tickets available.'
    item4:
      title: 'Will tickets be available at the door?'
      contents:
        - 'Yes, we plan to offer tickets at the door.'
</i18n>

<script setup lang="ts">
import HaAccordionItem from '../ha/HaAccordionItem.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const { t, tm, rt } = useI18n({ useScope: 'local' })
const { t: tGlobal } = useI18n()

const items = computed(() => [
  {
    id: 1,
    title: t('items.item1.title'),
    contents: (tm('items.item1.contents') as string[]).map(c => rt(c)),
  },
  {
    id: 2,
    title: t('items.item2.title'),
    contents: (tm('items.item2.contents') as string[]).map(c => rt(c)),
  },
  {
    id: 3,
    title: t('items.item3.title'),
    contents: (tm('items.item3.contents') as string[]).map(c => rt(c)),
  },
  {
    id: 4,
    title: t('items.item4.title'),
    contents: (tm('items.item4.contents') as string[]).map(c => rt(c)),
  },
])

const sectionRef = ref<HTMLElement | null>(null)
const { fadeInUp } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      :title="tGlobal('sectionTitle.qa')"
      label="Q&A"
    />
    <HaAccordionItem :items="items">
      <template #content="{ item }">
        <p
          v-for="(content, index) in item.contents"
          :key="`${item.id}-${index}`"
          class="content__text"
        >
          {{ content }}
        </p>
      </template>
    </HaAccordionItem>
  </div>
</template>
