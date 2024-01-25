/***
 *
 *   CHART BUILDER
 *
 **********/

import { useContext } from 'react'

import { BlockChartContext } from '@/contexts/BlockChartContext'
import { IconButton } from '@/components/button/IconButton'
import { Icon } from '@/components/icon/Icon'
import { TextInput } from '@/components/input/TextInput'


import { Window } from './components/Window'
import Style from './ChartBuilder.module.css'

export function ChartBuilder() {
  const blockChartContext = useContext(BlockChartContext)
  if (!blockChartContext) {
    throw Error('Chart context has to be in provider')
  }
  const { blockChartId, setBlockChartId } = blockChartContext

  // useEffect(() => {

  // }, [blockChartId])

  // if (blockChartId) {
  //   return (
  //     <main className={Style['chart-builder-container']}>
  //         {/* <DashboardTitle />
  //         <BlockChartModifier /> */}
  //     </main>
  //   )
  // }

  return (
    <Window>
      <div className={Style['top-bar']}>
        <p>Choose an explore</p>
        <IconButton
          onClick={() => setBlockChartId(undefined)}
          icon={<Icon name="exit" height="1.6rem" width="1.6rem" />}
        />
      </div>
      <div className={Style['container']}>
        <div className={Style['list']}>
          <TextInput
            name="search"
          />
          {blockChartId}
        </div>
        <div className={Style['preview']}>
          <p className={Style['preview-paragraph']}>Select an explore to continue</p>
        </div>
      </div>
    </Window>
  )
}
