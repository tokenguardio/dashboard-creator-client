import { useState, useContext } from 'react'
import { Label } from '@/components/label/Label'
import { CustomSelect } from '@/components/select/Select'
import { Line } from '@/components/line/Line'
import { TextInput } from '@/components/input/TextInput'
import { ColorTextInput } from '@/components/input/ColorTextInput'
import { OptionBadge } from '../optionBadge/OptionBadge'
import { DashboardContentContext } from '@/contexts/DashboardContentContext'

import Style from './Customize.module.css'

export const Customize = () => {
  const { dashboardTheme, setDashboardTheme } = useContext(DashboardContentContext)
  const [color, setColor] = useState()
  
  const updateTheme = (e, name) => {
    const value = e.target.value
    setDashboardTheme(prevTheme => ({
      ...prevTheme,
      [name]: value,
    }))
  }

  const handleFilters = (option, selectData) => {
    setDashboardTheme(prevTheme => ({
      ...prevTheme,
      [selectData.name]: option.value,
    }))

    // if (selectData.name === 'font') {
    //   setBlockchainChoice(option.value)
    //   setFrom(0)
    //   setSize(5)
    // }

    // if (selectData.name === 'activity') {
    //   setActivityChoice(option.value)
    //   setFrom(0)
    //   setSize(5)
    // }
  }
  // const handleChange = (name, value) => {
  //   setSearchValue(value)
  //   setFrom(0)
  //   setSize(5)
  // }

  return (
    <div className={Style['customize-window']}>
      <h3 className={Style['customize-title']}>Customize</h3>
      <div className={Style['customize-container-options']}>
        <CustomSelect
          // label="Blockchain"
          // name="blockchain"
          // value={blockchainChoice}
          // options={filters.blockchains}
          // placeholder={blockchainChoice || 'Select'}
          // change={handleFilters}
          // isSearchable
          // isClearable
          // classNamePrefix="react-select-with-icon"
          value={dashboardTheme.fontFamily}
          name="font"
          label="Font"
          placeholder={dashboardTheme.fontFamily || ''}
          change={handleFilters}
          options={[
            { value: 'Roboto', label: 'Roboto'},
            { value: 'Arial', label: 'Arial'},
            { value: 'Tahoma', label: 'Tahoma'},
            { value: 'Verdana', label: 'Verdana'},
            { value: 'Times New Roman', label: 'Times New Roman'},
            { value: 'Georgia', label: 'Georgia'},
          ]}
        />
        <CustomSelect
          label="Color Palette"
          name="colour-palette"
          options={[
            { value: 0, label: 'test1'},
            { value: 1, label: 'test2'},
            { value: 0, label: 'test3'},
          ]}
        />
        <div className={Style['customize-colors']}>
          <Label text="Colors" forInput="colors" />
          <ColorTextInput name="primaryColor" value={dashboardTheme.primaryColor} change={e => updateTheme(e, 'primaryColor')} />
          <ColorTextInput name="secondaryColor" value={dashboardTheme.secondaryColor} change={e => updateTheme(e, 'secondaryColor')} />
          <ColorTextInput name="tertiaryColor" value={dashboardTheme.tertiaryColor} change={e => updateTheme(e, 'tertiaryColor')} />
        </div>
      </div>
      <Line />
      <h3 className={Style['customize-title']}>Advanced</h3>
      <div className={Style['advanced-options-container']}>
        <ColorTextInput label="Card Background Color" value={dashboardTheme.itemGridBgColor} change={e => updateTheme(e, 'itemGridBgColor')} />
        <ColorTextInput label="Text Color" value={dashboardTheme.fontColor} change={e => updateTheme(e, 'fontColor')} />
        <ColorTextInput label="Stroke Color" value={dashboardTheme.strokeColor} change={e => updateTheme(e, 'strokeColor')} />
        <ColorTextInput label="Dashboard Background Color" value={dashboardTheme.bgColor} change={e => updateTheme(e, 'bgColor')} />
        <TextInput label="Chart Border Radius" value={dashboardTheme.itemGridRadius} change={e => updateTheme(e, 'itemGridRadius')}  />
        <Label text="Gradients in Linecharts" forInput="Text Color" />
        <div className={Style['option-badge-container']}>
          <OptionBadge
            selected={dashboardTheme.gradient}
            action={() => {
              setDashboardTheme(prevTheme => ({
                ...prevTheme,
                gradient: true,
              }))
            }}
            // className={Style.box}
            // selected={networkChoice === singleNetwork.value}
          >
            <p>Yes</p>
          </OptionBadge>
          <OptionBadge
            selected={!dashboardTheme.gradient}
            action={() => {
              setDashboardTheme(prevTheme => ({
                ...prevTheme,
                gradient: false,
              }))
            }}
            // className={Style.box}
            // selected={networkChoice === singleNetwork.value}
          >
            <p>No</p>
          </OptionBadge>
        </div>
        <Label text="Bottom Timeline" forInput="Text Color" />
        <div className={Style['option-badge-container']}>
          <OptionBadge
            selected={dashboardTheme.dataZoom}
            action={() => {
                // setNetworkChoice('')
                console.log('test 13')
                setDashboardTheme(prevTheme => ({
                  ...prevTheme,
                  dataZoom: true,
                }))
            }}
            // className={Style.box}
            // selected={networkChoice === singleNetwork.value}
          >
            <p>Yes</p>
          </OptionBadge>
          <OptionBadge
            selected={!dashboardTheme.dataZoom}
            action={() => {
              setDashboardTheme(prevTheme => ({
                ...prevTheme,
                dataZoom: false,
              }))
            }}
            // className={Style.box}
            // selected={networkChoice === singleNetwork.value}
          >
            <p>No</p>
          </OptionBadge>
        </div>      
      </div>
    </div>
  )
}