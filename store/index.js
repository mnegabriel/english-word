export const state = () => ({
  savedWords: []
})

export const getters = {
  getSavedWordsIndex(state) {
    return new Set(state.savedWords.map(({ word }) => word))
  }
}

export const mutations = {
  setWords(state, words) {
    state.savedWords = words
  },

  addWord(state, word) {
    state.savedWords = [
      ...state.savedWords,
      word
    ]
  },

  removeWord(state, word) {
    state.savedWords = state.savedWords.filter(w => w.word !== word.word)
  }
}
