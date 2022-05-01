import React, { Component } from 'react'
import Link from 'next/link'
import Image from 'next/image'

class NavigationBar extends Component {
  state = {}
  render() {
    return (
      <nav className="navbar static-top navbar-expand-lg navbar-light bg-light">
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
            <a className="navbar-brand" href="#">
              <img
                src="/bild_logga.png"
                width="50"
                height="50"
                className="d-inline-block align-top"
                alt=""
              />
            </a>
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav">
              <Link href="/">
                <a className="nav-link">Idag</a>
              </Link>
              <Link href="/about">
                <a className="nav-link">Om Vanadis</a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

// <a className="nav-link active" aria-current="page">
// Hem
// </a>

export default NavigationBar
