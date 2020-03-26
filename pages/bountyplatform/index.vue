<template>
  <div>
    <SectionHero />
    <SectionWhatIs />
    <SectionIBO />
    <SectionBountyPlatform />
    <SectionDEX />
    <SectionTokenDetails />
    <SectionStartExploring />
  </div>
</template>

<script>
import SectionHero from "~/components/Sections/SectionHero.vue";
import SectionWhatIs from "~/components/Sections/SectionWhatIs.vue";
import SectionTokenDetails from "~/components/Sections/SectionTokenDetails.vue";
import SectionStartExploring from "~/components/Sections/SectionStartExploring.vue";
export default {
  components: {
    SectionHero,
    SectionWhatIs,
    SectionTokenDetails,
    SectionStartExploring
  },
  head() {
    return {
      // Make this dynamic later
      htmlAttrs: {
        lang: "en"
      }
    };
  }
};
</script>