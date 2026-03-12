<i18n lang="yaml">
ja:
  corporate:
    eyebrow: Corporate
    title: ご協力
    description: VketReal mini in 札幌 2026 Early Springは以下の皆様のご協力により実現しています!ありがとうございます！
    role1: 特別協力
    name1: 株式会社HIKKY
    role2: 特別協力・企業出展
    name2: 株式会社インフィニットループ
    role3: 企業出展
    name3: 株式会社スパイス
    role4: 企業出展
    name4: Pimax Technology Inc.
    role5: 企業・法人サポーター
    name5: 合同会社StudioCocoon
    role6: 企業・法人サポーター
    name6: Omus Bridge OÜ
    role7: 連携イベント(前日開催!)
    name7: Multi-Tech Exhibition
    role8: 企業出展
    name8: シャープ株式会社
    role10: 企業・法人サポーター
    name10: 札幌駅総合開発株式会社
    role11: 企業・法人サポーター
    name11: Sapporo Engineer Base
    role12: 企業・法人サポーター
    name12: 札幌商工会議所
    note: ご協力の情報は随時更新されます。
en:
  corporate:
    eyebrow: Corporate
    title: Supporters
    description: This event is made possible with the support of the following organizations.
    role1: Special Cooperation
    name1: 株式会社HIKKY
    role2: Special Cooperation
    name2: 株式会社インフィニットループ
    role3: Corporate Exhibition
    name3: 株式会社スパイス
    role4: Corporate Exhibition
    name4: Pimax Technology Inc.
    role5: Corporate Supporter
    name5: 合同会社StudioCocoon
    role6: Corporate Supporter
    name6: Omus Bridge OÜ
    role7: Collaboration Event(Held the day before!)
    name7: Multi-Tech Exhibition
    role8: Corporate Exhibition
    name8: シャープ株式会社
    role10: Corporate Supporter
    name10: 札幌駅総合開発株式会社
    role11: Corporate Supporter
    name11: Sapporo Engineer Base
    role12: Corporate Supporter
    name12: 札幌商工会議所
    note: Supporter information will be updated regularly.
</i18n>

<template>
  <section
    id="corporate"
    ref="sectionRef"
    class="ha-section ha-corporate"
  >
    <div class="ha-section__heading">
      <p class="ha-section__eyebrow">
        {{ t('corporate.eyebrow') }}
      </p>
      <h2 class="ha-section__title">
        {{ t('corporate.title') }}
      </h2>
      <p class="ha-section__lead">
        {{ t('corporate.description') }}
      </p>
    </div>
    <div class="corporate-grid">
      <HaLink
        v-for="item in corporateItems"
        :key="item.id"
        class="corporate-card"
        :to="item.link"
        :blank="item.isExternal"
      >
        <div class="corporate-card__logo">
          <img
            :src="item.image"
            :alt="item.name"
            loading="lazy"
          >
        </div>
        <div class="corporate-card__body">
          <p class="corporate-card__role">
            {{ item.role }}
          </p>
          <h3 class="corporate-card__name">
            {{ item.name }}
          </h3>
        </div>
      </HaLink>
    </div>
    <p class="corporate-note">
      {{ t('corporate.note') }}
    </p>
  </section>
</template>

<script setup lang="ts">
// カードデータの型定義
interface CorporateCard {
  id: string
  name: string
  role: string
  image: string
  link: string
  isExternal?: boolean
}

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)

const corporateItems = ref<CorporateCard[]>([
  {
    id: 'corp-3',
    name: t('corporate.name3'),
    role: t('corporate.role3'),
    image: '/images/2026EarlySpring/corporate/spice.png',
    link: 'https://spice-group.jp/',
    isExternal: true,
  },
  {
    id: 'corp-4',
    name: t('corporate.name4'),
    role: t('corporate.role4'),
    image: '/images/2026EarlySpring/corporate/pimax.png',
    link: 'https://jp.pimax.com/',
    isExternal: true,
  },
  {
    id: 'corp-8',
    name: t('corporate.name8'),
    role: t('corporate.role8'),
    image: '/images/2026EarlySpring/corporate/sharp.avif',
    link: 'https://k-tai.sharp.co.jp/dash/lp/vr/',
    isExternal: true,
  },
  {
    id: 'corp-5',
    name: t('corporate.name5'),
    role: t('corporate.role5'),
    image: '/images/2026EarlySpring/corporate/cocoon.png',
    link: 'https://www.facebook.com/share/19JKn5KSag/?mibextid=wwXIfr',
    isExternal: true,
  },
  {
    id: 'corp-6',
    name: t('corporate.name6'),
    role: t('corporate.role6'),
    image: '/images/2026EarlySpring/corporate/omusbridge.png',
    link: 'https://omusbridge.com/',
    isExternal: true,
  },
  {
    id: 'corp-7',
    name: t('corporate.name7'),
    role: t('corporate.role7'),
    image: '/images/2026EarlySpring/corporate/multitechexhibition.png',
    link: 'https://www.hmcc.jp/xRExhibition/2026/',
    isExternal: true,
  },
  /*
   * {
   *   id: 'corp-4',
   *   name: t('corporate.name4'),
   *   role: t('corporate.role4'),
   *   image: '/images/2025Summer/logo/roox.png',
   *   link: 'https://www.roox.jp',
   *   isExternal: true,
   * },
   * {
   *   id: 'corp-5',
   *   name: t('corporate.name5'),
   *   role: t('corporate.role5'),
   *   image: '/images/2025Summer/logo/weaverselab.png',
   *   link: 'https://weaverselab.com',
   *   isExternal: true,
   * },
   * {
   *   id: 'corp-6',
   *   name: t('corporate.name6'),
   *   role: t('corporate.role6'),
   *   image: '/images/2025Summer/logo/diver-x.avif',
   *   link: 'https://diver-x.jp/',
   *   isExternal: true,
   * },
   * {
   *   id: 'corp-7',
   *   name: t('corporate.name7'),
   *   role: t('corporate.role7'),
   *   image: '/images/2025Summer/logo/divrse.webp',
   *   link: 'https://divrse.co.jp/',
   *   isExternal: true,
   * },
   * {
   *   id: 'corp-8',
   *   name: t('corporate.name8'),
   *   role: t('corporate.role8'),
   *   image: '/images/2025Summer/logo/suntory.png',
   *   link: 'https://www.suntory.co.jp/',
   *   isExternal: true,
   * },
   * {
   *   id: 'corp-9',
   *   name: t('corporate.name9'),
   *   role: t('corporate.role9'),
   *   image: '/images/2025Summer/logo/bisen.png',
   *   link: 'https://bisen-g.ac.jp/',
   *   isExternal: true,
   * },
   * {
   *   id: 'corp-10',
   *   name: t('corporate.name10'),
   *   role: t('corporate.role10'),
   *   image: '/images/2025Summer/logo/sapporo.png',
   *   link: 'https://www.jr-tower.com/',
   *   isExternal: true,
   * },
   * {
   *   id: 'corp-11',
   *   name: t('corporate.name11'),
   *   role: t('corporate.role11'),
   *   image: '/images/2025Summer/logo/seb.png',
   *   link: 'https://sapporo-engineer-base.dev/',
   *   isExternal: true,
   * },
   * {
   *   id: 'corp-12',
   *   name: t('corporate.name12'),
   *   role: t('corporate.role12'),
   *   image: '/images/2025Summer/logo/shokokaigisho.jpg',
   *   link: 'https://www.sapporo-cci.or.jp/',
   *   isExternal: true,
   * },
   */
  {
    id: 'corp-2',
    name: t('corporate.name2'),
    role: t('corporate.role2'),
    image: '/images/2025Summer/logo/logo-il.png',
    link: 'https://www.infiniteloop.co.jp/?utm_source=vris&utm_medium=referral&utm_campaign=2025_vketreal_in_sapporo',
    isExternal: true,
  },
  {
    id: 'corp-1',
    name: t('corporate.name1'),
    role: t('corporate.role1'),
    image: '/images/2025Summer/logo/logo-hikky.webp',
    link: 'https://hikky.co.jp/?utm_source=vris&utm_medium=referral&utm_campaign=2025_vketreal_in_sapporo',
    isExternal: true,
  },
])

defineExpose({
  sectionRef,
})
</script>

<style lang="scss" scoped>
@use '#vris/app/assets/styles/_variables' as v;
@use '#vris/app/assets/styles/_mixins' as m;
@use '#vris/app/assets/styles/_functions' as f;

.ha-corporate {
  display: flex;
  flex-direction: column;
  gap: f.rem(28px);

  .ha-section__heading {
    width: 100%;
    margin-bottom: 0;
    text-align: left;
  }

  .ha-section__lead {
    width: 100%;
    margin-top: f.rem(12px);
    line-height: 1.7;
    color: rgba(v.$text-body, 0.78);
  }

  .corporate-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: f.rem(20px);
  }

  .corporate-card {
    display: flex;
    flex-direction: column;
    gap: f.rem(12px);

    padding: f.rem(20px);
    border-radius: 20px;

    color: #333;
    text-decoration: none;

    background: v.$white;
    backdrop-filter: blur(10px);
    box-shadow: 0 18px 55px rgba(v.$navy, 0.28);

    transition: transform 0.25s ease, box-shadow 0.25s ease;

    @include m.hover {
      transform: translateY(-4px);
      box-shadow: 0 26px 80px rgba(v.$navy, 0.35);
    }
  }

  .corporate-card__logo {
    display: grid;
    place-items: center;

    width: auto;
    height: 100%;
    min-height: f.rem(140px);
    padding: f.rem(8px);
    border: 1px solid rgba(v.$navy, 0.08);
    border-radius: 14px;

    background: rgba(v.$white, 0.9);

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }

  .corporate-card__body {
    display: flex;
    flex-direction: column;
    gap: f.rem(6px);
  }

  .corporate-card__role {
    margin: 0;
    font-size: f.rem(13px);
    color: #333;
    letter-spacing: 0.04em;
  }

  .corporate-card__name {
    margin: 0;

    font-size: clamp(f.rem(16px), 1.5vw, f.rem(20px));
    font-weight: 700;
    line-height: 1.4;
    color: #333;
  }

  .corporate-note {
    margin: 0;
    font-size: f.rem(14px);
    color: rgba(v.$text-body, 0.7);
    text-align: left;
  }

  @include m.sp {
    gap: f.rem(18px);

    .ha-section__heading {
      text-align: left;
    }

    .corporate-grid {
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: f.rem(14px);
    }

    .corporate-card {
      padding: f.rem(14px);
      border-radius: 16px;
    }

    .corporate-card__logo {
      height: f.rem(110px);
    }

    .corporate-card__name {
      font-size: f.rem(16px);
    }
  }
}
</style>
