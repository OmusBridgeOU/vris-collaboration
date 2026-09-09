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
        - 'LivePocketにて2026年8月26日(水)より販売します。ページ内の「チケットを購入する」ボタンからお申し込みください。'
    item3:
      title: '入場には整理券が必要ですか？'
      contents:
        - '一般参加チケットとは別に、オンライン入場整理券が必要です。'
        - '入場整理券は2026年9月24日(木)19:00よりLivePocketで配布します。'
        - '整理券番号はLivePocketからメールで届きます。事前にLivePocketからのメールを受信できるよう、受信設定をご確認ください。'
    item4:
      title: '一般参加チケットの当日券はありますか？'
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
        - 'Tickets go on sale through LivePocket on Wednesday, August 26, 2026. Use the Buy Tickets button on this page to purchase.'
    item3:
      title: 'Do I need a numbered admission ticket to enter?'
      contents:
        - 'An online numbered admission ticket is required in addition to a general admission ticket.'
        - 'Numbered admission tickets will be available through LivePocket from 7:00 PM on Thursday, September 24, 2026.'
        - 'LivePocket will email your admission number. Please check your email settings in advance to ensure you can receive messages from LivePocket.'
    item4:
      title: 'Will general admission tickets be available at the door?'
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
