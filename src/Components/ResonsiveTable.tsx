import React, { useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { connect } from 'react-redux'
import { Popconfirm, Divider, message, Avatar } from 'antd'
import * as actionTypes from '../Redux/actions'

const ResponsiveTable = (props: any) => {
  const { deleteUser } = props
  const [userData, setUserData] = useState([])

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

  const confirm = (e: any, userObject: any) => {
    handleDelete(userObject)
    message.success('Deleted')
    console.log(userObject)
  }

  const cancel = (e: any) => {
    console.log(e)
    message.error('Cancelled')
  }

  const item = () => {
    if (!localStorage.getItem('storeObj')) {
      return []
    } else {
      let data = localStorage.getItem('storeObj')
      return JSON.parse(data || '')
    }
  }
  const dataSource = item()

  console.log(dataSource)
  return (
    <div style={{ backgroundColor: '#DBEEFB', width: '90vw', opacity: 0.8 }}>
      <Table>
        <Thead>
          <Tr>
            <Th style={{ paddingTop: 16, paddingBottom: 16, paddingLeft: 16 }}>Avatar</Th>
            <Th style={{ padding: 8 }}>Name</Th>
            <Th>SSN</Th>
            <Th>E-Mail</Th>
            <Th>Mobile</Th>
            <Th>Country</Th>
            <Th style={{ paddingLeft: 16 }}>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dataSource.map((userobject: any) => {
            return (
              <Tr style={{ padding: 16 }}>
                <Td>
                  <div style={{ paddingBottom: 16, paddingLeft: 16 }}>
                    <Avatar style={{ height: '100%' }} icon="user" src={userobject.avatar} />
                  </div>
                </Td>
                <Td>
                  <div>{userobject.name}</div>
                </Td>
                <Td>{userobject.ssn}</Td>
                <Td>{userobject.email}</Td>
                <Td>{userobject.mobile}</Td>
                <Td>{userobject.country}</Td>
                <Td>
                  <span>
                    <Divider type="vertical" />
                    <Popconfirm
                      title="Are you sure?"
                      onConfirm={e => confirm(e, userobject)}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <a href="#">Delete</a>
                    </Popconfirm>
                  </span>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
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
)(ResponsiveTable)
