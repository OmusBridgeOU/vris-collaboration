<template>
  <HaSectionTitle
    title="参加者向け重要情報"
    label="quick access"
  />
  <div class="grid2x">
    <HaLinkCard
      class="grid2x__child"
      color="cyan"
      title="開催日"
      label="DATE"
    >
      <template #icon>
        <HaCalendarIcon />
      </template>
      <template #body>
        <p />
      </template>
    </HaLinkCard>
    <HaLinkCard
      class="grid2x__child"
      color="magenta"
      title="会場"
      label="LOCATION"
    >
      <template #icon>
        <HaMapPinIcon />
      </template>
      <template #body>
        <p />
      </template>
    </HaLinkCard>
    <HaLinkCard
      class="grid2x__child"
      color="amber"
      title="チケット"
      label="TICKETS"
    >
      <template #icon>
        <HaTicketIcon />
      </template>
      <template #body>
        <p />
      </template>
    </HaLinkCard>
    <HaLinkCard
      class="grid2x__child"
      color="vermilion"
      title="スケジュール"
      label="SCHEDULE"
      icon-url="/icons/material-symbols_timer-outline.svg"
    >
      <template #icon>
        <HaTimerIcon />
      </template>
      <template #body>
        <p />
      </template>
    </HaLinkCard>
  </div>
</template>

<script setup lang="ts">
import HaLinkCard from '../ha/HaLinkCard.vue'
import HaCalendarIcon from '../ha/icons/HaCalendarIcon.vue'
import HaMapPinIcon from '../ha/icons/HaMapPinIcon.vue'
import HaTicketIcon from '../ha/icons/HaTicketIcon.vue'
import HaTimerIcon from '../ha/icons/HaTimerIcon.vue'
</script>

<style lang="scss" scoped>
.grid2x {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 20px;

    &__child {
        height: 100%;
        min-height: 280px; // FIXME: 適当な値を入れている
    }
}
</style>
