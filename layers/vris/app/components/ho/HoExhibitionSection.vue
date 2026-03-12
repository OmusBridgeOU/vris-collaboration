<i18n lang="yaml">
ja:
  exhibition:
    title: 出展情報
    description: 現在、パラリアルクリエイター in SAPPOROの出展者を募集しています！
    note: 出展者情報は随時更新されます。
    buttons:
      guideline: 出展ガイドライン
      terms: 出展規約
en:
  exhibition:
    title: Exhibition Information
    description: Experience a new form of exhibition where VR and reality merge.
    note: Exhibitor information will be updated regularly.
    buttons:
      guideline: Exhibition Guidelines
      terms: Exhibition Terms
</i18n>

<template>
  <section
    id="exhibition"
    ref="sectionRef"
    class="section exhibition-section"
  >
    <div class="section-inner">
      <h2 class="section-title">
        {{ t('exhibition.title') }}
      </h2>
      <p class="exhibition-description">
        {{ t('exhibition.description') }}
      </p>
      <div class="button-container">
        <HaLink
          to="/docs/2025summer/exhibition-guideline"
          class="exhibition-button"
        >
          {{ t('exhibition.buttons.guideline') }}
        </HaLink>
        <HaLink
          to="/docs/2025summer/exhibition-terms"
          class="exhibition-button"
        >
          {{ t('exhibition.buttons.terms') }}
        </HaLink>
      </div>
      <p class="exhibition-note">
        {{ t('exhibition.note') }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)

defineExpose({
  sectionRef,
})
</script>

<style lang="scss" scoped>
@use '#vris/app/assets/styles/variables' as v;
@use '#vris/app/assets/styles/mixins' as m;

.section {
  scroll-snap-align: start;

  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 100dvh;

  color: #fff;
}

.section-inner {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: calc((100dvh - 720px) / 2) 2rem 2rem;
  border: 4px solid #000;
  border-radius: 16px;

  color: #000;

  background: #fff9;
}

.section-title {
  margin-bottom: 3rem;
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
}

.exhibition-description {
  max-width: 800px;
  margin-right: auto;
  margin-bottom: 4rem;
  margin-left: auto;

  font-size: 1.2rem;
  text-align: center;
}

.exhibition-note {
  font-size: 0.9rem;
  color: #666;
  text-align: center;
}

.button-container {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.exhibition-button {
  cursor: pointer;

  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;

  font-size: 1rem;
  font-weight: bold;
  color: #fff;

  background: #00A95F;

  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: #008c4d;
    box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
  }
}

@include m.sp {
  .section {
    min-height: 100dvh;
    padding: 1rem 0.5rem;
  }

  .section-inner {
    padding: 70px 1rem 1rem;
  }

  .section-title {
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
    line-height: 1.2;
  }

  .exhibition-description {
    margin-bottom: 1rem;
    font-size: 0.875rem;
    line-height: 1.4;
  }

  .button-container {
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .exhibition-button {
    padding: 0.375rem 0.75rem;
    font-size: 0.8rem;
    line-height: 1.2;
  }

  .exhibition-note {
    font-size: 0.75rem;
    line-height: 1.3;
  }
}
</style>
