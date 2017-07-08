import request from 'superagent'

export function makeDataRequest (callback) {
  request
    .get('/data')
    .end((err, res) => {
      if (err) console.log(err)
      else {
        callback(res.body)
      }
    })
}
