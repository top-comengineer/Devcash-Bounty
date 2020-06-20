<template>
  <div class="pt-8 pb-12 lg:pt-32 lg:pb-16">
    <!-- Header Part -->
    <div class="w-full flex flex-col items-center">
      <div class="w-full flex flex-row justify-center items-center mt-6">
        <!-- Line Left -->
        <div class="flex-1 h-px2 bg-c-primary rounded-br-full"></div>
        <!-- Header Text -->
        <h2
          class="font-bold text-2xl md:text-3xl text-center leading-tight text-c-primary px-6"
        >{{ $t("home.tokenDetailsSection.header") }}</h2>
        <!-- Line Left -->
        <div class="flex-1 h-px2 bg-c-primary rounded-bl-full"></div>
      </div>
    </div>
    <!-- Illustrations -->
    <div class="d-container pt-4 pb-8">
      <div class="w-full flex flex-row justify-center">
        <div class="w-full flex flex-row flex-wrap justify-center">
          <!-- Token Supply -->
          <div class="w-7/12 md:w-1/3 lg:w-1/4 flex flex-col p-4">
            <div class="w-full flex flex-row justify-center">
              <img
                class="w-full h-auto"
                :src="require('~/assets/images/illustrations/foreground/token-supply.svg')"
                alt="Token Supply Illustration"
              />
            </div>
            <p class="text-base text-center">{{ $t("home.tokenDetailsSection.tokenSupplyHeader") }}</p>
            <h3
              class="font-extrabold text-2xl md:text-3xl text-center leading-tight text-c-primary px-6 mt-2"
            >{{ $t("home.tokenDetailsSection.tokenSupplyText") }}</h3>
          </div>
          <!-- Token Type -->
          <div class="w-7/12 md:w-1/3 lg:w-1/4 flex flex-col p-4">
            <div class="w-full flex flex-row justify-center">
              <img
                class="w-full h-auto"
                :src="require('~/assets/images/illustrations/foreground/token-type.svg')"
                alt="Token Type Illustration"
              />
            </div>
            <p class="text-base text-center">{{ $t("home.tokenDetailsSection.tokenTypeHeader") }}</p>
            <h3
              class="font-extrabold text-2xl md:text-3xl text-center leading-tight text-c-primary px-6 mt-2"
            >{{ $t("home.tokenDetailsSection.tokenTypeText") }}</h3>
          </div>
          <!-- Token Allocation -->
          <div class="w-7/12 md:w-1/3 lg:w-1/4 flex flex-col p-4">
            <div class="w-full flex flex-row justify-center">
              <img
                class="w-full h-auto"
                :src="require('~/assets/images/illustrations/foreground/token-allocation.svg')"
                alt="Token Allocation Illustration"
              />
            </div>
            <p
              class="text-base text-center"
            >{{ $t("home.tokenDetailsSection.tokenAllocationHeader") }}</p>
            <h3
              class="font-extrabold text-2xl md:text-3xl text-center leading-tight text-c-primary px-6 mt-2"
            >{{ $t("home.tokenDetailsSection.tokenAllocationText") }}</h3>
          </div>
        </div>
      </div>
    </div>
    <!-- Bottom Divider -->
    <div class="w-full h-px2 bg-c-primary"></div>
  </div>
</template>
