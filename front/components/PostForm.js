import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { addPost } from '../reducers/post';

const PostForm = () => {
	const dispatch = useDispatch();
	const { imagePaths, isAddPostDone } = useSelector(state => state.post);
	const [text, onChangeText, setText] = useState('');

	useEffect(() => {
		if (isAddPostDone) {
			setText('');
		}
	}, [isAddPostDone]);

	const imageInput = useRef();
	const onClickImageUpload = useCallback(() => {
		imageInput.current.click();
	}, [imageInput.current]);

	const onSubmit = useCallback(() => {
		dispatch(addPost(text));
	}, [text]);

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
				<input type="file" multiple hidden ref={imageInput} />
				<Button onClick={onClickImageUpload}>이미지 업로드</Button>
				<Button type="primary" style={{ float: 'right' }} htmlType="submit">
					짹짹
				</Button>
			</div>
			<div>
				{imagePaths.map(path => (
					<div key={path} style={{ display: 'inline-block' }}>
						<img src={path} style={{ width: '200px' }} alt={path} />
						<div>
							<Button>삭제</Button>
						</div>
					</div>
				))}
			</div>
		</Form>
	);
};

export default PostForm;
