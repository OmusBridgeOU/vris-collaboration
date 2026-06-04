<template>
  <div
    id="gsap-fv"
    class="hero"
  >
    <div
      class="hero__bg"
      style="background-image: url("/kv.png")"
    />
    <img
      src="/kv.png"
      alt="Vket Real in 札幌 2026 Autumnのキービジュアル"
      class="hero__kv"
    >
  </div>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100svw;
  height: 100svh;

  clip-path: inset(0);

  &__bg {
    position: absolute;
    z-index: 1;
    inset: 0;
    transform: scale(1.2);

    overflow: hidden;

    width: 100%;
    height: 100%;

    background-position: center;
    background-size: cover;
    filter: blur(8px);
  }

  &__kv {
    z-index: 2;

    overflow: hidden;

    width: 100%;
    height: 100%;

    object-fit: contain;
  }
}
</style>
