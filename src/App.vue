<template>
  <div id="app">
    <registration-form
      :default-values="{
        name: 'Vlad',
        isPublicProfile: true,
        selectedPost: '3'
      }"
      @success="showSuccessMessage"
      v-if="!successResponse"
    ></registration-form>
    <p v-else class="success-msg">Форма успешно отправлена !</p>
  </div>
</template>

<script>
import RegistrationForm from './components/RegistrationForm.component.vue';
export default {
  name: 'App',  
  components: {
    RegistrationForm
  },
  data() {
    return {
      successResponse: false,
    }
  },
  methods: {
    showSuccessMessage() {
      this.successResponse = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.success-msg {
  color: white;
  font-size: 3rem;
}
</style>

