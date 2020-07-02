<template>
  <div class="flex flex-col justify-center items-center pt-12 pb-16 md:pb-32 px-6 text-center">
    <div class="flex flex-row justify-center max-w-full w-132 px-4">
      <img
        class="w-full h-auto"
        :src="require('~/assets/images/illustrations/foreground/404.svg')"
        alt="404 Not Found"
      />
    </div>
    <p class="text-4xl font-bold mt-4">{{ $t("404.header") }}</p>
    <p class="text-xl mt-1">{{ $t("404.paragraph") }}</p>
    <nuxt-link
      class="mt-6 btn-primary bg-c-primary text-c-light transform hover:scale-md focus:scale-md transition-all duration-200 ease-out origin-bottom-left font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 md:px-12 py-2"
      :to="localePath('bountyplatform')"
    >{{ $t("404.buttonCTA") }}</nuxt-link>
  </div>
</template>

<script>
export default {
  layout: "404",
  data() {
    return {
      // For meta tags
      pageTitle: this.$t("meta.404.pageTitle"),
      pageDescription: this.$t("meta.404.pageDescription"),
      pagePreview: `${process.env.BASE_URL}/previews/404.png`,
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
