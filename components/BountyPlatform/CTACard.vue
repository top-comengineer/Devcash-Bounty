<template>
  <div
    class="w-full flex flex-row relative shadow-lg overflow-hidden flex-wrap justify-center items-center bg-c-secondary py-6 md:py-10 px-6 md:px-8 rounded-br-3xl rounded-bl-lg"
  >
    <!-- Left Background Illustration -->
    <img
      class="hidden md:block h-full w-auto absolute left-0"
      :src="require('~/assets/images/illustrations/background/arrows-left.svg')"
      alt="Arrows Left Illustration"
    />
    <!-- Header and Paragraph -->
    <button
      :disabled="disabled"
      @click="buttonAction"
      class="btn-text-sec bg-c-light text-c-secondary max-w-full transform hover:scale-md focus:scale-md origin-bottom-left transition-all duration-200 ease-out font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-12 py-2"
    >{{ buttonText!=null?buttonText:"Button" }}</button>
    <!-- Right Background Illustration -->
    <img
      class="h-full w-auto absolute right-0"
      :src="require('~/assets/images/illustrations/background/arrows-right.svg')"
      alt="Arrows Right Illustration"
    />
  </div>
</template>
<script>
export default {
  props: {
    buttonText: String,
    buttonAction: Function,
    disabled: Boolean
  }
};
</script>