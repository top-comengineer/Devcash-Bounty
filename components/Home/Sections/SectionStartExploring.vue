<template>
  <div class="overflow-x-hidden">
    <div class="d-container pt-20 pb-32 md:pt-24 md:pb-40 lg:pb-48">
      <div class="w-full flex flex-row flex-wrap justify-center items-center">
        <!-- Start Exploring Card Container -->
        <div class="w-full md:w-4/5 lg:w-3/5 items-center relative px-4">
          <!-- Background Illustration Search -->
          <img
            class="w-64 md:w-64 lg:w-72 h-auto absolute left-0 bottom-0 -ml-24 -mb-24 md:-ml-32 md:-mb-24 lg:-ml-32 lg:-mb-32 opacity-15"
            :src="require('~/assets/images/illustrations/background/search.svg')"
            alt="Search Illustration"
          />
          <!-- Background Illustration Compass -->
          <img
            class="w-64 md:w-56 lg:w-64 h-auto absolute top-0 right-0 -mr-16 -mt-20 md:-mr-40 md:-mt-20 lg:-mr-36 lg:-mt-20 opacity-15"
            :src="require('~/assets/images/illustrations/background/compass.svg')"
            alt="Compass Illustration"
          />
          <!-- Start Exploring Card -->
          <div
            class="bg-c-background w-full flex flex-col items-center rounded-tl-4xl rounded-br-4xl rounded-tr-xl rounded-bl-xl border-2 border-c-primary px-2 md:px-4 py-10 relative"
          >
            <!-- Header Text -->
            <h2
              class="text-c-primary font-bold text-2xl md:text-3xl text-center leading-tight px-6 mt-2"
            >{{ $t("home.startExploringSection.header") }}</h2>
            <!-- Paragraph Text -->
            <div class="w-full flex flex-row justify-center px-4 mt-4 mb-2">
              <p class="text-lg text-center">{{ $t("home.startExploringSection.paragraph") }}</p>
            </div>
            <!-- Call to Action -->
            <div class="flex flex-row justify-center">
              <nuxt-link
                :to="localePath('bountyplatform')"
                class="btn-primary bg-c-primary text-c-light transform hover:scale-md focus:scale-md transition-all duration-200 ease-out origin-bottom-left font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-6 md:px-12 py-2 my-4"
              >{{ $t("home.startExploringSection.ctaButton") }}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>