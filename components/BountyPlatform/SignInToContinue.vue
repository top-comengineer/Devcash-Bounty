<template>
  <div
    class="w-full flex flex-col justify-center items-center bg-c-background-sec border-2 border-c-text-05 shadow-2xl rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg px-4 py-4 md:px-12 md:py-8"
  >
    <h4
      class="text-c-primary text-2xl text-center font-bold"
    >{{ $t("bountyPlatform.signInToContinue.header") }}</h4>
    <p class="text-c-text text-center mt-2">{{ $t("bountyPlatform.signInToContinue.paragraph") }}</p>
    <div class="w-full max-w-xxs flex flex-col mt-6">
      <!-- MetaMask Button -->
      <button
        class="w-full btn-text-qua flex flex-row items-center bg-c-metamask border-2 border-c-metamask transform hover:scale-md focus:scale-md duration-200 ease-out origin-bottom-left rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md transition-all duration-200 ease-out overflow-hidden my-1_5"
      >
        <div class="bg-c-background-ter h-12 w-12 p-2">
          <img
            class="w-full h-full"
            :src="require('~/assets/images/wallet-logos/MetaMask.svg')"
            alt="MetaMask"
          />
        </div>
        <div class="flex flex-row flex-1 justify-center">
          <h4
            class="whitespace-no-wrap text-c-dark text-lg font-extrabold ml-8 mr-10"
          >{{ true ? $t("wallet.metamask") : $t("wallet.getMetamask") }}</h4>
        </div>
      </button>
      <!-- Portis Button -->
      <button
        class="w-full btn-text-qua flex flex-row items-center bg-c-portis border-2 border-c-portis transform hover:scale-md focus:scale-md duration-200 ease-out origin-bottom-left rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md transition-all duration-200 ease-out overflow-hidden my-1_5"
      >
        <div class="bg-c-background-ter h-12 w-12 p-2">
          <img
            class="w-full h-full"
            :src="require('~/assets/images/wallet-logos/Portis.svg')"
            alt="Portis"
          />
        </div>
        <div class="flex flex-row flex-1 justify-center">
          <h4
            class="whitespace-no-wrap text-c-dark text-lg font-extrabold ml-8 mr-10"
          >{{ $t("wallet.portis") }}</h4>
        </div>
      </button>
      <!-- Authereum Button -->
      <button
        class="w-full btn-text-qua flex flex-row items-center bg-c-authereum border-2 border-c-authereum transform hover:scale-md focus:scale-md duration-200 ease-out origin-bottom-left rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md transition-all duration-200 ease-out overflow-hidden my-1_5"
      >
        <div class="bg-c-background-ter h-12 w-12 p-2">
          <img
            class="w-full h-full"
            :src="require('~/assets/images/wallet-logos/Authereum.svg')"
            alt="Authereum"
          />
        </div>
        <div class="flex flex-row flex-1 justify-center">
          <h4
            class="whitespace-no-wrap text-c-dark text-lg font-extrabold ml-8 mr-10"
          >{{ $t("wallet.authereum") }}</h4>
        </div>
      </button>
    </div>
  </div>
</template>