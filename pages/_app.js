import App from 'next/app'
import '../styles/globals.css'
import React from 'react'
import { SourceProvider } from '../components/source'

let store = {};

const globalStore = {};

globalStore.set = (key, value) => {
    store = { ...store, [key]: value };
}

globalStore.get = (key) => {
    return store[key];
}


export default globalStore;

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <SourceProvider>
        <Component {...pageProps} />
      </SourceProvider>
    )
  }
}

export default MyApp
