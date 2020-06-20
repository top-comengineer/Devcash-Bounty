<template>
  <div class="w-full flex flex-row flex-wrap justify-center items-center pt-4 pb-8 md:py-12">
    <div class="w-full flex flex-col items-center">
      <!-- Illustration -->
      <img
        class="w-64 h-auto"
        :src="require('~/assets/images/illustrations/foreground/d-mark.svg')"
        alt="D Mark Illustration"
      />
      <!-- Header -->
      <div class="w-full flex flex-row justify-center items-center mt-6">
        <!-- Line Left -->
        <div class="flex-1 h-px2 bg-c-primary rounded-br-full"></div>
        <!-- Header Text -->
        <h2
          class="font-bold text-2xl md:text-3xl text-center leading-tight text-c-primary px-6"
        >{{ $t("home.whatIsSection.header") }}</h2>
        <!-- Line Right -->
        <div class="flex-1 h-px2 bg-c-primary rounded-bl-full"></div>
      </div>
      <!-- Paragraph -->
      <div class="d-container flex flex-row justify-center">
        <div class="w-full md:w-3/4 xl:w-7/12 flex flex-row justify-center px-4 pt-4 pb-8">
          <p class="text-lg text-center">{{ $t("home.whatIsSection.paragraph") }}</p>
        </div>
      </div>
      <!-- Bottom Divider -->
      <div class="w-full h-px2 bg-c-primary"></div>
    </div>
  </div>
</template>
