import Style from './CreatorSettingsBar.module.css'
// import { Button } from '@/components/button/Button'

export const CreatorSettingsBar = ({
  // dashboardTitle,
  // setIsToolbarExpand,
  // isToolbarExpand,
  // activeElements,
}) => {
  return (
    <div className={Style['creator-settings-bar']}>
      <div className={Style['grid']}>
        {/* <Button
          icon={isToolbarExpand ? 'collapseBar' : 'expandBar'}
          small
          relative
          color="white"
          iconColor="dark"
          iconWidth="20"
          iconHeight="16"
          iconPack="own"
          action={() => setIsToolbarExpand(!isToolbarExpand)}
        />
        <Button
          icon="edit"
          alignLeft
          small
          color="white"
          text="Edit Layout"
          iconColor="dark"
          iconSize="16"
          iconPack="own"
          buttonId="editLayout"
          disabled={activeElements.length === 0}
        />*/}
      </div>
      <div className={Style.grid}>
        {/* <p className={Style.title}>{dashboardTitle}</p> */}
      </div> 
    </div>
  )
}
