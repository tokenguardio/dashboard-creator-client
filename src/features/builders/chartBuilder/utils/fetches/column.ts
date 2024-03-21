import axios from 'axios'

export const fetchColumns = async (databaseParam, tableParam, schemaParam) => {
  const response = await axios.get(`${process.env.API_BASE_URL}/api/database-info/${databaseParam}/tables/${schemaParam}/${tableParam}/columns`)
  const data = response.data

  return data
}
