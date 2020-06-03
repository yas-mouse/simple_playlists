export const state = () => ({
  playlists: [
    {
      title: 'ramdom1',
      src: 'https://picsum.photos/200?random=1'
    },
    {
      title: 'ramdom2',
      src: 'https://picsum.photos/200?random=2'
    },
    {
      title: 'ramdom3',
      src: 'https://picsum.photos/200?random=3'
    },
    {
      title: 'ramdom4',
      src: 'https://picsum.photos/200?random=4'
    },
    {
      title: 'ramdom5',
      src: 'https://picsum.photos/200?random=5'
    },
    { title: 'tst', src: null }
  ]
})

export const mutations = {
  add(state, title) {
    state.playlists.push({
      title,
      src: null
    })
  },
  remove(state, { todo }) {
    state.playlists.splice(state.playlists.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}
