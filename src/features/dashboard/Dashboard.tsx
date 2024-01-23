import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const Dashboard = () => {
  const { id } = useParams()

  useEffect(() => {
    // do request for getting dashboard data
  }, [id])


  return (
    <main>
      {id}
    </main>
  )
}