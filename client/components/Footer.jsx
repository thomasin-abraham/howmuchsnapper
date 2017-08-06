import React from 'react'
import moment from 'moment'
import jump from 'jump.js'

const Footer = () => {
  return (
    <div className="container-fluid text-center footer">
      <span className="jam jam-heart"></span><br />
      <a href="https://github.com/thomasin-abraham/howmuchsnapper"><span className="jam jam-github"></span></a><br />
      <a href="https://www.snapper.co.nz/" title="Snapper website" target="_blank">Thank you Snapper</a><br />
      <a href="http://jam-icons.com" title="Jam icons website" target="_blank">Icons by Jam Icons</a>
    </div>
  )
}

export default Footer
