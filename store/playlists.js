export const state = () => ({
  playlists: [
    {
      id: 'df7c04d6-a63b-11ea-bb37-0242ac130002',
      title: 'beatstrumentals',
      url:
        'https://music.apple.com/jp/playlist/beatstrumentals/pl.f54198ad42404535be13eabf3835fb22',
      imgUrl:
        'https://tools.applemusic.com/ja-jp/artwork/pl.f54198ad42404535be13eabf3835fb22.jpg?type=playlist&country=jp'
    }
  ]
})

export const mutations = {
  add(state, playlist) {
    state.playlists.push({
      id: playlist.id,
      title: playlist.title,
      url: playlist.url,
      imgUrl: playlist.imgUrl
    })
  },
  edit(state, playlist) {
    const index = state.playlists.findIndex((e) => e.id === playlist.id)
    if (index) {
      state.playlists[index].title = playlist.title
      state.playlists[index].url = playlist.url
      state.playlists[index].imgUrl = playlist.imgUrl
    }
  },
  remove(state, id) {
    state.playlists.splice(
      state.playlists.findIndex((e) => e.id === id),
      1
    )
  }
}
