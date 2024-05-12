<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block mb-2 text-sm font-medium text-gray-900"
    >
      {{ label }}
    </label>

    <input
      :id="id"
      :value="value"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      type="text"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-50"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'AppInput',

  props: {
    value: { type: String, default: '' },
    id: { type: String, required: true },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
}
</script>
