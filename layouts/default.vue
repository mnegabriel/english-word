<template>
  <div class="index-layout">
    <header class="bg-indigo-100 py-4">
      <nav class="container mx-auto px-4 flex gap-6">
        <NuxtLink to="/" class="font-bold">EnglishWord</NuxtLink>

        <ul class="flex gap-3">
          <li v-for="(link, i) of links" :key="i">
            <NuxtLink
              :to="link.path"
              class="relative"
              exact-active-class="after:contents after:absolute after:w-2 after:aspect-square after:bg-indigo-600 after:top-[calc(100%+0.125rem)] after:left-1/2 after:-translate-x-1/2 after:rounded-full"
            >
              {{ link.label }}</NuxtLink
            >
          </li>
        </ul>
      </nav>
    </header>

    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',

  data() {
    return {
      links: [
        { label: 'Home', path: '/' },
        { label: 'Saved', path: '/saved' },
      ],
    }
  },
}
</script>
