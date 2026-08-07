<i18n lang="yaml">
ja:
  nameLabel: イベント名
  name: VketReal in 札幌 2026 Autumn
  dateLabel: 開催日
  date: 2026年9月26日(土)
  venueLabel: 会場
  venue: アスティ45 4F アスティホール
  ticketLabel: 来場チケット
  ticketNotice: 来場チケットは8月下旬に販売開始予定です。
en:
  nameLabel: Event Name
  name: VketReal in Sapporo 2026 Autumn
  dateLabel: Date
  date: September 26, 2026 (Sat)
  venueLabel: Venue
  venue: Asty45 4F Asty Hall
  ticketLabel: Visitor Tickets
  ticketNotice: Visitor tickets are scheduled to go on sale in late August.
</i18n>

<script setup lang="ts">
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const { t } = useI18n({ useScope: 'local' })
const { t: tGlobal } = useI18n({ useScope: 'global' })

const sectionRef = ref<HTMLElement | null>(null)
const { fadeInUp } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      label="PARTICIPATION GUIDE"
      :title="tGlobal('sectionTitle.participationGuide')"
    />

    <dl class="participation-guide glassy-box-4 glassy-box-4--blue">
      <div class="participation-guide__name">
        <dt class="participation-guide__label">
          {{ t('nameLabel') }}
        </dt>
        <dd class="participation-guide__name-text">
          {{ t('name') }}
        </dd>
      </div>

      <div class="participation-guide__details">
        <div class="participation-guide__detail">
          <dt class="participation-guide__label">
            {{ t('dateLabel') }}
          </dt>
          <dd class="participation-guide__text">
            {{ t('date') }}
          </dd>
        </div>
        <div class="participation-guide__detail">
          <dt class="participation-guide__label">
            {{ t('venueLabel') }}
          </dt>
          <dd class="participation-guide__text">
            {{ t('venue') }}
          </dd>
        </div>
      </div>

      <div class="participation-guide__ticket">
        <dt class="participation-guide__ticket-label">
          {{ t('ticketLabel') }}
        </dt>
        <dd class="participation-guide__ticket-text">
          {{ t('ticketNotice') }}
        </dd>
      </div>
    </dl>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.participation-guide {
  padding: 40px;

  @include m.tb {
    padding: 32px;
  }

  @include m.sp {
    padding: 24px;
  }

  &__name {
    padding-bottom: 28px;
    border-bottom: 1px solid rgb(255 255 255 / 60%);

    @include m.sp {
      padding-bottom: 20px;
    }
  }

  &__details {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 40px;
    padding-top: 28px;

    @include m.sp {
      grid-template-columns: 1fr;
      gap: 20px;
      padding-top: 20px;
    }
  }

  &__detail + &__detail {
    @include m.sp {
      padding-top: 20px;
      border-top: 1px solid rgb(255 255 255 / 30%);
    }
  }

  &__label {
    margin-bottom: 8px;

    font-size: 14px;
    font-weight: 700;
    color: v.$vket-cyan;
    letter-spacing: 0.04em;

    @include m.sp {
      margin-bottom: 6px;
      font-size: 12px;
    }
  }

  &__name-text {
    font-size: 32px;
    font-weight: 700;
    line-height: 1.35;
    color: white;

    @include m.tb {
      font-size: 26px;
    }

    @include m.sp {
      font-size: 20px;
    }
  }

  &__text {
    font-size: 20px;
    line-height: 1.5;
    color: white;

    @include m.sp {
      font-size: 16px;
    }
  }

  &__ticket {
    margin-top: 28px;
    padding-top: 28px;
    border-top: 1px solid rgb(255 255 255 / 30%);

    @include m.sp {
      margin-top: 20px;
      padding-top: 20px;
    }
  }

  &__ticket-label {
    margin-bottom: 8px;

    font-size: 14px;
    font-weight: 700;
    color: v.$vket-amber;
    letter-spacing: 0.04em;

    @include m.sp {
      margin-bottom: 6px;
      font-size: 12px;
    }
  }

  &__ticket-text {
    font-size: 20px;
    font-weight: 700;
    line-height: 1.5;
    color: white;

    @include m.sp {
      font-size: 16px;
    }
  }
}
</style>
