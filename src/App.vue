<template>
  <div id="app">
    <registration-form
    :default-values="{
      name: 'Vlad',
      isPublicProfile: true,
      selectedPost: '3'
    }"
    ></registration-form>
  </div>
</template>

<script>
import RegistrationForm from './components/RegistrationForm.component.vue';
export default {
  name: 'App',  
  components: {
    RegistrationForm
  },
}
</script>

