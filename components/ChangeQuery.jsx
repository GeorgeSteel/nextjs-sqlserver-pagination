import { Transition } from '@headlessui/react'
import { useContext, useState } from 'react'
import QueryContext from '../context/Query/QueryContext'

const options = [
  'List of people logged inthe past 90 days, ordered by last login',
  'List of people logged inthe past 90 days, ordered by number of logins',
]

export default function ChangeQuery() {
  const [isOpen, setIsOpen] = useState(false)
  const { query, setQuery } = useContext(QueryContext)

  return (
    <div className="mb-5">
      <label id="listbox-label" className="block text-sm font-medium text-gray-700">
        Fetch
      </label>
      <div className="mt-1 relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <span className="flex items-center">
            <span className="ml-3 block truncate">{query}</span>
          </span>
          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
        <Transition
          show={isOpen}
          enter="transition ease-in duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
            <ul
              tabIndex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-item-3"
              className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            >
              {options.map(option => (
                <li
                  key={option}
                  onClick={() => setQuery(option)}
                  id={option}
                  role="option"
                  className={`hover:bg-indigo-600 hover:text-white text-gray-900
                cursor-default select-none relative py-2 pl-3 pr-9`}
                >
                  <div className="flex items-center">
                    <span className="ml-3 block font-normal truncate">{option}</span>
                  </div>
                  <span
                    className={`${
                      query !== option && 'hidden'
                    } absolute inset-y-0 right-0 flex items-center pr-4  hover:text-white`}
                  >
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Transition>
      </div>
    </div>
  )
}
