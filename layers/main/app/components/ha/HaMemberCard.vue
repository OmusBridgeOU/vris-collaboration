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
    <div class="member-card__icon-wrapper">
      <img
        v-if="props.iconUrl"
        :src="props.iconUrl"
        :alt="props.iconUrl"
        class="member-card__icon"
      >
      <div
        v-else
        class="member-card__icon member-card__icon--default"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="#ceeaff"
        >
          <path d="M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Z" />
        </svg>
      </div>
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
          v-if="props.xLink"
          class="member-card__logo-link"
          :href="props.xLink"
          target="blank"
          rel="noopener noreferrer"
        >
          <HaXIcon />
        </a>
        <a
          v-if="props.instagramLink"
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

  height: 100%;
  padding: 20px;

  &__icon-wrapper {
    overflow: hidden;
    flex-shrink: 0;

    width: 80px;
    height: 80px;
    border-radius: 100%;
  }

  &__icon {
    width: 100%;
    height: 100%;
    object-fit: cover;

    &--default {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: hsl(206deg 30% 50%);

      svg {
        width: 80%;
      }
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
    height: 14px;
  }

  &__logo-link {
    width: 14px;
    height: 14px;
  }
}
</style>
