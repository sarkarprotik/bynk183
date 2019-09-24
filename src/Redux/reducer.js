import * as actionTypes from './actions'

const initialState = {
  name: '',
  ssn: '',
  mobile: '',
  email: '',
  country: '',
  image: '',
  clearForm: false,
  data: [
    {
      id: '782323',
      key: '12390478s239084',
      avatar: 'Avatar',
      name: 'Protik Sarkar',
      ssn: '8803176280',
      mobile: '0700519493',
      email: 'sarkar.protik1@gmail.com',
      country: 'Sweden',
      action: 'Delete'
    }
  ]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_IMAGE:
      return {
        ...state,
        image: action.image
      }

    case actionTypes.SET_NAME:
      return {
        ...state,
        name: action.name
      }

    case actionTypes.SET_SSN:
      return {
        ...state,
        ssn: action.ssn
      }

    case actionTypes.SET_MOBILE:
      return {
        ...state,
        mobile: action.mobile
      }

    case actionTypes.SET_EMAIL:
      return {
        ...state,
        email: action.email
      }

    case actionTypes.SET_COUNTRY:
      return {
        ...state,
        country: action.country
      }

    case actionTypes.DELETE_USER:
      let updatedData = state.data.filter(result => result.id !== action.id)
      return {
        ...state,
        data: updatedData
      }

    case actionTypes.ADD_USER:
      return {
        ...state,
        data: [...state.data, action.addUser]
      }
    case actionTypes.CLEAR_FORM:
      return {
        ...state,
        country: action.clearForm
      }
    default:
      return state
  }
}

export default reducer
