<template>
  <div
    class="transition-all ease-out duration-200"
    v-bind:class="[
      $store.state.theme.dt
        ? 'bg-dtBackground text-dtText'
        : 'bg-ltBackground text-ltText'
    ]"
  >
    <div class="d-container relative">
      <Header />
    </div>
    <nuxt />
    <Footer />
  </div>
</template>
<script>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
export default {
  components: {
    Header,
    Footer
  }
};
</script>
<style>
body {
  font-family: "Manrope", sans-serif;
  font-weight: 400;
  background-color: #010014;
}
</style>
