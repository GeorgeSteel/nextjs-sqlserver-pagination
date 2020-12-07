import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="pt-5 mx-auto max-w-screen-lg md:w-11/12 sm:w-3/6">{children}</div>
    </>
  )
}
