<template>
  <div class="p-6 bg-white border border-gray-200 rounded-lg shadow">
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

    <ul v-if="word.meanings?.length">
      <li v-for="(meaning, idx) of word.meanings" :key="idx" class="mb-2">
        <span class="mb-3 text-gray-500">{{ meaning.partOfSpeech }}</span>

        <ul v-if="meaning.definitions?.length">
          <li
            v-for="(def, index) of meaning.definitions"
            :key="index"
            class="mb-2 text-sm"
          >
            {{ def.definition }}
          </li>
        </ul>
      </li>
    </ul>
    <p class=""></p>

    <a
      v-if="word.sourceUrls?.length"
      :href="word.sourceUrls[0]"
      target="_blank"
      class="inline-flex font-medium items-center text-blue-600 hover:underline"
    >
      See reference <SvgExternal />
    </a>
  </div>
</template>

<script>
export default {
  name: 'WordCard',

  props: {
    word: { type: Object, default: () => ({}) },
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
  methods: {
    toggleAudio() {
      this.$refs.audio.play()
    }
  }
}
</script>
