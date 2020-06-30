<template>
  <div
    class="h-sidebar bg-c-background-sec shadow-lg w-full flex flex-col flex-wrap items-center justify-center rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg py-6 px-4 md:px-8 md:py-8 mb-2"
  >
    <div class="max-w-full md:max-w-md flex flex-col items-center justify-center">
      <SignInCard class="md:mb-8" />
    </div>
  </div>
</template>
<script>
import SignInCard from "~/components/BountyPlatform/SignInCard.vue";
export default {
    components: {
        SignInCard
    }
}
</script>