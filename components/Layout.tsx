import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

import { useSession, signIn, signOut } from "next-auth/react"

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const { data: session, status } = useSession()
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <Link href="/">Home</Link> | <Link href="/about">About</Link> |{' '}
          { session ? (
          <>
          <Link href="/users">Users List</Link> | {' '}
          <a href="/api/users">Users API</a>
          </> ) : null
          }
          { session ? <button onClick={() => signOut()}>Sign Out</button> : <button onClick={() => signIn()}>Sign in</button>}
        </nav>
      </header>
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  )
}

export default Layout
