<i18n lang="yaml">
ja:
  corporate:
    title: ご協力
    description: VketReal in 札幌 2025 Summerは以下の皆様のご協力により実現しています!ありがとうございます！
    role1: 特別協力・企業出展
    name1: 株式会社HIKKY
    role2: 特別協力・企業出展
    name2: 株式会社インフィニットループ
    role3: 企業出展
    name3: 株式会社インプル
    role4: 企業出展
    name4: 株式会社ROOX
    role5: 企業出展
    name5: WeaverseLab株式会社
    role6: 企業出展
    name6: Diver-X株式会社
    role7: 企業出展
    name7: 株式会社diVrse
    role8: 企業・法人サポーター
    name8: サントリー株式会社
    role9: 企業・法人サポーター
    name9: 学校法人 美専学園 北海道芸術デザイン専門学校
    role10: 企業・法人サポーター
    name10: 札幌駅総合開発株式会社
    role11: 企業・法人サポーター
    name11: Sapporo Engineer Base
    role12: 企業・法人サポーター
    name12: 札幌商工会議所
    note: ご協力の情報は随時更新されます。
en:
  corporate:
    title: Supporters
    description: This event is made possible with the support of the following organizations.
    role1: Special Cooperation
    name1: 株式会社HIKKY
    role2: Special Cooperation
    name2: 株式会社インフィニットループ
    role3: Corporate Exhibition
    name3: 株式会社インプル
    role4: Corporate Exhibition
    name4: 株式会社ROOX
    role5: Corporate Exhibition
    name5: WeaverseLab株式会社
    role6: Corporate Exhibition
    name6: Diver-X株式会社
    role7: Corporate Exhibition
    name7: 株式会社diVrse
    role8: Corporate Supporter
    name8: サントリー株式会社
    role9: Corporate Supporter
    name9: 学校法人 美専学園 北海道芸術デザイン専門学校
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
    class="section corporate-section"
  >
    <div class="background" />
    <div class="section-inner">
      <h2 class="section-title">
        {{ t('corporate.title') }}
      </h2>
      <div class="inner-container">
        <p class="corporate-description">
          {{ t('corporate.description') }}
        </p>
        <ul class="card-grid-list">
          <li
            v-for="item in corporateItems"
            :key="item.id"
            class="card-item"
          >
            <HaLink
              :to="item.link"
              :blank="item.isExternal"
              class="card-link"
            >
              <div class="corporate-card">
                <div class="card-image">
                  <img
                    :src="item.image"
                    :alt="item.name"
                    loading="lazy"
                  >
                </div>
                <div class="card-content">
                  <h4 class="card-title">
                    {{ item.name }}
                  </h4>
                  <p class="card-role">
                    {{ item.role }}
                  </p>
                </div>
              </div>
            </HaLink>
          </li>
        </ul>
        <p class="corporate-note">
          {{ t('corporate.note') }}
        </p>
      </div>
    </div>
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
    id: 'corp-4',
    name: t('corporate.name4'),
    role: t('corporate.role4'),
    image: '/images/2025Summer/logo/roox.png',
    link: 'https://www.roox.jp',
    isExternal: true,
  },
  {
    id: 'corp-5',
    name: t('corporate.name5'),
    role: t('corporate.role5'),
    image: '/images/2025Summer/logo/weaverselab.png',
    link: 'https://weaverselab.com',
    isExternal: true,
  },
  {
    id: 'corp-3',
    name: t('corporate.name3'),
    role: t('corporate.role3'),
    image: '/images/2025Summer/logo/impl.png',
    link: 'https://www.impl.co.jp/',
    isExternal: true,
  },
  {
    id: 'corp-6',
    name: t('corporate.name6'),
    role: t('corporate.role6'),
    image: '/images/2025Summer/logo/diver-x.avif',
    link: 'https://diver-x.jp/',
    isExternal: true,
  },
  {
    id: 'corp-7',
    name: t('corporate.name7'),
    role: t('corporate.role7'),
    image: '/images/2025Summer/logo/divrse.webp',
    link: 'https://divrse.co.jp/',
    isExternal: true,
  },
  {
    id: 'corp-8',
    name: t('corporate.name8'),
    role: t('corporate.role8'),
    image: '/images/2025Summer/logo/suntory.png',
    link: 'https://www.suntory.co.jp/',
    isExternal: true,
  },
  {
    id: 'corp-9',
    name: t('corporate.name9'),
    role: t('corporate.role9'),
    image: '/images/2025Summer/logo/bisen.png',
    link: 'https://bisen-g.ac.jp/',
    isExternal: true,
  },
  {
    id: 'corp-10',
    name: t('corporate.name10'),
    role: t('corporate.role10'),
    image: '/images/2025Summer/logo/sapporo.png',
    link: 'https://www.jr-tower.com/',
    isExternal: true,
  },
  {
    id: 'corp-11',
    name: t('corporate.name11'),
    role: t('corporate.role11'),
    image: '/images/2025Summer/logo/seb.png',
    link: 'https://sapporo-engineer-base.dev/',
    isExternal: true,
  },
  {
    id: 'corp-12',
    name: t('corporate.name12'),
    role: t('corporate.role12'),
    image: '/images/2025Summer/logo/shokokaigisho.jpg',
    link: 'https://www.sapporo-cci.or.jp/',
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
  {
    id: 'corp-2',
    name: t('corporate.name2'),
    role: t('corporate.role2'),
    image: '/images/2025Summer/logo/logo-il.png',
    link: 'https://www.infiniteloop.co.jp/?utm_source=vris&utm_medium=referral&utm_campaign=2025_vketreal_in_sapporo',
    isExternal: true,
  },
])

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

  background-image: url('/corporate/bg.jpg');
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

.corporate-description {
  max-width: 800px;
  margin-right: auto;
  margin-bottom: 4rem;
  margin-left: auto;

  font-size: 1.2rem;
  text-align: center;
}

.corporate-note {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  text-align: center;
}

.card-grid-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  width: 100%;
  max-width: 900px;
  margin: 0 auto 2rem;
  padding: 0;

  list-style: none;
}

.card-item {
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
}

.card-link {
  display: block;
  height: 100%;
  color: inherit;
  text-decoration: none;
}

.corporate-card {
  position: relative;

  overflow: hidden;
  display: flex;
  flex-direction: column;

  height: 100%;
  border: 3px solid #000;
  border-radius: 12px;

  background: #fff;
  box-shadow: 4px 4px 0 rgb(0 0 0 / 10%);

  transition: all 0.3s ease;

  &:hover {
    border-color: #00A95F;
    box-shadow: 6px 6px 0 rgb(0 0 0 / 20%);
  }
}

.card-image {
  position: relative;

  overflow: hidden;

  width: 100%;
  height: 150px;

  background-color: #fff;
  backdrop-filter: blur(4px);

  img {
    display: block;

    width: 80%;
    height: 100%;
    margin: 0 auto;

    object-fit: contain;

    transition: transform 0.3s ease;
  }

  .corporate-card:hover & img {
    transform: scale(1.1);
  }
}

.card-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;

  padding: 1rem;

  text-align: center;
}

.card-title {
  margin: 0 0 0.5rem;

  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.3;
  color: #000;

  transition: color 0.3s ease;

  .corporate-card:hover & {
    color: #00A95F;
  }
}

.card-role {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.2;
  color: #666;
}

@include m.sp {
  .card-grid-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    max-width: 100%;
    margin-bottom: 1.5rem;
  }

  .card-image {
    height: 120px;
  }

  .card-content {
    padding: 0.75rem;
  }

  .card-title {
    font-size: 1rem;
  }

  .card-role {
    font-size: 0.8rem;
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

  .inner-container {
    padding: 1rem;
  }

  .section-title {
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
    line-height: 1.2;
  }

  .corporate-description {
    margin-bottom: 1rem;
    font-size: 0.875rem;
    line-height: 1.4;
  }

  .corporate-note {
    font-size: 0.75rem;
    line-height: 1.3;
  }
}
</style>
