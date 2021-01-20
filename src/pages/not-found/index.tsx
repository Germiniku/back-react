import React, { memo } from 'react'
                
interface IProps {
 
}

const NotFound: React.FC<IProps> = (props) => {
  return (
    <div>
      页面丢失了
    </div>
  )
}

export default memo(NotFound)