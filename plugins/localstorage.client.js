const KEY = 'english-word-saved-words'

/** @param {{store: import("vuex").Store}} param0 */
export default ({ store }) => {
  const storageData = localStorage.getItem(KEY)

  store.commit("setWords", storageData ? JSON.parse(storageData) : [])

  store.subscribe((mutation) => {
    if (!["addWord", "removeWord"].includes(mutation.type)) return

    localStorage.setItem(KEY, JSON.stringify(store.state.savedWords))
  })
}
