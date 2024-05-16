<template>
  <div class="saved-page container mx-auto px-4 pb-8">
    <div class="flex gap-3">
      <nav>
        <ul class="sticky top-0 pt-8 h-[calc(100lvh-2rem)] flex flex-col gap-3 overflow-y-scroll pr-3">
          <li v-for="letter of initials" :key="letter">
            <a
              :href="`#initial-${letter}`"
              class="text-indigo-800 uppercase font-bold rounded-full w-6 aspect-square inline-flex justify-center items-center hover:bg-slate-200"
              >{{ letter }}</a
            >
          </li>
        </ul>
      </nav>

      <ul class="space-y-5 min-w-0">
        <li v-for="section of sectionedWordsByInitial" :key="section.initial">
          <h2
            :id="`initial-${section.initial}`"
            ref="heading"
            class="pt-8 text-2xl text-indigo-800 border-b-2 border-b-current pb-2 px-2 mb-5 uppercase font-bold"
          >
            {{ section.initial }}
          </h2>

          <ul class="space-y-3">
            <li v-for="(word, i) of section.items" :key="i">
              <WordCard :word="word">
                <template #top>
                  <AppButton
                    class="ml-auto"
                    :color="isWordSaved(word) ? 'danger' : 'default'"
                    @click="toggleSaveWord(word)"
                  >
                    {{ isWordSaved(word) ? 'Remove' : 'Save' }}
                  </AppButton>
                </template>
              </WordCard>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SavedPage',

  data() {
    return {
      savedWords: [],
    }
  },

  computed: {
    initials() {
      return [...new Set(this.savedWords.map(({ word }) => word[0]))]
    },

    sectionedWordsByInitial() {
      return this.initials.map((i) => ({
        initial: i,
        items: this.savedWords.filter(({ word }) => word[0] === i),
      }))
    },
  },

  mounted() {
    this.getSavedWordsLocally()
  },

  methods: {
    ...mapActions({
      toggleSaveWord: 'toggleSaveWord',
    }),

    getSavedWordsLocally() {
      this.savedWords = JSON.parse(JSON.stringify(this.$store.state.savedWords))
    },

    /** @param {import('../types').Word} word */
    isWordSaved(word) {
      return this.$store.getters.savedWordsIndex.has(JSON.stringify(word))
    },
  },
}
</script>
