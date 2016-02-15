import { EventEmitter } from 'events'
// import { Promise } from 'es6-promise'
const store = new EventEmitter()

export default store

/*
api.child('topstories').on('value', snapshot => {
  topStoryIds = snapshot.val()
  store.emit('topstories-updated')
})

store.fetchUser = id => {
  return new Promise((resolve, reject) => {
    api.child('user/' + id).once('value', snapshot => {
      resolve(snapshot.val())
    }, reject)
  })
}
*/
