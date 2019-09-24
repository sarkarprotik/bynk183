import React, { useState } from 'react'
import { Upload, Icon, message } from 'antd'

import { connect } from 'react-redux'

import * as actionTypes from '../Redux/actions'

const getBase64 = (img: any, callback: any) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const AvatarInput = (props: any) => {
  const { setImage } = props
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setImageUrl(imageUrl)
        setImage(imageUrl)
        setLoading(false)
      })
    }
  }

  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  )

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  )
}

const mapStateToProps = (state: any) => {
  return {
    ...state,
    image: state.image
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setImage: (value: any) => dispatch({ type: actionTypes.SET_IMAGE, image: value })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvatarInput)
