<template>
  <div>
    <div class="w-full flex flex-row justify-center items-center py-72">
      <h1 class="font-extrabold text-3xl text-center">Bounty Platform</h1>
    </div>
  </div>
</template>

<script>
import SectionStartExploring from "~/components/Home/Sections/SectionStartExploring.vue";
import { DevcashBounty } from "~/plugins/devcash/devcashBounty";
export default {
  components: {
    SectionStartExploring
  },
  mounted: function() {
    /*
    DevcashBounty.init().then((result) => {

    });*/
  }
};
</script>