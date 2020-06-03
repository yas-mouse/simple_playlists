<template>
  <v-container fluid>
    <v-row>
      <v-btn rounded color="primary" @click.stop="dialog = true">Add</v-btn>
    </v-row>

    <!-- プレイリスト追加ダイアログ -->
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Add playlist</v-card-title>

        <v-list-item>
          <v-list-item-content>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="title"
                :counter="10"
                :rules="titleRules"
                label="title"
                required
              ></v-text-field>

              <v-text-field
                v-model="url"
                :counter="10"
                :rules="urlRules"
                label="Url"
                required
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click=";(dialog = false), validate"
                >Finish</v-btn
              >
            </v-form>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-dialog>

    <v-row dense>
      <v-col v-for="playlist in playlists" :key="playlist.title" :cols="3">
        <v-card>
          <v-img
            v-if="playlist.src != null"
            :src="playlist.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5" />
              </v-row>
            </template>
            <v-card-title v-text="playlist.title" />
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  components: {},
  data() {
    return {
      dialog: true,
      valid: true,
      title: '',
      titleRules: [
        (v) => !!v || 'Title is required',
        (v) => (v && v.length <= 10) || 'Title must be less than 10 characters'
      ],
      url: '',
      urlRules: [
        (v) => !!v || 'URL is required',
        (v) => (v && v.length <= 10) || 'URL must be less than 10 characters'
      ]
    }
  },
  computed: {
    playlists() {
      return this.$store.state.playlists.playlists
    }
  },
  methods: {
    addPlaylist(e) {
      this.$store.commit('playlists/add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'playlists/toggle'
    }),
    validate() {
      this.$refs.form.validate()
    }
  }
}
</script>
