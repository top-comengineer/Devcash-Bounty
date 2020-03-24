<template>
  <div
    class="w-full flex flex-row justify-between items-center px-4 py-4 md:px-8 md:py-6"
  >
    <Logo />
    <div class="flex flex-row">
      <div class="ml-6">Home</div>
      <div class="ml-6">Bounty Platform</div>
      <div class="ml-6">DEX</div>
      <div class="ml-6">English</div>
      <div class="ml-6">Sign In</div>
    </div>
  </div>
</template>
<script>
import Logo from "~/components/Logo.vue";
export default {
  components: {
    Logo
  }
};
</script>
