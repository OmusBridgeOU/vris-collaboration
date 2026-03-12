<template>
  <div class="layout -default">
    <HoTheHeader
      :isHeaderTransparent="false"
      :isMenuOpen="false"
      :sections="[]"
      :currentSection="0"
      :showMenu="true"
      class="header"
    />
    <main class="main">
      <div class="background" />
      <slot />
    </main>
    <HoTheFooter class="footer" />
  </div>
</template>

<style lang="scss" scoped>
@use '#vris/app/assets/styles/variables' as v;
@use '#vris/app/assets/styles/mixins' as m;

.layout.-default {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background-color: v.$white;

  > .header {
    position: relative;
    background-color: v.$white;

    @include m.sp {
      padding: v.$space-base;
    }
  }

  > .main {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 100dvh;

    > .background {
      position: absolute;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;

      background-image: url('/images/2025Summer/kv.png');
      background-size: cover;
      filter: grayscale(0.5) blur(20px);
    }
  }

  > .footer {
    position: relative;
  }
}
</style>
