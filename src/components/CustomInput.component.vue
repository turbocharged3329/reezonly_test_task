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
            @input="emitValue"
            @focus="onInputChangeFocus" 
            @blur="onInputChangeFocus"
            />
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
        emitValue(e) {
            this.$emit('input', e.target.value)
        }
    }
}
</script>

<style lang="scss">
.custom-input {
    
}
</style>