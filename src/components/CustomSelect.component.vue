<template>
    <div 
        class="custom-field custom-select"
        :class="{'focused' : isFocused}"     
    >
        <input 
            readonly
            ref="input" 
            class="input--text" 
            :placeholder="placeholder"
            @click="onSelectInputClick"  
            @keydown="preventInput" 
            @change="emitEvents"
        /> 
        <i 
            class="custom-select__toggler-icon" 
            :class="{'opened': isFocused}"
        ></i>
        <div 
            class="custom-select__list" 
            :class="{'shown' : isFocused}"
        >
            <template v-for="item in items">
                <div 
                    class="custom-select__item" 
                    :key="item.id" 
                    @click="chooseItem(item)"
                >
                    {{ item.name }}
                </div>
            </template>
        </div>
        <span v-if="error" class="custom-field__error-message">123</span>
    </div>
</template>

<script>
import InputMixin from '@/mixins/input.js';

export default {
    name: 'CustomSelect',
    mixins: [InputMixin],
    props: {
        value: [String, Number],
        items: {
            type: Array,
            required: true,
            validator(value) {
                return value.length > 1
            }
        }
    },
    data() {
        return {
            selected: null
        }
    },
    created() {
        this.selected = this.items.find(item => item.value === this.value);
    },  
    mounted() {
        document.addEventListener('click', this.onSelectMissclick)
        this.$refs.input.value = this.selected.name;
    },  
    beforeDestroy() {
        document.removeEventListener('click', this.onSelectMissclick)
    },
    methods: {
        onSelectInputClick() {
            this.isFocused = true;
        },  
        chooseItem(itemData) {
            this.selectedItem = itemData;
            this.$refs.input.value = itemData.name;
            this.emitEvents();
            this.isFocused = false;
        },
        onSelectMissclick(e) {
            if (e.target !== this.$refs.input) {
                this.isFocused = false;
            }
        },
        emitEvents() {
            this.$emit('input', this.selectedItem.value)
            this.$emit('resetValidation')
        },
        preventInput(e) {
            e.preventDefault()
            return false;
        }
    }
}
</script>

<style lang="scss" scoped>
$toggler-icon: url("data:image/svg+xml,%3Csvg width='19' height='19' viewBox='0 0 19 19' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13 9L9.5 12L6 9' stroke='%23A7A7B6' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
        
.custom-select {
    position: relative;

    .input--text {
        &:focus {
            &::placeholder {
                opacity: 1;
            }
        }
    }

    &__toggler-icon {
        display: block;
        width: 19px;
        height: 19px;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        background-image: $toggler-icon;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: pxToRem(10);
        &.opened {
            transform: translateY(-50%) rotate(180deg);
        }
    }
    &__list {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        background-color: $grayscale-50;
        max-height: 300px;
        position: absolute;
        top: calc(100% + 10px);
        left: 0px;
        z-index: 100;
        display: none;
        &.shown {
            display: block;
        }
    }

    &__item {
        width: 100%;
        height: 40px;
        cursor: pointer;
        border-bottom: 1px solid $grayscale-300;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        padding-left: 1rem;
        &:hover {
            background-color: rgba(122, 151, 255, 0.15);
            color: $grayscale-900;
        }
    }
}
</style>