---
to: "src/views/<%= h.changeCase.pascal(name) %>.vue"
---
<template>
  <Layout title="<%= h.changeCase.pascal(name) %>"></Layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

// Layout
import Layout from '@/layout/Default.vue'

@Component({
  components: {
    Layout
  }
})
export default class <%= h.changeCase.pascal(name) %> extends Vue {}
</script>
