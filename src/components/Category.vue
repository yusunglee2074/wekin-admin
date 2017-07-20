<template>
  <div class="category-box" v-bind:style="style" @click="click">{{text}}</div>
</template>

<script>
export default {
  data () {
    return {
      style: {
        backgroundColor: null,
        color: null
      }
    }
  },
  watch: {
    'text': 'setColorAndText',
    'color': 'setColorAndText'
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '000000'
    }
  },
  methods: {
    computeTextColor (color, simple) {
      var r = this.hexToR(color)
      var g = this.hexToG(color)
      var b = this.hexToB(color)
      if (simple) {
        return ((r * 0.299 + g * 0.587 + b * 0.114) > 186) ? '#000000' : '#ffffff'
      } // else complex formula
      var uicolors = [r / 255, g / 255, b / 255]
      var c = uicolors.map((c) => {
        if (c <= 0.03928) {
          return c / 12.92
        } else {
          return Math.pow((c + 0.055) / 1.055, 2.4)
        }
      })
      var L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
      // console.log(L);
      return (L > 0.179) ? '#000000' : '#ffffff'
    },
    cutHex (h) {
      return (h.charAt(0) === '#') ? h.substring(1, 7) : h
    },
    hexToR (h) {
      return parseInt((this.cutHex(h)).substring(0, 2), 16)
    },
    hexToG (h) {
      return parseInt((this.cutHex(h)).substring(2, 4), 16)
    },
    hexToB (h) {
      return parseInt((this.cutHex(h)).substring(4, 6), 16)
    },
    click (param) {
      this.$emit('click', param)
    },
    setColorAndText () {
      this.style.backgroundColor = '#' + this.color
      if (this.color) {
        this.style.color = this.computeTextColor(this.color)
      }
    }
  },
  mounted () {
    this.setColorAndText()
  }
}
</script>

<style>
.category-box {
  text-align: center;
  padding: 3px 7px;
  font-size: 12px;
  min-width: 10px;
  font-weight: 700;
  border-radius: 10px;
  line-height: 1;
  white-space: nowrap;
  vertical-align: middle;
  display: inline-block;
}
.category-box:hover {
  cursor: pointer;
}
</style>
