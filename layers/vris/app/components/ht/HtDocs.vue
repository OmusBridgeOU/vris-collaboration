<template>
  <div class="ht-docs">
    <template v-if="page">
      <ContentRenderer
        :value="page"
        class="content"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import 'remark-gh-alerts/styles/github-base.css'
import 'remark-gh-alerts/styles/github-colors-light.css'

defineProps<{
  page?: unknown
}>()
</script>

<style lang="scss">
@use '#vris/app/assets/styles/variables' as v;
@use '#vris/app/assets/styles/mixins' as m;

.ht-docs {
  position: relative;

  max-width: 1200px;
  margin: 2rem 1rem;
  padding: 2rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;

  color: v.$black;

  background: v.$white;
  box-shadow: 0 1px 3px rgb(0 0 0 / 10%);

  > .content {
    width: 100%;
    max-width: 900px;
    height: 100%;
    margin: 0 auto;

    @include m.sp {
      max-width: 100%;
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
      margin-top: 2em;
      font-weight: 700;
      line-height: 1.4;
      letter-spacing: -0.01em;
    }

    h1 {
      align-items: center;

      margin: 1rem 0 2rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #eaecef;

      font-size: 2.5rem;
      color: #2c3e50;

      @include m.sp {
        font-size: 1.8rem;
      }
    }

    h2 {
      margin: 2.5rem 0 1.5rem;
      padding: 1rem 1.5rem;
      border-left: 4px solid #00A95F;

      font-size: 1.8rem;
      color: #2c3e50;

      background-color: #f8f9fa;

      @include m.sp {
        margin: v.space(3) 0 1rem;
        padding: 0.8rem 1rem;
        font-size: 1.4rem;
      }

      > a {
        color: inherit;
        text-decoration: none;
      }
    }

    h3 {
      margin: 2rem 0 1rem;
      padding: 0.5rem 0;
      border-bottom: 1px solid #eaecef;

      font-size: 1.5rem;
      color: #374151;

      background-color: transparent;

      @include m.sp {
        margin: 1.5rem 0 1rem;
        font-size: 1.2rem;
      }

      > a {
        color: inherit;
        text-decoration: none;
      }
    }

    h4 {
      margin: 1.5rem 0 1rem;
      font-size: 1.25rem;
      color: #4b5563;

      @include m.sp {
        font-size: 1.1rem;
      }

      > a {
        color: inherit;
        text-decoration: none;
      }
    }

    h5 {
      margin: 1.5rem 0 1rem;
      font-size: 1.1rem;
      color: #6b7280;
    }

    a {
      color: #00A95F;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    ul,
    ol {
      margin: 1.5rem 0 2rem;
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.75rem;
        line-height: 1.6;
      }

      li:last-child {
        margin-bottom: 0;
      }
    }

    ul > li {
      list-style: disc outside;
    }

    ul ul > li {
      list-style: circle outside;
    }

    li li li {
      list-style: square outside;
    }

    ol > li {
      list-style: decimal outside;
    }

    ol[type='a'] > li {
      list-style: lower-latin outside;
    }

    p {
      margin: 1rem 0 1.5rem;
      line-height: 1.8;
      color: #374151;
    }

    img {
      display: block;

      max-width: 100%;
      height: auto;
      margin: 2rem auto;
      border-radius: 4px;

      box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
    }

    table {
      border-collapse: collapse;
      width: 100%;
      margin: 2rem 0;
      border: 1px solid #e5e7eb;
    }

    code {
      padding: 0.2em 0.4em;
      border-radius: 3px;

      font-size: 0.9em;
      color: #00A95F;

      background-color: #f1f5f9;
    }

    table th,
    table td {
      padding: 0.75rem 1rem;
      border: 1px solid #e5e7eb;

      @include m.sp {
        padding: 0.5rem 0.75rem;
      }
    }

    table td:first-child {
      white-space: nowrap;
    }

    table tr:nth-child(odd) {
      background-color: #f8fafc;
    }

    table tr:nth-child(even) {
      background-color: v.$white;
    }

    thead tr {
      font-weight: 600;
      color: #1f2937;
      background-color: #f1f5f9;
    }

    hr {
      margin: 2rem 0;
      border: 0;
      border-top: 1px solid #e5e7eb;
    }

    dl {
      margin: 1.5rem 0;
      line-height: 1.6;

      dt {
        margin-top: 1rem;
        font-weight: 600;
        color: #374151;
      }

      dd {
        margin: 0.5rem 0 1rem 1rem;
        color: #4b5563;
      }
    }
  }
}
</style>
