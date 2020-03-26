<template>
  <div class="bg-dtBackground text-dtText">
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
