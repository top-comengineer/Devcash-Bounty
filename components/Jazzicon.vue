<template>
  <div ref="jazzicon" />
</template>
<script>
if (process.client) {
    var Jazzicon = require('jazzicon')
}
export default {
  props: {
    diameter: Number,
    address: String
  },
  methods: {
    jsNumberForAddress(address) {
        const addr = address.slice(2, 10)
        return parseInt(addr, 16)          
    },
    generateNewIdenticon(address, diameter) {
        const numericRepresentation = this.jsNumberForAddress(address)
        return Jazzicon(diameter, numericRepresentation)
    },
    generateIcon() {
        this.$refs.jazzicon.innerHTML = ''
        const el = this.generateNewIdenticon(this.address, this.diameter)
        this.$refs.jazzicon.append(el)
    }
  },
  mounted() {
      var Jazzicon = require('jazzicon')
      this.generateIcon()
  }
};
</script>