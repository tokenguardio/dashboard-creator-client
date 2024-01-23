import Style from './GridItem.module.css'

export const GridItem = ({ children, key }) => {
  return (
    <div className={Style['grid-item']} key={key}>
      {children}
    </div>
    // <Card>
    //   {children}
    // </Card>
  )
}