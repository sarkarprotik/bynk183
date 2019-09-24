import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionTypes from '../Redux/actions'
import { Form, Select } from 'antd'
import * as ls from 'local-storage'

const { Option } = Select

const CountryInput = (props: any) => {
  const [value, setValue] = useState([])

  const { setCountry } = props

  const [tempValue, setTempValue] = useState(() => (ls.get('country') ? ls.get('country') : ''))

  // ls.set('country', tempValue)

  const request = async () => {
    const response = await fetch('https://restcountries.eu/rest/v2/all')
    const json = await response.json()
    let countryList = json.map((c: any) => c.name)
    setValue(countryList)
  }

  useEffect(() => {
    request()
  }, [])

  const handleChange = (e: any) => {
    console.log('this is the only country', e)
    setTempValue(e)
    setCountry(e)
  }

  const emptyInput = (
    <Form>
      <Form.Item validateStatus={''} help={''}>
        <Select defaultValue={tempValue} onChange={handleChange} placeholder="Select a Country">
          {value.map((country: any) => {
            return (
              <Option key={country} value={country}>
                {country}
              </Option>
            )
          })}
        </Select>
      </Form.Item>
    </Form>
  )

  const success = (
    <Form>
      <Form.Item validateStatus={'success'} hasFeedback help={''}>
        <Select defaultValue={tempValue} onChange={handleChange} placeholder="Select a Country">
          {value.map((country: any) => {
            return (
              <Option key={country} value={country}>
                {country}
              </Option>
            )
          })}
        </Select>
      </Form.Item>
    </Form>
  )

  return tempValue ? success : emptyInput
}

const mapStateToProps = (state: any) => {
  return {
    ...state,
    country: state.country
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setCountry: (value: any) => dispatch({ type: actionTypes.SET_COUNTRY, country: value })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryInput)
