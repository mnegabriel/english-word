<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[variantClasses, sizeClasses]"
    class="focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium w-auto text-center disabled:opacity-50 border-2"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script>
const typeValidator = (val) => ['button', 'submit'].includes(val)
const sizeValidator = (val) => ['regular', 'tiny'].includes(val)
const variantValidator = (val) => ['fill', 'outline'].includes(val)

export default {
  name: 'AppButton',

  props: {
    type: { type: String, default: 'button', validator: typeValidator },
    size: { type: String, default: 'regular', validator: sizeValidator },
    variant: { type: String, default: 'fill', validator: variantValidator },
    disabled: { type: Boolean, default: false },
  },

  computed: {
    sizeClasses() {
      if (this.size === 'tiny') return 'rounded-sm text-xs px-3 py-1'

      return 'rounded-lg text-sm px-5 py-2.5'
    },

    variantClasses() {
      if (this.variant === 'outline')
        return 'text-blue-500 bg-white hover:bg-gray-100 border-current'

      return 'text-white bg-blue-700 hover:bg-blue-800 border-transparent'
    },
  },
}
</script>
