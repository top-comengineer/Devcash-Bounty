<template>
  <div class="bg-dtBg text-dtText">
    <div class="d-container">
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
}
</style>
