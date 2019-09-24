import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'

import { Input, Form } from 'antd'
import * as actionTypes from '../Redux/actions'

import * as ls from 'local-storage'

const personnummer = require('personnummer')

const SsnInput = (props: any) => {
  const [value, setValue] = useState()
  const [isValid, setIsValid] = useState(false)
  const { ssn, setSsn } = props

  const [tempValue, setTempValue] = useState(() => (ls.get('ssn') ? ls.get('ssn') : ''))

  // ls.set('ssn', value)

  useEffect(() => {
    validateSSN(value)
    setValue(tempValue)
  })

  isValid ? setSsn(value) : setSsn('')
  console.log('reduxx', ssn)

  const validateSSN = (ssn: number) => {
    if (personnummer.valid(ssn)) {
      setIsValid(true)
      console.log(`${ssn} is valid`)
    } else {
      setIsValid(false)
      console.log(`${ssn} is NOT valid`)
    }
  }
  const handleInput = (e: any) => {
    e.preventDefault()
    let input = e.target.value
    setValue(input)
    setTempValue(input)
    ls.set('ssn', input)
  }
  const warning = (
    <Form>
      <Form.Item validateStatus={'error'} help={'Use this format: ÅÅÅÅMMDDNNNN'}>
        <Input
          onChange={e => handleInput(e)}
          placeholder="ÅÅÅMMDDNNNN"
          value={tempValue ? tempValue : value}
          defaultValue={'tempValue'}
        />
      </Form.Item>
    </Form>
  )

  const success = (
    <Form>
      <Form.Item validateStatus={'success'} hasFeedback help={''}>
        <Input
          onChange={e => handleInput(e)}
          placeholder="ÅÅÅÅMMDDNNNN"
          value={tempValue ? tempValue : value}
          defaultValue={'tempValue'}
        />
      </Form.Item>
    </Form>
  )

  const emptyInput = (
    <Form>
      <Form.Item validateStatus={'success'} help={''}>
        <Input
          onChange={e => handleInput(e)}
          placeholder="ÅÅÅÅMMDDNNNN"
          value={tempValue ? tempValue : value}
          defaultValue={'tempValue'}
        />
      </Form.Item>
    </Form>
  )
  return <Form>{tempValue.length === 0 ? emptyInput : isValid ? success : warning}</Form>
}

const mapStateToProps = (state: any) => {
  return {
    ...state,
    ssn: state.ssn
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setSsn: (value: any) => dispatch({ type: actionTypes.SET_SSN, ssn: value })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SsnInput)
