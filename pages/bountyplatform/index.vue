<template>
  <div>
    <div class="w-full flex flex-row justify-center items-center py-72">
      <h1 class="font-extrabold text-3xl text-center">Bounty Platform</h1>
    </div>
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
  }
};
</script>