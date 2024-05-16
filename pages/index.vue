<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl mb-4">Word search</h1>

    <form class="flex items-end gap-3 mb-3" @submit.prevent="searchItinerary">
      <AppInput
        id="word"
        v-model="word"
        :disabled="loading"
        label="Word"
        class="flex-1"
      />

      <AppButton type="submit" :disabled="loading">Search</AppButton>
    </form>

    <ul class="space-y-3">
      <li v-for="(item, i) of results" :key="i">
        <WordCard :word="item">
          <template #top>
            <AppButton
              :variant="isWordSaved(item) ? 'outline' : 'fill'"
              class="ml-auto"
              @click="toggleSaveWord(item)"
            >
              {{ isWordSaved(item) ? 'Saved' : 'Save' }}
            </AppButton>
          </template>
        </WordCard>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  name: 'IndexPage',

  data() {
    return {
      loading: false,
      word: '',
      results: [],
    }
  },

  methods: {
    ...mapActions({
      toggleSaveWord: 'toggleSaveWord',
    }),

    async searchItinerary() {
      try {
        this.loading = true
        const { data } = await this.$axios.get(`/${this.word}`)

        this.results = data
        //
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        //
      } finally {
        this.loading = false
      }
    },

    /** @param {import('../types').Word} word */
    isWordSaved(word) {
      return this.$store.getters.savedWordsIndex.has(JSON.stringify(word))
    },
  },
})
</script>
