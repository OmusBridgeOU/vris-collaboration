<template>
  <HaSectionTitle
    title="参加者向け重要情報"
    label="QUICK ACCESS"
  />
  <div class="grid2x">
    <HaGlassCard
      class="grid2x__child"
      variant="link"
      color="cyan"
      title="開催日"
      label="DATE"
      icon-url="/icons/line-md_calendar.svg"
    >
      <template #body>
        <p>ボディの中身</p>
      </template>
    </HaGlassCard>
    <HaGlassCard
      class="grid2x__child"
      variant="link"
      color="magenta"
      title="会場"
      label="LOCATION"
      icon-url="/icons/mingcute_map-pin-line.svg"
    >
      <template #body>
        <p>ボディの中身</p>
      </template>
    </HaGlassCard>
    <HaGlassCard
      class="grid2x__child"
      variant="link"
      color="amber"
      title="チケット"
      label="TICKETS"
      icon-url="/icons/f7_tickets.svg"
    >
      <template #body>
        <p>ボディの中身</p>
      </template>
    </HaGlassCard>
    <HaGlassCard
      class="grid2x__child"
      variant="link"
      color="vermilion"
      title="スケジュール"
      label="SCHEDULE"
      icon-url="/icons/material-symbols_timer-outline.svg"
    >
      <template #body>
        <p>ボディの中身</p>
      </template>
    </HaGlassCard>
  </div>
</template>
