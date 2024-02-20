import axios from 'axios'

export const fetchDashboard = async (id: string) => {
  const response = await axios.get(`${process.env.API_BASE_URL}/api/dashboard/${id}`)
  const data = response.data

  return data
}