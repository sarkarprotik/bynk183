import React, { useState } from 'react'

import { Popconfirm, message, Avatar, Table, Divider } from 'antd'
import { Resizable } from 'react-resizable'

const ResizeableTitle = (props: any) => {
  const { onResize, width, ...restProps } = props

  if (!width) {
    return <th {...restProps} />
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  )
}

class NewDataTable extends React.Component {
  state = {
    columns: [
      {
        title: 'Avatar',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text: string) => {
          return (
            <Avatar
              style={{ height: '100%' }}
              icon="user"
              //   src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          )
        }
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'SSN',
        dataIndex: 'ssn',
        key: 'ssn'
      },
      {
        title: 'Mobile',
        dataIndex: 'mobile',
        key: 'mobile'
      },

      {
        title: 'E-Mail',
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country'
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text: any, record: any) => {
          return (
            <span>
              <Divider type="vertical" />
              <Popconfirm
                title="Are you sure?"
                onConfirm={e => this.confirm(e, record)}
                onCancel={this.cancel}
                okText="Yes"
                cancelText="No"
              >
                <a href="#">Delete</a>
              </Popconfirm>
            </span>
          )
        }
      }
    ],
    userData: []
  }

  cancel = (e: any) => {
    console.log(e)
    message.error('Cancelled')
  }

  deleteUserLocalStorage = (id: number) => {
    let current_data = JSON.parse(localStorage.getItem('storeObj') || '')
    let updatedUserData = current_data.filter((result: any) => result.id !== id)
    let parsedOutput = JSON.stringify(updatedUserData)
    localStorage.setItem('storeObj', parsedOutput)
  }
  handleDelete = (userObject: any) => {
    let updatedUserData = this.state.userData.filter((result: any) => result.key !== userObject.key)
    this.setState(() => {
      return [...updatedUserData]
    })
    // this.deleteUser(userObject.id)
    this.deleteUserLocalStorage(userObject.id)
  }
  components = {
    header: {
      cell: ResizeableTitle
    }
  }
  confirm = (e: any, object: any) => {
    this.handleDelete(object)
    message.success('Deleted')
  }

  data = [
    {
      key: 0,
      date: '2018-02-11',
      amount: 120,
      type: 'income',
      note: 'transfer'
    },
    {
      key: 1,
      date: '2018-03-11',
      amount: 243,
      type: 'income',
      note: 'transfer'
    },
    {
      key: 2,
      date: '2018-04-11',
      amount: 98,
      type: 'income',
      note: 'transfer'
    }
  ]

  handleResize = (index: any) => (e: any, { size }: any) => {
    this.setState(({ columns }: any) => {
      const nextColumns = [...columns]
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width
      }
      return { columns: nextColumns }
    })
  }

  render() {
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: (column: any) => ({
        width: column.width,
        onResize: this.handleResize(index)
      })
    }))

    return (
      <Table
        style={{ backgroundColor: 'white', opacity: 0.8 }}
        pagination={false}
        components={this.components}
        columns={columns}
        dataSource={this.data}
      />
    )
  }
}

export default NewDataTable
