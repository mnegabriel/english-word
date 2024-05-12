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

    <ul>
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
    async searchItinerary() {
      try {
        this.loading = true
        const { data } = await this.$axios.get(`/${this.word}`)

        this.results = data
        //
      } catch (error) {
        console.error(error)
        //
      } finally {
        this.loading = false
      }
    },

    /** @param {import('../types').Word} word */
    toggleSaveWord(word) {
      this.isWordSaved(word)
        ? this.$store.commit('removeWord', word)
        : this.$store.commit('addWord', word)
    },

    /** @param {import('../types').Word} word */
    isWordSaved(word) {
      return this.$store.getters.getSavedWordsIndex.has(word.word)
    },
  },
})
</script>
