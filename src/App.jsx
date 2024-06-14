import Footer from './component/Footer';
import Sidebar from './component/Sidebar';
import Main from './component/Main';
import { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(true)

  function toggleModal() {
    setShowModal(!showModal)
  }

  useEffect (() => {
    async function fetchData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`
      console.log(NASA_KEY)

      const today = (new Date()).toDateString()
      const localKey = `NASA-${today}`
      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey))
        setData(apiData)
        console.log('Fetched from cache today')
        return
      }
      localStorage.clear()

      try {
        const res = await fetch(url)
        const apiData = await res.json()
        localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData)
        console.log('Fetched from API today!')
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData()
  }, [])



  return (
    <>
      {data ? (<Main data={data}/>): (
        <div className='loadingState'>
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && (<Sidebar toggleModal={toggleModal} data={data}/>
    )}
      {data && (
        <Footer toggleModal={toggleModal} data={data}/>
      )}
    </>
  )
}

export default App
