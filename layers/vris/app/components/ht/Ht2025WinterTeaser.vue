<i18n lang="yaml">
ja:
  teaser:
    title: VketReal 2026 Early Spring
    subtitle: 準備中です
    description: |
      VketReal 2026 Early Spring の詳細は近日公開予定です。
      出展や登壇に関する情報は以下のリンクからご確認いただけます。
    buttons:
      exhibitionTerms:
        label: 出展規約
        href: https://vris.jp/docs/2026early-spring/exhibition-terms
      exhibitionGuideline:
        label: 出展ガイドライン
        href: https://vris.jp/docs/2026early-spring/exhibition-guideline
      exhibitionForm:
        label: 出展参加申込フォーム
        href: https://forms.gle/kssmbZoHQMgKtzNb8
      ltGuideline:
        label: LT登壇ガイドライン
        href: https://vris.jp/docs/2026early-spring/lt-guideline
      ltProposal:
        label: LT登壇プロポーザル
        href: https://forms.gle/aGgworaevusiV3ik6
      codeOfConduct:
        label: 行動規範
        href: https://vris.jp/docs/code-of-conduct
en:
  teaser:
    title: VketReal 2026 Early Spring
    subtitle: Coming Soon
    description: |
      Details for VketReal 2026 Early Spring will be announced soon.
      Please check the links below for exhibition and presentation information.
    buttons:
      exhibitionTerms:
        label: Exhibition Terms
        href: https://vris.jp/docs/2026early-spring/exhibition-terms
      exhibitionGuideline:
        label: Exhibition Guidelines
        href: https://vris.jp/docs/2026early-spring/exhibition-guideline
      exhibitionForm:
        label: Exhibition Application Form
        href: https://forms.gle/kssmbZoHQMgKtzNb8
      ltGuideline:
        label: LT Guidelines
        href: https://vris.jp/docs/2026early-spring/lt-guideline
      ltProposal:
        label: LT Proposal Form
        href: https://forms.gle/aGgworaevusiV3ik6
      codeOfConduct:
        label: Code of Conduct
        href: https://vris.jp/docs/code-of-conduct
</i18n>

<template>
  <div class="layout-teaser">
    <div class="teaser-filter" />

    <!-- Logo above teaser-main -->
    <div class="teaser-logo">
      <img
        src="/images/2026EarlySpring/2026EarlySpringLogo.png"
        alt="VketReal 2026 Early Spring Logo"
      />
    </div>

    <main class="teaser-main">
      <div class="teaser-content">
        <div class="teaser-text">
          <h1 class="teaser-title">
            {{ t('teaser.title') }}
          </h1>
          <p class="teaser-subtitle">
            {{ t('teaser.subtitle') }}
          </p>
          <p class="teaser-description">
            {{ t('teaser.description') }}
          </p>
        </div>

        <nav class="teaser-buttons">
          <a
            v-for="(button, key) in buttons"
            :key="key"
            :href="button.href"
            target="_blank"
            rel="noopener noreferrer"
            class="teaser-button"
          >
            <span class="button-label">{{ button.label }}</span>
            <span class="button-icon">→</span>
          </a>
        </nav>
      </div>

      <slot />
    </main>

    <!-- KV image below teaser-main -->
    <div class="teaser-kv">
      <img
        src="/images/2026EarlySpring/2026winter-kv-pre.png"
        alt="VketReal 2026 Early Spring Key Visual"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ButtonConfig {
  label: string
  href: string
}

const { t } = useI18n()

const buttons = computed<Record<string, ButtonConfig>>(() => ({
  exhibitionTerms: {
    label: t('teaser.buttons.exhibitionTerms.label'),
    href: t('teaser.buttons.exhibitionTerms.href'),
  },
  exhibitionGuideline: {
    label: t('teaser.buttons.exhibitionGuideline.label'),
    href: t('teaser.buttons.exhibitionGuideline.href'),
  },
  exhibitionForm: {
    label: t('teaser.buttons.exhibitionForm.label'),
    href: t('teaser.buttons.exhibitionForm.href'),
  },
  ltGuideline: {
    label: t('teaser.buttons.ltGuideline.label'),
    href: t('teaser.buttons.ltGuideline.href'),
  },
  ltProposal: {
    label: t('teaser.buttons.ltProposal.label'),
    href: t('teaser.buttons.ltProposal.href'),
  },
  codeOfConduct: {
    label: t('teaser.buttons.codeOfConduct.label'),
    href: t('teaser.buttons.codeOfConduct.href'),
  },
}))
</script>

<style lang="scss" scoped>
@use "#vris/app/assets/styles/_variables" as v;
@use "#vris/app/assets/styles/_mixins" as m;
@use "#vris/app/assets/styles/_functions" as f;

.layout-teaser {
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;
  min-height: 100dvh;
  padding-top: 4rem;

  color: v.$white;

  // 背景画像の設定（必要に応じて画像パスを変更してください）
  background-image: url('/images/2026EarlySpring/juinbichu-notext.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  @include m.sp {
    padding-top: 3rem;
  }

}

.teaser-filter {
  pointer-events: none;
  content: '';

  position: absolute;
  z-index: 0;
  inset: 0;

  background: linear-gradient(180deg, rgba(v.$navy, 0.45), rgba(v.$navy-1, 0.65));
  backdrop-filter: blur(8px);
  mix-blend-mode: multiply;
}

.teaser-logo {
  position: relative;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 600px;
  height: auto;
  margin: v.space(8) auto v.space(4);
  padding: 0 v.space(6);

  @include m.sp {
    max-width: 320px;
    margin: v.space(6) auto v.space(3);
    padding: 0 v.space(4);
  }

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
}

.teaser-main {
  position: relative;
  z-index: 1;

  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: v.space(12) v.space(6);

  @include m.sp {
    padding: v.space(8) v.space(4);
  }
}

.teaser-kv {
  position: relative;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 800px;
  height: auto;
  margin: v.space(4) auto v.space(8);
  padding: 0 v.space(6);

  @include m.sp {
    max-width: 100%;
    margin: v.space(3) auto v.space(6);
    padding: 0 v.space(4);
  }

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
}

.teaser-content {
  display: flex;
  flex-direction: column;
  gap: v.space(10);
  align-items: center;

  width: 100%;
  max-width: 960px;
  padding: v.space(12) v.space(8);
  border-radius: 32px;

  text-align: center;

  background: rgba(v.$white, 0.08);
  backdrop-filter: blur(20px);
  box-shadow:
    0 8px 32px rgba(v.$navy, 0.3),
    inset 0 1px 0 rgba(v.$white, 0.15);

  @include m.sp {
    gap: v.space(8);
    padding: v.space(8) v.space(5);
    border-radius: 24px;
  }
}

.teaser-text {
  display: flex;
  flex-direction: column;
  gap: v.space(4);
}

.teaser-title {
  margin: 0;

  font-size: clamp(f.rem(32px), 5vw, f.rem(56px));
  font-weight: 800;
  line-height: 1.2;
  color: v.$white;
  text-shadow: 0 4px 12px rgba(v.$navy, 0.5);
}

.teaser-subtitle {
  margin: 0;
  font-size: clamp(f.rem(20px), 3vw, f.rem(28px));
  font-weight: 600;
  color: rgba(v.$white, 0.95);
}

.teaser-description {
  max-width: 640px;
  margin: v.space(2) auto 0;

  font-size: f.rem(15px);
  line-height: 1.7;
  color: rgba(v.$white, 0.85);
  white-space: pre-line;

  @include m.sp {
    font-size: f.rem(14px);
  }
}

.teaser-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: v.space(4);
  width: 100%;

  @include m.sp {
    grid-template-columns: 1fr;
    gap: v.space(3);
  }
}

.teaser-button {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: v.space(4) v.space(6);
  border: 1px solid rgba(v.$white, 0.25);
  border-radius: 16px;

  font-size: f.rem(15px);
  font-weight: 600;
  color: v.$white;
  text-decoration: none;

  background: rgba(v.$white, 0.1);
  backdrop-filter: blur(8px);

  transition:
    all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @include m.sp {
    padding: v.space(3.5) v.space(5);
    font-size: f.rem(14px);
  }

  @include m.hover {
    transform: translateY(-2px);
    border-color: rgba(v.$white, 0.5);
    background: rgba(v.$white, 0.2);
    box-shadow: 0 8px 24px rgba(v.$blue, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
}

.button-label {
  flex: 1;
  text-align: left;
}

.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;

  font-size: f.rem(18px);

  opacity: 0.7;

  transition: transform 0.3s ease;

  .teaser-button:hover & {
    transform: translateX(4px);
    opacity: 1;
  }
}

.teaser-footer {
  position: relative;
  z-index: 1;
  margin-top: auto;
}
</style>
