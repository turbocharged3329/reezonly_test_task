<template>
    <div 
        class="custom-field custom-input" 
        :class="{'focused' : isFocused}" 
        ref="input-box"
    >
        <input 
            class="input--text" 
            :placeholder="placeholder"
            :type="type"
            :value="value"
            @input="emitEvents"
            @focus="onInputChangeFocus" 
            @blur="onInputChangeFocus"
        />
        <span v-if="error" class="custom-field__error-message">123</span>
    </div>
</template>

<script>
import InputMixin from '@/mixins/input.js';
export default {
    name: 'CustomInput',
    mixins: [InputMixin],
    props: {
        value: String,
        type: {
            type: String,
            required: true, 
            validator: (value) => {
                return value === 'text' || value === 'password'
            }
        },
    },
    methods: {
        emitEvents(e) {
            this.$emit('input', e.target.value)
            this.$emit('resetValidation')
        }
    }
}
</script>

<style lang="scss"></style>