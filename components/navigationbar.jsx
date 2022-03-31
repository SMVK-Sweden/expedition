import React, { Component } from 'react'
import Link from 'next/link'

class NavigationBar extends Component {
  state = {}
  render() {
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="container-fluid">
          <Link href="/">
            <a className="navbar-brand">Expedition Vanadis</a>
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav">
              <Link href="/">
                <a className="nav-link">Hem</a>
              </Link>
              <Link href="/about">
                <a className="nav-link">Om Vanadis</a>
              </Link>
              <Link href="/images">
                <a className="nav-link">Bilder</a>
              </Link>
              <a className="nav-link disabled">Kontakt</a>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

//<a className="nav-link active" aria-current="page">
//Hem
//</a>

export default NavigationBar
