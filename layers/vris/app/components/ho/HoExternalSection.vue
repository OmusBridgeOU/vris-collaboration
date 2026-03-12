<i18n lang="yaml">
ja:
  external:
    title: 関連リンク
    description: イベントに関連する各種情報へのリンクをまとめています。
    links:
      title1: お問い合わせフォーム(個人向け)
      title2: お問い合わせフォーム(法人向け)
      title3: お問い合わせフォーム(広報向け)
      title4: プライバシーポリシー
      title5: 出展ガイドライン
      title6: 出展規約
      title7: 広報協力メンバー向け募集要項
      title8: 広報協力メンバー募集フォーム

en:
  external:
    title: Related Links
    description: Links to various information related to the event.
    links:
      title1: Contact Form (Individual)
      title2: Contact Form (Corporate)
      title3: Contact Form (Public Relations)
      title4: Privacy Policy
      title5: Exhibition Guidelines
      title6: Exhibition Terms
      title7: Public Relations Member Guidelines
      title8: Public Relations Member Recruitment Form
</i18n>

<template>
  <section
    id="external"
    ref="sectionRef"
    class="section external-section"
  >
    <div class="background" />
    <div class="section-inner">
      <h2 class="section-title">
        {{ t('external.title') }}
      </h2>
      <div class="inner-container">
        <p class="external-description">
          {{ t('external.description') }}
        </p>
        <ul class="links-list">
          <li
            v-for="(link, index) in links"
            :key="`link-${index}`"
            class="link-card"
          >
            <a
              :href="link.link"
              target="_blank"
              rel="noopener noreferrer"
              class="link-content"
            >
              <div class="link-text">
                <h3 class="link-title">
                  {{ link.title }}
                </h3>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)

const links = [
  {
    title: t('external.links.title1'),
    link: 'https://forms.gle/hnsfBRRnQZq4hLQP7',
  },
  {
    title: t('external.links.title2'),
    link: 'https://forms.gle/FuVGEQK23zbFuqgM8 ',
  },
  {
    title: t('external.links.title3'),
    link: 'https://forms.gle/GNQfz8mVaENsDK4M9',
  },
  {
    title: t('external.links.title5'),
    link: '/docs/2025summer/exhibition-guideline',
  },
  {
    title: t('external.links.title6'),
    link: '/docs/2025summer/exhibition-terms',
  },
  {
    title: t('external.links.title7'),
    link: '/docs/pr-member-guideline',
  },
  {
    title: t('external.links.title8'),
    link: 'https://forms.gle/unbDR8ickbWYgUZb7',
  },
  {
    title: t('external.links.title4'),
    link: '/docs/privacy-policy',
  },
]

defineExpose({
  sectionRef,
})
</script>

<style lang="scss" scoped>
@use '#vris/app/assets/styles/variables' as v;
@use '#vris/app/assets/styles/mixins' as m;

.section {
  scroll-snap-align: start;

  position: relative;

  overflow-y: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: auto;
  min-height: 100dvh;
}

.background {
  position: absolute;
  z-index: 0;
  inset: 0;

  background-position: center;
  background-size: cover;
  backdrop-filter: blur(8px);
}

.section-inner {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin: 0 auto;
  padding: calc((100dvh - 720px) / 2) 2rem 2rem;
}

.section-title {
  margin-bottom: 3rem;

  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
  text-align: center;
  text-shadow:
    2px 2px 4px rgb(0 0 0 / 50%),
    -2px -2px 4px rgb(0 0 0 / 50%),
    2px -2px 4px rgb(0 0 0 / 50%),
    -2px 2px 4px rgb(0 0 0 / 50%);
}

.inner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  border: 4px solid #000;
  border-radius: 16px;

  color: #000;

  background: rgb(255 255 255 / 60%);
}

.external-description {
  max-width: 800px;
  margin-right: auto;
  margin-bottom: 4rem;
  margin-left: auto;

  font-size: 1.2rem;
  text-align: center;
}

.links-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  width: 100%;
}

.link-card {
  margin-bottom: 0.5rem;
  padding: 1rem;
  border-radius: 8px;

  text-align: center;

  background: #fff;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);

  transition: transform 0.3s ease;
}

.link-card:hover {
  transform: translateY(-2px);
}

.link-title {
  margin-bottom: 0.1rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #00A95F;
}

.link-description {
  font-size: 0.9rem;
  line-height: 1.4;
  color: #666;
}

.external-note {
  font-size: 0.9rem;
  color: #666;
  text-align: center;
}

@media (width <= 768px) {
  .section {
    min-height: 100dvh;
    padding: 1rem 0.5rem;
  }

  .section-inner {
    padding: 70px 1rem 1rem;
  }

  .inner-container {
    padding: 1rem;
  }

  .section-title {
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
    line-height: 1.2;
  }

  .external-description {
    margin-bottom: 1rem;
    font-size: 0.875rem;
    line-height: 1.4;
  }

  .link-card {
    padding: 0.5rem;
  }

  .link-title {
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }

  .link-description {
    font-size: 0.8rem;
  }

  .links-list {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

}
</style>
