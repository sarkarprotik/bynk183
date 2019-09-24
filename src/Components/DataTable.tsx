import React, { useState } from 'react'
import { Popconfirm, message, Avatar, Table, Divider } from 'antd'
import { connect } from 'react-redux'
import * as actionTypes from '../Redux/actions'

const DataTable = (props: any) => {
  const { deleteUser } = props
  const [userData, setUserData] = useState([])

  const item = () => {
    if (!localStorage.getItem('storeObj')) {
      return []
    } else {
      let data = localStorage.getItem('storeObj')
      return JSON.parse(data || '')
    }
  }

  const deleteUserLocalStorage = (id: number) => {
    let current_data = JSON.parse(localStorage.getItem('storeObj') || '')
    let updatedUserData = current_data.filter((result: any) => result.id !== id)
    let parsedOutput = JSON.stringify(updatedUserData)
    localStorage.setItem('storeObj', parsedOutput)
  }

  const handleDelete = (userObject: any) => {
    let updatedUserData = userData.filter((result: any) => result.key !== userObject.key)
    setUserData(() => {
      return [...updatedUserData]
    })
    deleteUser(userObject.id)
    deleteUserLocalStorage(userObject.id)
  }

  const confirm = (e: any, object: any) => {
    handleDelete(object)
    message.success('Deleted')
  }

  const cancel = (e: any) => {
    console.log(e)
    message.error('Cancelled')
  }

  const columns = [
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
              onConfirm={e => confirm(e, record)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">Delete</a>
            </Popconfirm>
          </span>
        )
      }
    }
  ]

  return (
    <div>
      <Table
        style={{ backgroundColor: 'white', opacity: 0.8 }}
        pagination={false}
        columns={columns}
        dataSource={item()}
      />
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteUser: (id: any) => dispatch({ type: actionTypes.DELETE_USER, id: id })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTable)
