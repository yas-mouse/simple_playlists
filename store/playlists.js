export const state = () => ({
  playlists: [
    {
      title: 'ramdom1',
      url: 'https://picsum.photos/200?random=1'
    },
    {
      title: 'ramdom2',
      url: 'https://picsum.photos/200?random=2'
    },
    {
      title: 'ramdom3',
      url: 'https://picsum.photos/200?random=3'
    },
    {
      title: 'ramdom4',
      url: 'https://picsum.photos/200?random=4'
    },
    {
      title: 'ramdom5',
      url: 'https://picsum.photos/200?random=5'
    },
    { title: 'tst', url: null }
  ]
})

export const mutations = {
  add(state, title) {
    state.playlists.push({
      title,
      url: null
    })
  },
  remove(state, { playlist }) {
    state.playlists.splice(state.playlists.indexOf(playlist), 1)
  }
}
