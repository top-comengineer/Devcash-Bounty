<template>
  <div class="overflow-x-hidden">
    <div class="d-container">
      <div
        class="w-full flex flex-row flex-wrap justify-center items-center pt-8 pb-12 lg:pt-12 md:pb-24"
      >
        <div class="w-full flex flex-col items-center">
          <!-- Header Text -->
          <h2
            class="text-c-primary font-bold text-2xl md:text-3xl text-center leading-tight px-6"
          >{{ $t("home.bountyPlatformSection.header") }}</h2>
          <!-- Paragraph Text -->
          <div class="w-full md:w-2/3 xl:w-7/12 flex flex-row justify-center px-4 mt-4 mb-2">
            <p class="text-lg text-center">{{ $t("home.bountyPlatformSection.paragraph") }}</p>
          </div>
        </div>
        <!-- Cards -->
        <div class="w-full flex flex-row flex-wrap justify-center">
          <!-- Indicator -->
          <div class="w-full hidden md:flex flex-col items-center mt-2 px-6">
            <img
              class="md:w-1/2 lg:w-2/5"
              :src="require('~/assets/images/illustrations/foreground/indicator.svg')"
              alt="Indicator Illustration"
            />
          </div>
          <!-- Post Bounties Card Container -->
          <div class="w-full md:w-1/2 lg:w-2/5 px-4 py-2 md:pl-6 md:pr-3 mt-3 relative">
            <!-- Background Illustration Brackets -->
            <img
              class="hidden md:block md:w-64 lg:w-72 h-auto absolute left-0 bottom-0 md:-ml-24 lg:-ml-32 md:-mb-20 lg:-mb-20 opacity-15"
              :src="require('~/assets/images/illustrations/background/brackets.svg')"
              alt="Brackets Illustration"
            />
            <!-- Post Bounties Card -->
            <div
              class="bg-c-background w-full flex flex-col items-center rounded-tl-4xl rounded-br-4xl rounded-tr-xl rounded-bl-xl border-2 border-c-primary px-4 py-6 relative"
            >
              <!-- Post Bounties Header -->
              <h3
                class="text-c-primary font-bold text-xl md:text-2xl text-center leading-tight px-6"
              >{{ $t("home.bountyPlatformSection.postBountyHeader") }}</h3>
              <!-- Post Bounties Paragraph -->
              <p
                class="text-lg text-center mt-2 px-4"
              >{{ $t("home.bountyPlatformSection.postBountyParagraph") }}</p>
              <!-- Post Bounties Illustration -->
              <img
                class="w-3/4 h-auto mt-8 mb-5"
                :src="require('~/assets/images/illustrations/foreground/post-bounties.svg')"
                alt="Post Bounties Illustration"
              />
              <!-- Post Bounties Call to Action -->
              <div class="flex flex-row justify-center">
                <nuxt-link
                  :to="localePath('bountyplatform-post')"
                  class="btn-primary bg-c-primary text-c-light transform hover:scale-md focus:scale-md transition-all duration-200 ease-out origin-bottom-left font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-12 py-2 my-4"
                >{{ $t("home.bountyPlatformSection.postBountyButton") }}</nuxt-link>
              </div>
            </div>
          </div>
          <!-- Hunt Bounties Card Container -->
          <div class="w-full md:w-1/2 lg:w-2/5 px-4 py-2 md:pr-6 md:pl-3 mt-3 relative">
            <!-- Background Illustration Code -->
            <img
              class="hidden md:block md:w-56 lg:w-64 h-auto absolute top-0 right-0 md:-mr-32 lg:-mr-40 md:-mt-24 lg:-mt-36 opacity-15"
              :src="require('~/assets/images/illustrations/background/code.svg')"
              alt="Code Illustration"
            />
            <!-- Hunt Bounties Card -->
            <div
              class="bg-c-background w-full flex flex-col items-center rounded-tl-4xl rounded-br-4xl rounded-tr-xl rounded-bl-xl border-2 border-c-primary px-4 py-6 relative"
            >
              <!-- Hunt Bounties Header -->
              <h3
                class="text-c-primary font-bold text-xl md:text-2xl text-center leading-tight px-6"
              >{{ $t("home.bountyPlatformSection.huntBountyHeader") }}</h3>
              <!-- Hunt Bounties Paragraph -->
              <p
                class="text-lg text-center mt-2 px-4"
              >{{ $t("home.bountyPlatformSection.huntBountyParagraph") }}</p>
              <!-- Hunt Bounties Illustration -->
              <img
                class="w-3/4 h-auto mt-8 mb-5"
                :src="require('~/assets/images/illustrations/foreground/hunt-bounties.svg')"
                alt="Hunt Bounties Illustration"
              />
              <!-- Hunt Bounties Call to Action -->
              <div class="flex flex-row justify-center">
                <nuxt-link
                  :to="localePath('bountyplatform')"
                  class="btn-primary bg-c-primary text-c-light transform hover:scale-md focus:scale-md transition-all duration-200 ease-out origin-bottom-left font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-12 py-2 my-4"
                >{{ $t("home.bountyPlatformSection.huntBountyButton") }}</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
