import React, {
  useState,
  useEffect,
} from 'react'

import { Icon } from '@/components/icon/Icon'

import Style from './ResultingDataTable.module.css'

const TableHeaderCell = ({
  label,
  column,
  onSort,
  sortOrder,
}) => {
  const handleClick = () => {
    onSort(column)
  }

  const verifySortIcon = (sortOrder) => {
    switch(sortOrder) {
      case 'asc':
        return <Icon name="asc" height="1.2rem" width="1.2rem" />
      case 'desc':
        return <Icon name="desc" height="1.2rem" width="1.2rem" />
      default:
        return <Icon name="random" height="1.2rem" width="1.2rem" />
    }
  }

  return (
    <th className={Style['head-cell']} onClick={handleClick}>
      <div className={Style['head-cell-content']}>
        <p>{label}</p> 
        <span>
          {verifySortIcon(sortOrder)}
        </span>
      </div>
    </th>
  )
}

export const ResultingDataTable = ({ data }) => {
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('desc')
  const [sortedData, setSortedData] = useState([])
  const columns = Object.keys(data[0])
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })
  
    const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
      const reSort = sortedData.slice().sort((a, b) => {
        const aValue = a[sortBy]
        const bValue = b[sortBy]
  
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
      });
      setSortedData(reSort)
    } else {
      setSortBy(column)
      setSortOrder('asc')
      const reSort = sortedData.slice().sort((a, b) => {
        const aValue = a[column]
        const bValue = b[column]
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
        }
      })
      setSortedData(reSort)
    }
  }

  useEffect(() => {

    if (sortedData.length === 0) {
      const defaultSort = [...data].sort((a, b) => {

        const aValue = a[columns[0]]
        const bValue = b[columns[0]]
        if (sortOrder === 'asc') {
          return aValue - bValue
        } else {
          return bValue - aValue
        }
      })

      setSortedData(defaultSort)
    }

  }, [])

  return (
    <div className={Style['resulting-datatable-container']}>
      {data &&
        <div className={Style['table-wrapper']}>
          <table className={Style['table']}>
            <thead>
              <tr className={Style['head-row']}>
                {columns.map((column, index) => (
                  <TableHeaderCell
                    key={`${column}${index}`}
                    label={column}
                    column={column}
                    onSort={handleSort}
                    sortOrder={sortBy === column ? sortOrder : null}
                  />
                ))}         
              </tr>
            </thead>
            <tbody>
              {sortedData && sortedData?.map((row, index) => {
                const rowData = Object.values(row)
                return (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? Style['body-row'] : `${Style['body-row']} ${Style['body-odd-row']}`}
                  >
                    {rowData.map((item, index) => (
                      <td key={`${item}${index}`}>
                        {typeof item === 'number' ? formatter.format(item?.toFixed(0) || 0) : item}
                      </td>
                    ))}
                  </tr>
                )}
              )}
            </tbody>
          </table>
        </div>
      }     
    </div>
  )
}