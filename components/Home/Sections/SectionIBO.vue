<template>
  <div class="overflow-x-hidden" id="IBO">
    <div class="d-container relative z-10">
      <div
        class="w-full flex flex-row flex-wrap justify-center lg:justify-around items-center pt-16 pb-16 md:pt-24 md:pb-24 lg:pt-32 lg:pb-48"
      >
        <!-- Background Illustration Single D -->
        <img
          class="w-32 md:w-56 lg:w-64 h-auto absolute right-0 top-0 -mr-8 md:-mr-10 lg:-mr-32 opacity-15"
          :src="require('~/assets/images/illustrations/background/d-mark-single.svg')"
          alt="D Mark Single Illustration"
        />
        <!-- Background Illustration Cube -->
        <img
          class="w-48 md:w-64 lg:w-72 h-auto absolute bottom-0 left-0 -ml-16 md:-ml-10 lg:-ml-24 opacity-15"
          :src="require('~/assets/images/illustrations/background/cube.svg')"
          alt="Cube Illustration"
        />
        <div class="w-full md:w-4/5 lg:w-2/5 flex flex-col py-8 px-6 relative">
          <!-- Header Text -->
          <h2
            class="font-bold text-2xl md:text-3xl text-center lg:text-left leading-tight text-dtPrimary"
          >{{ $t("home.IBOSection.header") }}</h2>
          <!-- Paragraph Text -->
          <p class="text-lg text-center lg:text-left mt-2">{{ $t("home.IBOSection.paragraph") }}</p>
        </div>
        <!-- Illustration -->
        <img
          class="w-10/12 md:w-2/4 lg:w-1/3 order-first lg:order-last relative h-auto"
          :src="require('~/assets/images/illustrations/foreground/ibo.svg')"
          alt="IBO Illustration"
        />
      </div>
    </div>
  </div>
</template>
