/**
 * @typedef {object} License
 * @prop {string} name
 * @prop {string} url
 */

/**
 * @typedef {object} Phonetic
 * @prop {string} [text]
 * @prop {string} [audio]
 * @prop {string} [sourceUrl]
 * @prop {License} [license]
 */

/**
 * @typedef {object} Definition
 * @prop {string} definition
 * @prop {string[]} synonyms
 * @prop {string[]} antonyms
 * @prop {string} [example]
 */

/**
 * @typedef {object} Meaning
 * @prop {string} partOfSpeech
 * @prop {string} definitions
 * @prop {string[]} synonyms
 * @prop {string[]} antonyms
 */

/**
 * @typedef {object} Word
 * @prop {string} word
 * @prop {string} phonetic
 * @prop {Phonetic[]} phonetics
 * @prop {Meaning[]} meanings
 * @prop {License} license
 * @prop {string[]} sourceUrls
 */

export default {}
