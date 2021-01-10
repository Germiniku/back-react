import React,{memo} from 'react'

interface IProps {

}

const Login:React.FC<IProps> = (props:IProps) => {
  return (
    <div>
      Login Component
    </div>
  )
}


export default memo(Login)

