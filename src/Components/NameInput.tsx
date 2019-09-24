import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Input, Form } from 'antd'
import * as actionTypes from '../Redux/actions'
import * as ls from 'local-storage'

const NameInput = (props: any) => {
  const { setName } = props
  const [value, setValue] = useState('')
  const [isValid, setIsValid] = useState(false)

  const [tempValue, setTempValue] = useState(() => (ls.get('name') ? ls.get('name') : ''))

  useEffect(() => {
    validateName(value)
    setValue(tempValue)
  }, [value, tempValue])

  isValid ? setName(value) : setName('')

  const validateName = (name: string) => {
    console.log(name, 'this is validation ')
    if (!/[^a-zA-ZöäåÖÄÅ\s]/.test(name)) {
      console.log(`${name} is Valid`)
      setIsValid(true)
    } else {
      console.log(`${name} is NOT Valid`)
      setIsValid(false)
    }
  }

  const handleInput = (e: any) => {
    e.preventDefault()
    let input = e.target.value
    setValue(input)
    setTempValue(input)
    ls.set('name', input)
  }

  const warning = (
    <Form>
      <Form.Item validateStatus={'warning'} help={'Name has invalid Characters'}>
        <Input
          onChange={e => handleInput(e)}
          placeholder="Protik Sarkar"
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
          placeholder="Protik Sarkar"
          value={tempValue ? tempValue : value}
          defaultValue={'tempValue'}
        />
      </Form.Item>
    </Form>
  )

  const emptyInput = (
    <Form>
      <Form.Item validateStatus={''} help={''}>
        <Input
          onChange={e => handleInput(e)}
          placeholder="Protik Sarkar"
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
    name: state.name
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setName: (value: any) => dispatch({ type: actionTypes.SET_NAME, name: value })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NameInput)
