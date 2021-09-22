import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { PlusOutlined } from '@ant-design/icons';
import ImagesZoom from './ImagesZoom'

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  // 0개인 경우는 애당초 이 컴포넌트를 열지 않는다.

  // 하나인 경우 꽉 차있을 것
  if (images.length === 1) {
    return (
      <>
        <img role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    )
  }

  // 두 개인 경우 2분할
  if (images.length === 2) {
    return (
      <>
        <img role="presentation" style={{ width: '50%', display: 'inline-block' }} src={images[0].src} alt={images[0].src} onClick={onZoom} />
        <img role="presentation" style={{ width: '50%', display: 'inline-block' }} src={images[1].src} alt={images[1].src} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    )
  }

  // 세 개 이상인 경우 하나만 보여주고 나머지는 더보기로 확대해서 보도록
  return (
    <>
      <div>
        <img role="presentation" style={{ width: '50%' }} src={images[0].src} alt={images[0].src} onClick={onZoom} />
        <div
          role="presentation"
          style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  )
}

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
}

export default PostImages