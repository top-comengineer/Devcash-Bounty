<template>
  <div class="overflow-x-hidden" id="DEX">
    <div class="d-container pt-12 pb-12 md:pt-20 md:pb-14 lg:pt-32 lg:pb-36">
      <div class="w-full flex flex-row flex-wrap justify-center items-center">
        <div class="w-11/12 md:w-3/4 flex flex-col items-center">
          <div class="w-full relative">
            <!-- Background Illustration Left Window -->
            <img
              class="w-64 md:w-56 lg:w-64 h-auto absolute top-0 md:bottom-0 left-0 -mt-8 -ml-48 md:-ml-48 md:-mb-24 lg:-ml-36 lg:-mb-20 opacity-15"
              :src="require('~/assets/images/illustrations/background/window-left.svg')"
              alt="Window Left Illustration"
            />
            <!-- Background Illustration Right Window -->
            <img
              class="w-64 md:w-56 lg:w-64 h-auto absolute top-0 right-0 -mr-48 -mt-8 md:-mr-48 md:-mt-12 lg:-mr-36 lg:-mt-8 opacity-15"
              :src="require('~/assets/images/illustrations/background/window-right.svg')"
              alt="Window Right Illustration"
            />
            <!-- DEX Illustration -->
            <img
              class="w-full h-auto relative"
              :src="require('~/assets/images/illustrations/foreground/dex.svg')"
              alt="DEX Illustration"
            />
          </div>
          <!-- Header Text -->
          <h2
            class="font-bold text-2xl md:text-3xl text-center leading-tight text-c-primary px-6 mt-6 md:mt-8 relative"
          >{{ $t("home.dexSection.header") }}</h2>
          <!-- Paragraph Text -->
          <div
            class="w-full md:w-2/3 xl:w-7/12 flex flex-row justify-center px-4 mt-4 mb-2 relative"
          >
            <p class="text-lg text-center">{{ $t("home.dexSection.paragraph") }}</p>
          </div>
          <!-- Call to Action -->
          <div class="flex flex-row justify-center relative">
            <button
              disabled
              class="cursor-auto opacity-50 bg-c-primary text-c-light font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-12 py-2 my-4"
            >{{ $t("home.dexSection.buttonComingSoon") }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
