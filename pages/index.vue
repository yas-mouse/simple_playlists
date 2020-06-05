<template>
  <v-container fluid>
    <!-- プレイリスト追加ダイアログ -->
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Add playlist</v-card-title>

        <v-list-item>
          <v-list-item-content>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="title"
                :rules="titleRules"
                label="title"
                required
              ></v-text-field>

              <v-text-field
                v-model="url"
                :rules="urlRules"
                label="Url"
                required
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-btn color="green lighten-1" text @click="addPlaylist"
                >Finish</v-btn
              >
              <v-btn
                v-if="editing"
                color="red lighten-1"
                text
                @click="removePlaylist"
                >Remove</v-btn
              >
            </v-form>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-dialog>

    <v-row dense>
      <v-col v-for="playlist in playlists" :key="playlist.id" :cols="3">
        <v-card @click="clickCard(playlist)">
          <v-card-subtitle v-text="playlist.title" />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-btn rounded class="ma-2" color="primary" @click.stop="clickAdd"
        >Add</v-btn
      >
      <v-btn
        rounded
        class="ma-2"
        color="secondary"
        :outlined="editing"
        @click.stop="editing = !editing"
        >{{ editing ? 'EDITING' : 'EDIT' }}</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import uuid from 'uuid'

export default {
  components: {},
  data() {
    return {
      dialog: false,
      editing: false,
      valid: true,
      id: '',
      title: '',
      titleRules: [(v) => !!v || 'Title is required'],
      url: '',
      urlRules: [(v) => !!v || 'URL is required']
    }
  },
  computed: {
    playlists() {
      return this.$store.state.playlists.playlists
    }
  },
  methods: {
    async clickAdd() {
      this.dialog = true
      this.editing = false

      try {
        // apple musicがクリップボードにコピーされている場合
        const clipText = await navigator.clipboard.readText()

        if (clipText.includes('https://music.apple.com/jp/playlist/')) {
          this.url = clipText

          // タイトルをurlから取得する
          const split = clipText.split('/')
          if (split.length > 6 && split[5]) {
            const decorded = decodeURI(split[5])

            this.title = decorded
          }
        }
      } catch (e) {
        console.error(e.message)
      }
    },
    addPlaylist() {
      if (!this.validate()) {
        return
      }
      if (this.editing) {
        this.$store.commit('playlists/edit', {
          id: this.id,
          title: this.title,
          url: this.url
        })
      } else {
        this.$store.commit('playlists/add', {
          id: uuid(),
          title: this.title,
          url: this.url
        })
      }
      this.title = ''
      this.url = ''
      this.dialog = false
    },
    removePlaylist() {
      if (!this.editing) {
        return
      }
      if (window.confirm('Are you sure?')) {
        this.$store.commit('playlists/remove', this.id)

        this.title = ''
        this.url = ''
        this.dialog = false
      }
    },
    clickCard(playlist) {
      if (this.editing) {
        this.id = playlist.id
        this.title = playlist.title
        this.url = playlist.url
        this.dialog = true
      } else {
        // リンクで移動
        window.location = playlist.url
      }
    },
    validate() {
      return this.$refs.form.validate()
    }
  }
}
</script>
