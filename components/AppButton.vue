<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[variantClasses, sizeClasses]"
    class="focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium w-auto text-center disabled:opacity-50 border-2"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script>
const typeValidator = (val) => ['button', 'submit'].includes(val)
const sizeValidator = (val) => ['regular', 'tiny'].includes(val)
const variantValidator = (val) => ['fill', 'outline'].includes(val)
const colorValidator = (val) => ['default', 'danger'].includes(val)

export default {
  name: 'AppButton',

  props: {
    type: { type: String, default: 'button', validator: typeValidator },
    size: { type: String, default: 'regular', validator: sizeValidator },
    variant: { type: String, default: 'fill', validator: variantValidator },
    color: { type: String, default: 'default', validator: colorValidator },
    disabled: { type: Boolean, default: false },
  },

  computed: {
    buttonColors() {
      const colorsMap = new Map([
        [
          'default',
          {
            fill: 'bg-indigo-700 hover:bg-indigo-800',
            outline: 'text-indigo-500',
          },
        ],
        [
          'danger',
          {
            fill: 'bg-red-700 hover:bg-red-800',
            outline: 'text-red-500',
          },
        ],
      ])

      return colorsMap.get(this.color) || {}
    },

    sizeClasses() {
      if (this.size === 'tiny') return 'rounded-sm text-xs px-3 py-1'

      return 'rounded-lg text-sm px-5 py-2.5'
    },

    variantClasses() {
      if (this.variant === 'outline')
        return [
          'bg-transparent hover:bg-gray-100 border-current',
          this.buttonColors.outline,
        ].filter(Boolean)

      return ['text-white border-transparent', this.buttonColors.fill].filter(
        Boolean
      )
    },
  },
}
</script>
