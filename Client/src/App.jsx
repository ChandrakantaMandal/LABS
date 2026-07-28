import AppRoutes from './route/AppRoutes.jsx'
import { ToastContainer } from 'react-toastify'

export default function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </>
  )
}
