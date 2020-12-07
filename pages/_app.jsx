import Layout from '../components/Layout'
import PaginationState from '../context/Pagination/PaginationState'
import QueryState from '../context/Query/QueryState'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <PaginationState>
      <QueryState>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryState>
    </PaginationState>
  )
}

export default MyApp
