import React, { useCallback, useRef, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import useInput from '../hooks/useInput';
import {
  addPost,
  ADD_POST_REQUEST,
  REMOVE_IMAGE,
  UPLOAD_IMAGES_REQUEST,
} from '../reducers/post';

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths, isAddPostDone, isAddPostLoading } = useSelector(
    state => state.post,
  );
  const [text, onChangeText, setText] = useInput('');

  useEffect(() => {
    if (isAddPostDone) {
      setText('');
    }
  }, [isAddPostDone]);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback(event => {
    const imageFormData = new FormData();
    [].forEach.call(event.target.files, file => {
      imageFormData.append('image', file);
    });

    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onRemoveImage = index => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  };

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      alert('게시글을 입력해주세요.');
      return;
    }
    const formData = new FormData();
    imagePaths.forEach(path => {
      formData.append('image', path);
    });
    formData.append('content', text);
    dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
      // data: {
      //   imagePaths,
      //   content: text,
      // },
    });
  }, [text, imagePaths]);

  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 일이 있었어?"
      />
      <div>
        <input
          type="file"
          multiple
          hidden
          ref={imageInput}
          name="image"
          onChange={onChangeImages}
        />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button
          type="primary"
          style={{ float: 'right' }}
          htmlType="submit"
          loading={isAddPostLoading}
        >
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((path, index) => (
          <div key={path} style={{ display: 'inline-block' }}>
            <img
              src={`http://localhost:3001/images/${path}`}
              style={{ width: '200px' }}
              alt={path}
            />
            <div>
              <Button onClick={onRemoveImage(index)}>삭제</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
