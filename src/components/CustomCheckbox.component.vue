<template>
    <div class="custom-checkbox">
        <div class="custom-checkbox__wrapper">
            <input 
                class="custom-checkbox__input" 
                ref="input"
                type="checkbox"
                :value="value"
                :id="id" 
            >
            <label 
                class="custom-checkbox__checkmark" 
                :class="{'checked': isActive}" 
                @click="onChangeActivity"
            ></label>
        </div>
        <span v-if="label" class="custom-checkbox__label">{{ label }}</span>
    </div>
</template>

<script>
import CheckboxMixin from '@/mixins/checkbox.js';
export default {
    name: 'CustomCheckbox',
    mixins: [CheckboxMixin],
}
</script>

<style lang="scss">
$checkmark: url("data:image/svg+xml,%3Csvg width='11' height='7' viewBox='0 0 11 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3.5L4.00084 6L10 1' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
.custom-checkbox {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    &__wrapper {
        
    }
    &__input {
        display: none;
    }
    &__checkmark {
        display: block;
        width: 20px;
        height: 20px;
        cursor: pointer;
        background-position: center;
        background-repeat: no-repeat;
        background-size: auto;
        background-color: rgba(122, 151, 255, 0.15);
        border-radius: 5px;
        &.checked {
            background-color: $yellow-500;
            background-image: $checkmark;
        }
    }
    &__label {
        
    }
}
</style>