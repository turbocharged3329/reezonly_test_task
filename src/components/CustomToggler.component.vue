<template>
    <div class="custom-toggler">
        <div class="custom-toggler__wrapper">
            <input 
                ref="input" 
                type="checkbox" 
                :value="value"
                :id="id"
            >
            <div 
                class="custom-toggler__box" 
                :class="{'active': isActive}" 
                @click="onChangeActivity"
            >
                <div class="custom-toggler__element"></div>
            </div>
            <label :for="id" class="custom-toggler__label">{{ label }}</label>
        </div>
        <span v-if="description" class="custom-toggler__description">{{ description }}</span>
    </div>
</template>

<script>
import CheckboxMixin from '@/mixins/checkbox.js'
export default {
    name: 'CustomToggler',
    mixins: [CheckboxMixin],
    props: {
        description: {
            type: String,
            default: '',
        }
    },
}
</script>

<style lang="scss" scoped>
.custom-toggler {
    input {
        display: none;
    }
    &__wrapper {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: pxToRem(15);
    }
    &__box {
        width: 39px;
        height: 19px;
        background-color:rgba(122, 151, 255, 0.15);
        border-radius: 20px;
        position: relative;
        cursor: pointer;
        &.active {
            background-color: $purple-400;
            border-color: $purple-400;
            .custom-toggler__element {
                left: unset;
                transform: translateX(105%);
            }
        }
    }
    &__element {
        border-radius: 50%;
        box-sizing: border-box;
        width: 19px;
        height: 19px;
        border: 1px solid rgba(122, 151, 255, 0.15); 
        background-color: white;
        z-index: 5;
        position: absolute;
        left: 0;
        top: 0;
        transform: translateX(-5%);
        transition: transform .2s ease-in-out ;
    }
    &__label {
        width: 100%;
        height: fit-content;
        color: $grayscale-900;
        font-size: pxToRem(16);
        font-weight: 500;
        line-height: 118.75%; 
        margin-left: pxToRem(15);
        white-space: break-spaces;
    }
    &__description {
        color: $grayscale-700;
        font-size: pxToRem(14);
        font-weight: 400;
        line-height: 135%;
        letter-spacing: -0.021px;
    }
}
</style>