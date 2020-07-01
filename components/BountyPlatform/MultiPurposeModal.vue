<template>
  <div
    class="w-full max-h-full flex flex-col items-center shadow-4xl overflow-auto bg-c-background-sec rounded-xl border-2 border-c-text-10 px-6 pt-4 pb-8 md:px-24 md:pt-8 md:pb-16 whitespace-initial"
  >
    <img
      v-if="imgSrc"
      class="max-w-xxxxs md:max-w-xxxs h-auto relative"
      :src="imgSrc"
      alt="Illustration"
    />
    <div class="flex flex-row justify-center items-center mt-5">
      <div class="relative w-6 h-6 mr-2 mb-1">
        <spinner v-if="hasSpinner" type="primary" />
      </div>
      <h4 class="text-2xl font-bold text-c-primary">{{header}}</h4>
    </div>
    <p class="mt-1 leading-relaxed">{{paragraph}}</p>
  </div>
</template>
<script>
import Spinner from "~/components/Spinner.vue";
export default {
  components:{  
    Spinner
  },
    props: {
        header: null,
        paragraph: null,
        imgSrc: null,
        hasSpinner: Boolean
    }
}
</script>
<style>
.whitespace-initial {
  white-space: initial;
}
</style>