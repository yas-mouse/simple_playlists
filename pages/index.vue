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
                v-model="url"
                :rules="urlRules"
                label="Url"
                required
                clearable
                @input="changeUrl"
              ></v-text-field>

              <v-text-field
                v-model="title"
                :rules="titleRules"
                label="title"
                required
                clearable
              ></v-text-field>

              <v-text-field
                v-model="imgUrl"
                label="image URL"
                clearable
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

    <v-row>
      <v-btn rounded class="ma-2" color="primary" @click="clickAdd">Add</v-btn>
      <v-btn
        rounded
        class="ma-2"
        color="secondary"
        :outlined="editing"
        @click="editing = !editing"
        >{{ editing ? 'EDITING' : 'EDIT' }}</v-btn
      >
      <v-btn
        rounded
        class="ma-2"
        color="blue"
        :outlined="textShowing"
        @click="textShowing = !textShowing"
        >{{ textShowing ? 'SHOWING' : 'SHOW TEXT' }}</v-btn
      >
    </v-row>
    <v-row dense>
      <v-col
        v-for="playlist in playlists"
        :key="playlist.id"
        :cols="textShowing ? 12 : 3"
      >
        <v-card @click="clickCard(playlist)">
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-card-subtitle v-if="textShowing" v-text="playlist.title" />

            <v-img
              v-if="playlist.imgUrl"
              :src="getImage(playlist.id)"
              :max-width="textShowing ? '20%' : '100%'"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-img
              v-if="!playlist.imgUrl"
              src="/images/no_image.png"
              :max-width="textShowing ? '20%' : '100%'"
            >
              <v-row align="end" class="lightbox white--text pa-2 fill-height">
                <div class="subheading pa-2">
                  {{ playlist.title }}
                </div>
              </v-row>
            </v-img>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import uuid from 'uuid'

export default {
  components: {},
  asyncData() {
    const request = indexedDB.open('MyDatabase')
    request.onupgradeneeded = function(event) {
      event.currentTarget.result.createObjectStore('images', {
        keyPath: 'id',
        autoIncrement: true
      })
    }
    request.onerror = function(event) {
      alert('なぜ私の ウェブアプリで IndexedDB を使わせてくれないのですか?!')
    }

    // 画像データ取得
    const imageData = []
    request.onsuccess = function(event) {
      const db = event.target.result
      const store = db.transaction(['images'], 'readonly').objectStore('images')

      store.openCursor().onsuccess = function(event) {
        const cursor = event.target.result

        if (cursor) {
          imageData.push(cursor.value)
          cursor.continue()
        }
      }
    }
    return { imageData }
  },
  data() {
    return {
      dialog: false,
      editing: false,
      textShowing: false,
      valid: true,
      id: '',
      title: '',
      titleRules: [(v) => !!v || 'Title is required'],
      url: '',
      urlRules: [(v) => !!v || 'URL is required'],
      imgUrl: '',
      imageData: []
    }
  },
  computed: {
    playlists() {
      return this.$store.state.playlists.playlists
    }
  },
  methods: {
    changeUrl(text) {
      if (!text) {
        return
      }
      if (
        text.includes('https://music.apple.com/jp/playlist/') ||
        text.includes('https://music.apple.com/jp/album/')
      ) {
        // タイトルをurlから取得する
        const split = text.split('/')
        if (split.length > 5 && split[5]) {
          this.title = decodeURI(split[5])
        }

        if (split.length > 6 && split[6]) {
          if (split[6].match(/^pl./)) {
            // プレイリストの場合アートワーク画像urlを取得
            this.imgUrl = this.getArtworkUrl(split[6])
          } else {
            // プレイリストでない場合はデフォルト画像
            this.imgUrl = ''
          }
        }
      }
    },
    clickAdd() {
      this.dialog = true
      this.editing = false
    },
    addPlaylist() {
      if (!this.validate()) {
        return
      }
      if (this.editing) {
        this.$store.commit('playlists/edit', {
          id: this.id,
          title: this.title,
          url: this.url,
          imgUrl: this.imgUrl
        })
      } else {
        const id = uuid()
        this.$store.commit('playlists/add', {
          id,
          title: this.title,
          url: this.url,
          imgUrl: this.imgUrl
        })

        this.storeImage(id, this.imgUrl)
      }
      this.title = ''
      this.url = ''
      this.imgUrl = ''
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
        this.imgUrl = ''
        this.dialog = false
      }
    },
    clickCard(playlist) {
      if (this.editing) {
        this.id = playlist.id
        this.title = playlist.title
        this.url = playlist.url
        this.imgUrl = playlist.imgUrl
        this.dialog = true
      } else {
        // リンクで移動
        window.location = playlist.url
      }
    },
    validate() {
      return this.$refs.form.validate()
    },
    getArtworkUrl(playlistUrl) {
      return `/api/${playlistUrl}.jpg`
      // return `https://tools.applemusic.com/ja-jp/artwork/${playlistUrl}.jpg`
    },
    storeImage(id, imgUrl) {
      this.$axios
        .get(imgUrl, {
          responseType: 'arraybuffer',
          headers: { 'Content-Type': 'image/jpeg' }
        })
        .then((res) => {
          // 画像を文字化
          const prefix = `data:${res.headers['content-type']};base64,`
          const base64 = Buffer.from(res.data, 'binary').toString('base64')
          const image = prefix + base64
          const data = { id, image }

          // ローカルの配列に保存しておく
          this.imageData.push(data)

          const request = indexedDB.open('MyDatabase')
          request.onsuccess = function(event) {
            const db = event.target.result
            const transact = db.transaction(['images'], 'readwrite')
            const store = transact.objectStore('images')

            const putRequest = store.put(data)

            putRequest.onsuccess = function() {
              console.log('succeeded to store image')
            }
          }
        })
    },
    getImage(id) {
      const data = this.imageData.find((e) => e.id === id)
      if (data) {
        return data.image
      } else {
        return '/images/no_image.png'
      }
    }
  }
}
</script>
