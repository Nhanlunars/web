import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions';

const Search = () => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');

    // Khởi tạo debounce 1 lần duy nhất
  const debouncedSearch = useRef(
    _.debounce((value) => {
      dispatch(actions.searchLocationsStart(value));
    }, 500)
  ).current;

    const handleInputChange = (e) => {
        const value = e.target.value;
        setKeyword(value);
        debouncedSearch(value); // Gọi API sau 500ms khi người dùng dừng gõ
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Tìm kiếm địa điểm..."
                value={keyword}
                onChange={handleInputChange}
            />
            {/* Table hiển thị kết quả */}
        </div>
    );
};

export default Search;