import React from 'react'

import { Descriptions } from 'antd'

const Responsive = () => {
  return (
    <div>
      <Descriptions
        title="Responsive Descriptions"
        bordered
        column={{ xs: 1 }}
        // column={{ xs: 8, sm: 16, md: 24 }}
      >
        <Descriptions.Item label="Avatar">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Name">Prepaid</Descriptions.Item>
        <Descriptions.Item label="SSN">18:00:00</Descriptions.Item>
        <Descriptions.Item label="Mobile">$80.00</Descriptions.Item>
        <Descriptions.Item label="Email">$20.00</Descriptions.Item>
        <Descriptions.Item label="Country">$60.00</Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default Responsive
