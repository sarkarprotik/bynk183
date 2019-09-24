import React from 'react'
import { Input } from 'antd'

type Props = {
  name: string
  title: string
}

const CustomInput = ({ name, title }: Props) => {
  return (
    <div
      style={{
        width: 420,
        display: 'flex',
        padding: 5,
        justifyContent: 'flex-end'
      }}
    >
      <div
        style={{
          whiteSpace: 'nowrap',
          marginRight: 10,
          paddingLeft: 10
        }}
      >
        {title + ' '}
      </div>

      <Input
        style={{
          borderRadius: 50,
          width: 200,
          justifyContent: 'flex-end',
          fontSize: 'calc(0px + 2vmin)'
        }}
        size="large"
        placeholder={name}
      />
    </div>
  )
}

export default CustomInput
