<script setup lang="ts">
import HaCommingSoon from '../ha/HaCommingSoon.vue'

const { t: tGlobal } = useI18n()
</script>

<template>
  <HaSectionTitle
    label="PARTICIPATION GUIDE"
    :title="tGlobal('sectionTitle.participationGuide')"
  />
  <HaCommingSoon />
</template>
