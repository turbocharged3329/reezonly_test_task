<template>
    <section class="submit-section">
        <custom-checkbox ></custom-checkbox>
        <button 
            class="submit-section__button" 
            type="button"
        >Регистрация</button>
    </section>
</template>

<script>
import CustomCheckbox from '@/components/CustomCheckbox.component.vue';
export default {
    name: 'SubmitSection',
    components: {
        CustomCheckbox
    }
}
</script>

<style lang="scss">

</style>