<template>
  <article class="p-6 bg-white border border-gray-200 rounded-lg shadow">
    <div class="flex gap-3 items-baseline">
      <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
        {{ word.word }}
      </h5>

      <sub v-if="phonetic">{{ phonetic.text }}</sub>

      <!-- <template v-if="phonetic.audio">
        <audio ref="audio" class="sr-only" :src="phonetic.audio">
          Your browser does not support <code>audio</code>.
        </audio>

        <AppButton size="tiny" @click="toggleAudio">play</AppButton>
      </template> -->

      <slot name="top" />
    </div>

    <ul
      v-if="word.meanings?.length"
      ref="definition"
      class="overflow-y-hidden relative"
      :class="
        hasMoreToShow && !showAll
          ? 'h-[65px] after:absolute after:bottom-0 after:h-full after:w-full after:bg-gradient-to-t after:from-white  after:to-15%'
          : null
      "
    >
      <li v-for="(meaning, idx) of word.meanings" :key="idx" class="mb-2">
        <span class="mb-3 text-gray-500">{{ meaning.partOfSpeech }}</span>

        <p v-if="meaning.definitions?.length">
          <span
            v-for="(def, index) of meaning.definitions"
            :key="index"
            class="mb-2 text-sm"
          >
            {{ def.definition }}
            <i
              v-if="meaning.definitions.length - 1 !== index"
              class="italic text-slate-400"
              >|</i
            >
          </span>
        </p>
      </li>
    </ul>

    <div class="flex justify-between items-end">
      <a
        v-if="word.sourceUrls?.length"
        :href="word.sourceUrls[0]"
        target="_blank"
        class="inline-flex font-medium items-center text-blue-600 hover:underline"
      >
        See reference <SvgExternal />
      </a>

      <button
        v-if="hasMoreToShow"
        class="inline-flex font-medium items-center text-blue-600 hover:underline"
        @click="showAll = !showAll"
      >
        {{ showAll ? 'see less' : 'see more' }}
      </button>
    </div>
  </article>
</template>

<script>
export default {
  name: 'WordCard',

  props: {
    word: { type: Object, default: () => ({}) },
  },

  data() {
    return {
      showAll: false,
      hasMoreToShow: false,
    }
  },

  computed: {
    phonetic() {
      if (!this.word.phonetics?.length) return this.word.phonetic || ''

      const wordWithAudio = this.word.phonetics?.find(
        (phon) => phon.audio && phon.text
      )

      if (wordWithAudio) return wordWithAudio

      return this.word.phonetics.find((phon) => phon.text) || ''
    },
  },

  mounted() {
    this.checkDefinitionHeight()
  },

  methods: {
    // toggleAudio() {
    //   this.$refs.audio.play()
    // },

    checkDefinitionHeight() {
      this.hasMoreToShow = this.$refs.definition.scrollHeight > 70
    },
  },
}
</script>
