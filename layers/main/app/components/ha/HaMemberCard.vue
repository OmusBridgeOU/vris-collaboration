<script lang="ts" setup>
import HaInstagramIcon from './icons/HaInstagramIcon.vue'
import HaXIcon from './icons/HaXIcon.vue'

const props = defineProps<{
  id: number
  name: string
  iconUrl: string
  role: string
  xLink: string | null
  instagramLink: string | null
}>()
</script>

<template>
  <div class="glassy-box-4 glassy-box-4--radius-min member-card none-hover-animation">
    <div class="member-card__icon">
      <img
        :src="props.iconUrl"
        :alt="props.iconUrl"
      >
    </div>
    <div class="member-card__right">
      <p class="member-card__name">
        {{ props.name }}
      </p>
      <p class="member-card__role">
        {{ props.role }}
      </p>
      <div class="member-card__logo-link-flex">
        <a
          class="member-card__logo-link"
          :href="props.xLink"
          target="blank"
          rel="noopener noreferrer"
        >
          <HaXIcon />
        </a>
        <a
          class="member-card__logo-link"
          :href="props.instagramLink"
          target="blank"
          rel="noopener noreferrer"
        >
          <HaInstagramIcon />
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.member-card{
    display: flex;
    gap: 14px;
    align-items: center;

    height: fit-content;
    padding: 20px;

    &__icon {
        overflow: hidden;
        width: 80px;
        height: 80px;
        border-radius: 100%;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__right {
        display: flex;
        flex-direction: column;
        gap: 12px;
        justify-content: space-between;

        min-height: 80px;

        svg {
            display: block;
        }
    }

    &__name {
        font-size: 20px;
        font-weight: 500;
        line-height: 1em;
        color: white;
    }

    &__role {
        font-size: 14px;
        line-height: 1em;
        color: v.$vket-amber;
    }

    &__logo-link-flex {
        display: flex;
        gap: 12px;
    }

    &__logo-link {
        width: 14px;
        height: 14px;
    }
}
</style>
