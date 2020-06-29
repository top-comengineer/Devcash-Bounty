<template>
  <div
    class="w-full max-h-full flex flex-col items-center shadow-4xl overflow-auto bg-c-background-sec rounded-xl border-2 border-c-text-10 px-6 pt-4 pb-8 md:px-24 md:pt-8 md:pb-16"
  >
    <img v-if="imgSrc" class="max-w-xxxs h-auto relative" :src="imgSrc" alt="Post Bounty" />
    <h4 class="text-2xl font-bold text-c-primary mt-5">{{header}}</h4>
    <p class="mt-1 leading-relaxed">{{paragraph}}</p>
  </div>
</template>
<script>
export default {
    props: {
        header: null,
        paragraph: null,
        imgSrc: null
    }
}
</script>