<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="card in cards" :key="card.title" :cols="3">
        <v-card>
          <v-img
            v-if="card.src != null"
            :src="card.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5" />
              </v-row>
            </template>
            <v-card-title v-text="card.title" />
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      cards: [
        {
          title: 'ramdom1',
          src: 'https://picsum.photos/200?random=1',
          flex: 6
        },
        {
          title: 'ramdom2',
          src: 'https://picsum.photos/200?random=2',
          flex: 6
        },
        {
          title: 'ramdom3',
          src: 'https://picsum.photos/200?random=3',
          flex: 6
        },
        {
          title: 'ramdom4',
          src: 'https://picsum.photos/200?random=4',
          flex: 6
        },
        {
          title: 'ramdom5',
          src: 'https://picsum.photos/200?random=5',
          flex: 6
        },
        { title: 'tst', src: null, flex: 6 }
      ]
    }
  }
}
</script>
