<i18n lang="yaml">
ja:
    nameLabel: 'イベント名'
    name: 'VketReal in 札幌 2026 Autumn'
    dateLabel: '開催日'
    date: '2026年9月26日(土)'
    venueLabel: '会場'
    venue: 'アスティ45 4F アスティホール'
en:
    nameLabel: 'Event Name'
    name: 'VketReal in Sapporo 2026 Autumn'
    dateLabel: 'Date'
    date: 'September 26, 2026 (Sat)'
    venueLabel: 'Venue'
    venue: 'Asty45 4F Asty Hall'
</i18n>

<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="event-info">
    <div class="event-info__inner">
      <h3 class="event-info__title">
        EVENT INFO
      </h3>
      <div class="event-info-table">
        <p class="event-info-table__label">
          {{ t('nameLabel') }}
        </p>
        <p class="event-info-table__text">
          {{ t('name') }}
        </p>
      </div>
      <div class="event-info-table__divider" />
      <div class="event-info__table-flex">
        <div class="event-info-table">
          <p class="event-info-table__label">
            {{ t('dateLabel') }}
          </p>
          <p class="event-info-table__text">
            {{ t('date') }}
          </p>
        </div>
        <div class="event-info-table">
          <p class="event-info-table__label">
            {{ t('venueLabel') }}
          </p>
          <p class="event-info-table__text">
            {{ t('venue') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.event-info {
    position: relative;

    align-self: start;

    width: fit-content;
    height: auto;
    margin-left: 24px;
    padding: 48px;

    @include m.tb {
        align-self: center;
        width: 100%;
        width: calc(100% - 48px * 2);
        margin-left: 0;
    }

    @include m.sp {
      width: 100%;
      padding: 20px;
    }

    &::before {
        content: '';

        position: absolute;
        z-index: -1;
        inset: 0;

        background-color: rgb(0 0 0 / 65%);
        filter: blur(32px);

        @include m.tb {
            filter: blur(24px);
        }
    }

    &__inner {
        padding: 8px;
        border-left: 1px solid v.$vket-cyan;
    }

    &__title {
        margin-bottom: 16px;
        font-size: 24px;
        font-weight: bold;
        color: v.$vket-cyan;

        @include m.tb {
            font-size: 12px;
        }
    }

    &__table-flex {
        display: flex;
        gap: 24px;
        justify-content: space-between;

        .event-info-table__text {
            font-size: 16px;

            @include m.sp {
                font-size: 12px;
            }
        }
    }
}

.event-info-table {
    &__label {
        font-size: 14px;
        color: #a0a0a0;

        @include m.sp {
            font-size: 10px;
        }
    }

    &__text {
        font-size: 24px;

        @include m.tb {
            font-size: 16px;
        }
    }

    &__divider {
        width: 100%;
        height: 1px;
        margin: 4px 0;
        background-color: rgb(white, 0.6);
    }
}
</style>
