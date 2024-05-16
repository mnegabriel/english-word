export const state = () => ({
  savedWords: []
})

export const getters = {
  savedWordsIndex(state) {
    return new Set(state.savedWords.map((word) => JSON.stringify(word)))
  }
}

export const mutations = {
  setWords(state, words) {
    state.savedWords = words
  },

  addWord(state, word) {
    const temp = [
      ...state.savedWords,
      word
    ]

    temp.sort((a, b) => {
      return a.word.localeCompare(b.word)
    })

    state.savedWords = temp
  },

  removeWord(state, word) {
    const removingIndex = state.savedWords.findIndex(w => JSON.stringify(w) === JSON.stringify(word))
    if (removingIndex < 0) return

    state.savedWords = state.savedWords.filter((_, index) => index !== removingIndex)
  }
}

export const actions = {
  toggleSaveWord({ getters, commit }, word) {
    getters.savedWordsIndex.has(JSON.stringify(word))
      ? commit("removeWord", word)
      : commit("addWord", word)
  },
}
