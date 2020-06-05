export const state = () => ({
  playlists: [
    {
      id: 'df7c04d6-a63b-11ea-bb37-0242ac130002',
      title: 'beatstrumentals',
      url:
        'https://music.apple.com/jp/playlist/beatstrumentals/pl.f54198ad42404535be13eabf3835fb22'
    }
  ]
})

export const mutations = {
  add(state, playlist) {
    state.playlists.push({
      id: playlist.id,
      title: playlist.title,
      url: playlist.url
    })
  },
  edit(state, playlist) {
    const index = state.playlists.findIndex((e) => e.id === playlist.id)
    if (index) {
      state.playlists[index].title = playlist.title
      state.playlists[index].url = playlist.url
    }
  },
  remove(state, id) {
    state.playlists.splice(
      state.playlists.findIndex((e) => e.id === id),
      1
    )
  }
}
