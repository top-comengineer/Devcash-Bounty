<template>
  <div>
    <SectionHero />
    <SectionWhatIs />
    <SectionIBO />
  </div>
</template>

<script>
import SectionHero from "~/components/Sections/SectionHero.vue";
import SectionWhatIs from "~/components/Sections/SectionWhatIs.vue";
import SectionIBO from "~/components/Sections/SectionIBO.vue";
export default {
  components: {
    SectionHero,
    SectionWhatIs,
    SectionIBO
  }
};
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 61vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
