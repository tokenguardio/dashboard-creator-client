/***
 *
 *   useLookSearch hook
 *
 **********/

import { useState, useEffect, useContext } from 'react'
import { fetchElasticSearchLooks } from 'utils/fetches/fetches'
import { ViewContext } from 'components/lib'

export const useLookSearch = (
  searchValue,
  networkChoice,
  blockchainChoice,
  activityChoice,
  visualizationChoice,
  from,
  size
) => {
  const [looks, setLooks] = useState([])
  const [isLooksLoading, setIsLooksLoading] = useState(false)
  const [isMore, setIsMore] = useState(true)
  const viewContext = useContext(ViewContext)

  useEffect(() => {
    setLooks([])
  }, [
    searchValue,
    networkChoice,
    blockchainChoice,
    activityChoice,
    visualizationChoice,
  ])

  useEffect(() => {
    const getLooks = async () => {
      try {
        setIsLooksLoading(true)
        const fetchedlooks = await fetchElasticSearchLooks(
          searchValue,
          blockchainChoice,
          networkChoice,
          activityChoice,
          visualizationChoice,
          from,
          size
        )
        const modifiedLooks = fetchedlooks.map((look) => {
          return {
            lookId: look?.id,
            logo: look?.blockchain?.logo,
            blockchainName: look?.blockchain?.name,
            blockchainNetwork: look?.blockchain?.network,
            title: look?.title,
            visualization: look?.visualization,
            activity: look?.activity?.name,
          }
        })
        setLooks((prevLooks) => {
          return [...new Set([...prevLooks, ...modifiedLooks])]
        })
        setIsMore(modifiedLooks.length > 0)
        setIsLooksLoading(false)
      } catch (err) {
        viewContext && viewContext.handleError(err)
      }
    }
    getLooks()
  }, [
    searchValue,
    networkChoice,
    blockchainChoice,
    activityChoice,
    visualizationChoice,
    from,
    size,
  ])

  return { looks, isLooksLoading, isMore }
}
