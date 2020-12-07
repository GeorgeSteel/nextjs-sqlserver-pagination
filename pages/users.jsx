import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import Pagination from '../components/Pagination'
import PaginationContext from '../context/Pagination/PaginationContext'
import ChangeQuery from '../components/ChangeQuery'
import QueryContext from '../context/Query/QueryContext'

export default function users() {
  const [users, setUsers] = useState([])
  const { offset, fetch, setRows, resetPagination } = useContext(PaginationContext)
  const { query } = useContext(QueryContext)

  useEffect(() => resetPagination(), [])

  useEffect(() => {
    const getUsers = async () => {
      const resp = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
        params: { query, offset, fetch: 10 },
      })

      setRows(resp.data.rows)
      setUsers(resp.data.recordset)
    }

    getUsers()
  }, [offset, query])

  return (
    <>
      <Head>
        <title>Users History</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <ChangeQuery />
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Last Login
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Logins In Past 90 Days
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map(user => (
                    <tr key={user.UserName}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.UserName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(user.LastLogin).toLocaleString('en-US')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          {user.LoginsInPast90Days}
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
