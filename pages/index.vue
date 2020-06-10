<template>
  <div>
    <SectionHero />
    <SectionWhatIs />
    <SectionIBO />
    <SectionBountyPlatform />
    <SectionDEX />
    <SectionTokenDetails />
    <SectionStartExploring />
  </div>
</template>

<script>
import SectionHero from "~/components/Home/Sections/SectionHero.vue";
import SectionWhatIs from "~/components/Home/Sections/SectionWhatIs.vue";
import SectionIBO from "~/components/Home/Sections/SectionIBO.vue";
import SectionBountyPlatform from "~/components/Home/Sections/SectionBountyPlatform.vue";
import SectionDEX from "~/components/Home/Sections/SectionDEX.vue";
import SectionTokenDetails from "~/components/Home/Sections/SectionTokenDetails.vue";
import SectionStartExploring from "~/components/Home/Sections/SectionStartExploring.vue";
export default {
  components: {
    SectionHero,
    SectionWhatIs,
    SectionIBO,
    SectionBountyPlatform,
    SectionDEX,
    SectionTokenDetails,
    SectionStartExploring
  },
  data() {
    return {
      // For meta tags
      pageDescription:
        "Devcash (DEV) is cash for the developer economy. It is the official currency of Blockchain Developers United. Devcash offers various services such as a bounty platform and a decentralize exchange to make developers’ jobs easier.",
      pageTitle: "Devcash | Cash for the Developer Economy",
      pagePreview: `${process.env.BASE_URL}/previews/home.png`,
      pageThemeColor: "#675CFF",
      canonicalURL: process.env.CANONICAL_URL
    };
  },
  head() {
    return {
      title: this.pageTitle,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.pageDescription
        },
        // Google / Search Engine Tags
        {
          itemprop: "name",
          content: this.pageTitle
        },
        {
          itemprop: "description",
          content: this.pageDescription
        },
        {
          itemprop: "image",
          content: this.pagePreview
        },
        // Facebook Meta Tags
        {
          property: "og:url",
          content: this.canonicalURL
        },
        {
          property: "og:type",
          content: "website"
        },
        {
          property: "og:title",
          content: this.pageTitle
        },
        {
          property: "og:description",
          content: this.pageDescription
        },
        {
          property: "og:image",
          content: this.pagePreview
        },
        // Twitter Meta Tags
        {
          name: "twitter:card",
          content: "summary_large_image"
        },
        {
          name: "twitter:title",
          content: this.pageTitle
        },
        {
          name: "twitter:description",
          content: this.pageDescription
        },
        {
          name: "twitter:image",
          content: this.pagePreview
        },
        // Theme
        {
          name: "theme-color",
          content: this.pageThemeColor
        },
        // Windows 8 IE 10
        {
          name: "msapplication-TileColor",
          content: this.pageThemeColor
        },
        // Windows 8.1 + IE11 and above
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: this.pageThemeColor
        }
      ],
      link: [
        // Canonical
        {
          rel: "canonical",
          href: this.canonicalURL
        },
        // Generic Icons
        {
          rel: "icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png"
        },
        {
          rel: "icon",
          sizes: "32x32",
          href: "/favicon-32x32.png"
        },
        {
          rel: "icon",
          sizes: "16x16",
          href: "/favicon-16x16.png"
        },
        { rel: "manifest", href: "/site.webmanifest" }
      ]
    };
  }
};
</script>
