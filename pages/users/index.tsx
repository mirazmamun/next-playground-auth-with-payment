import { GetStaticProps } from 'next'
import Link from 'next/link'

import { User } from '../../interfaces'
import { sampleUserData } from '../../utils/sample-data'
import Layout from '../../components/Layout'
import List from '../../components/List'
import { useSession, signIn, signOut } from "next-auth/react"

type Props = {
  items: User[]
}

const WithStaticProps = ({ items }: Props) => {
  const { data: session } = useSession()
  if (session) {
    return (
      <Layout title="Users List | Next.js + TypeScript Example">
        <h1>Users List</h1>
        <p>
          Example fetching data from inside <code>getStaticProps()</code>.
        </p>
        <p>You are currently on: /users</p>
        <List items={items} />
        <p>
          <Link href="/">Go home</Link>
        </p>
      </Layout>
    )
  } else {
    return (<Layout title="Users List | Next.js + TypeScript Example">
      <p>
        You need to be logged in to view the content
      </p>
      <br/>
      <button onClick={() => signIn()}>Sign in</button>
    </Layout>)
  }
}

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items: User[] = sampleUserData
  return { props: { items } }
}

WithStaticProps.requireAuth = true

export default WithStaticProps
