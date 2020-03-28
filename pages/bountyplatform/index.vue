<template>
  <div class="w-full flex flex-col justify-center items-center">
    <GreetingCard class="my-1 md:my-2" />
    <BountyCard
      v-for="(item, i) in fakeData"
      :key="i"
      class="my-1 md:my-2"
      :bountyName="item.bountyName"
      :creatorAddress="item.creatorAddress"
      :devAmount="item.devAmount"
      :ethAmount="item.ethAmount"
      :usdAmount="item.usdAmount"
      :remainingCount="item.remainingCount"
      :remainingTime="item.remainingTime"
    />
  </div>
</template>

<script>
import BountyCard from "~/components/BountyPlatform/BountyCard.vue";
import GreetingCard from "~/components/BountyPlatform/GreetingCard.vue";
import { DevcashBounty } from "~/plugins/devcash/devcashBounty.client";
export default {
  layout: "bountyPlatform",
  components: {
    BountyCard,
    GreetingCard
  },
  data() {
    return {
      fakeData: [
        {
          bountyName: "Devcash DEX Frontend",
          creatorAddress: "0xFD611e521fcB29fc364037D56B74C49C01f14F2d",
          devAmount: "12,500,000",
          ethAmount: "27.78",
          usdAmount: "7,500",
          remainingCount: "1 of 1",
          remainingTime: "4 months"
        },

        {
          bountyName: "BDU Event Feedback",
          creatorAddress: "0xB3201802Ac6ADF45e768763C42d998b966628A30",
          devAmount: "1,666",
          ethAmount: "0.0037",
          usdAmount: "1",
          remainingCount: "13 of 100",
          remainingTime: "2 weeks"
        },
        {
          bountyName: "Devcash Frontend",
          creatorAddress: "0x2BC8e1f9949bd9b494Bdd487a68Cc1acF5D7E655",
          devAmount: "15,000,000",
          ethAmount: "33.33",
          usdAmount: "9,000",
          remainingCount: "1 of 1",
          remainingTime: "5 months"
        },
        {
          bountyName: "DACB.com Wallet",
          creatorAddress: "0xed6b0dC3AA8dE5908aB857a70Cb2Ff657d9b6C5d",
          devAmount: "55,800,000",
          ethAmount: "124.07",
          usdAmount: "33,500",
          remainingCount: "1 of 1",
          remainingTime: "6 months"
        },
        {
          bountyName: "Polymath Marketing",
          creatorAddress: "0x8A91C9A16cD62693649D80Afa85A09DBBdCb8508",
          devAmount: "833",
          ethAmount: "0.00185",
          usdAmount: "0.5",
          remainingCount: "53 of 200",
          remainingTime: "6 days"
        },
        {
          bountyName: "ETH Library Written in Dart",
          creatorAddress: "0x7dbc5395d1Cb5F829Bc8ECA20f16BEd7bCEcA504",
          devAmount: "8,330,000",
          ethAmount: "16.518",
          usdAmount: "5000",
          remainingCount: "1 of 1",
          remainingTime: "1 month"
        },
        {
          bountyName: "Zipply Github Issues",
          creatorAddress: "0x84A0d77c693aDAbE0ebc48F88b3fFFF010577051",
          devAmount: "3,332,000",
          ethAmount: "7.4",
          usdAmount: "2000",
          remainingCount: "1 of 1",
          remainingTime: "7 weeks"
        },
        {
          bountyName: "RandoToken Youtube Bounty",
          creatorAddress: "0x2F3030464aa543eB2cD679381679aD825fEEB222",
          devAmount: "1,249.5",
          ethAmount: "0.002775",
          usdAmount: "0.75",
          remainingCount: "23 of 150",
          remainingTime: "5 days"
        },
        {
          bountyName: "Xiora Reddit Bounty",
          creatorAddress: "0xfEADe5af8689BfF043F97C4e015438B5A8725895",
          devAmount: "833",
          ethAmount: "0.00185",
          usdAmount: "0.5",
          remainingCount: "7 of 50",
          remainingTime: "13 days"
        },
        {
          bountyName: "TOA Github Issues",
          creatorAddress: "0x263fA3D903d581F4D4CDf578e5E19A20cE1597B0",
          devAmount: "1,666,000",
          ethAmount: "3.7",
          usdAmount: "1000",
          remainingCount: "1 of 2",
          remainingTime: "2 weeks"
        },
        {
          bountyName: "RandoToken Reddit Bounty",
          creatorAddress: "0x2F3030464aa543eB2cD679381679aD825fEEB222",
          devAmount: "1,249.5",
          ethAmount: "0.002775",
          usdAmount: "0.75",
          remainingCount: "2 of 100",
          remainingTime: "11 days"
        },
        {
          bountyName: "DACB.com Chrome Extention",
          creatorAddress: "0xed6b0dC3AA8dE5908aB857a70Cb2Ff657d9b6C5d",
          devAmount: "5,580,000",
          ethAmount: "12.407",
          usdAmount: "3,350",
          remainingCount: "1 of 1",
          remainingTime: "4 months"
        },
        {
          bountyName: "Xiora Medium Bounty",
          creatorAddress: "0xfEADe5af8689BfF043F97C4e015438B5A8725895",
          devAmount: "833",
          ethAmount: "0.00185",
          usdAmount: "0.5",
          remainingCount: "12 of 25",
          remainingTime: "23 days"
        },
        {
          bountyName: "Xiora Publish0x Bounty",
          creatorAddress: "0xfEADe5af8689BfF043F97C4e015438B5A8725895",
          devAmount: "833",
          ethAmount: "0.00185",
          usdAmount: "0.5",
          remainingCount: "5 of 50",
          remainingTime: "9 days"
        },
        {
          bountyName: "Devcash Logo",
          creatorAddress: "0xFD611e521fcB29fc364037D56B74C49C01f14F2d",
          devAmount: "1,250,000",
          ethAmount: "2.778",
          usdAmount: "750",
          remainingCount: "1 of 1",
          remainingTime: "3 months"
        }
      ]
    };
  }
};
</script>
