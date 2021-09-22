import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const PostCardContent = ({ postData }) => {
  return (
    <div>
      {/*
        정규표현식으로 해시태그 파싱
        사용자 의도로 인해 수정 되지 않는 한 변경되지 않으므로
        해시태그의 키는 인덱스로 잡아도 될 것 같다.
      */}
      {postData.split(/(#[^\s#]+)/g).map((tag, index) => {
        if (tag.match(/(#[^\s#]+)/)) {
          return (
            <Link
              href={`/hashtag/${tag.slice(1)}`}
              prefetch={false}
              key={index}
            >
              <a>{tag}</a>
            </Link>
          );
        }
        return tag;
      })}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
