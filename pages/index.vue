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
import SectionHero from "~/components/Home/Sections/SectionHero.vue";
import SectionWhatIs from "~/components/Home/Sections/SectionWhatIs.vue";
import SectionIBO from "~/components/Home/Sections/SectionIBO.vue";
import SectionBountyPlatform from "~/components/Home/Sections/SectionBountyPlatform.vue";
import SectionDEX from "~/components/Home/Sections/SectionDEX.vue";
import SectionTokenDetails from "~/components/Home/Sections/SectionTokenDetails.vue";
import SectionStartExploring from "~/components/Home/Sections/SectionStartExploring.vue";
export default {
  components: {
    SectionHero,
    SectionWhatIs,
    SectionIBO,
    SectionBountyPlatform,
    SectionDEX,
    SectionTokenDetails,
    SectionStartExploring
  }
};
</script>
