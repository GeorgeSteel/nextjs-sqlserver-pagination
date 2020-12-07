import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import Pagination from '../components/Pagination'
import PaginationContext from '../context/Pagination/PaginationContext'

export default function pages() {
  const { offset, fetch, setRows, resetPagination } = useContext(PaginationContext)
  const [pages, setPages] = useState([])

  useEffect(() => resetPagination(), [])

  useEffect(() => {
    const getPages = async () => {
      const resp = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/pages`, {
        params: { offset, fetch: 10 },
      })

      setRows(resp.data.rows)
      setPages(resp.data.recordset)
    }

    getPages()
  }, [offset, fetch])

  return (
    <>
      <Head>
        <title>Pages Frequency</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col">
        <h1 className="text-center text-2xl mb-1 text-indigo-900 font-medium">
          List of pages that users viewed, ordered by number of users
        </h1>
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Page
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      User Count
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pages.map(page => (
                    <tr key={page.Content}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {page.Content}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          {page.UserCount}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
