export const state = () => ({
    username: 'Guest',
    pages: 'dashboard'
  })
  
  export const mutations = {

    setUsername(state, username ) {
      state.username = username
    },

    setPages(state, pages ) {
      state.pages = pages
    }

  }
  