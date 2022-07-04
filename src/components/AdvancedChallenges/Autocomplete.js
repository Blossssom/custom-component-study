import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const deselectedOptions = [
  'rustic',
  'antique',
  'vinyl',
  'vintage',
  'refurbished',
  '신품',
  '빈티지',
  '중고A급',
  '중고B급',
  '골동품'
];

/* TODO : 아래 CSS를 자유롭게 수정하세요. */
const boxShadow = '0 4px 6px rgb(32 33 36 / 28%)';
const activeBorderRadius = '1rem 1rem 0 0';
const inactiveBorderRadius = '1rem 1rem 1rem 1rem';

export const InputContainer = styled.div`
  margin-top: 8rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  border: 1px solid rgb(223, 225, 229);
  border-radius: ${props => console.log(props)}  
  // ${inactiveBorderRadius};
  z-index: 3;
  box-shadow: 0;

  &:focus-within {
    box-shadow: ${boxShadow};
  }

  > input {
    flex: 1 0 0;
    background-color: transparent;
    border: none;
    margin: 0;
    padding: 0;
    outline: none;
    font-size: 16px;
  }

  > div.delete-button {
    cursor: pointer;
  }
`;

export const DropDownContainer = styled.ul`
  background-color: #ffffff;
  display: block;
  margin-left: auto;
  margin-right: auto;
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
  margin-top: -1px;
  padding: 0.5rem 0;
  border: 1px solid rgb(223, 225, 229);
  border-radius: 0 0 1rem 1rem;
  box-shadow: ${boxShadow};
  z-index: 3;

  > li {
    padding: 0 1rem;
    cursor: pointer;
  }

  .hover {
    background-color: #ededed;
  }
`;

export const Autocomplete = () => {
  /**
   * Autocomplete 컴포넌트는 아래 3가지 state가 존재합니다. 필요에 따라서 state를 더 만들 수도 있습니다.
   * - hasText state는 input값의 유무를 확인할 수 있습니다.
   * - inputValue state는 input값의 상태를 확인할 수 있습니다.
   * - options state는 input값을 포함하는 autocomplete 추천 항목 리스트를 확인할 수 있습니다.
   */
  const [hasText, setHasText] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(deselectedOptions);
  const [keyMenu, setKeyMenu] = useState('');
  const [refIndex, setRefIndex] = useState(-1);

  // const [isDropClick, setIsDropClick] = useState(false);

  
  useEffect(() => {
    if (inputValue === '') {
      setHasText(false);
    }else {
      setHasText(true);
      const dropMenu = deselectedOptions.filter((v) => v.toLowerCase().includes(inputValue) || v.toUpperCase().includes(inputValue));
      if(dropMenu.length > 0) {
        setOptions(dropMenu);
      }else {
        setOptions([]);
      }
    }
  }, [inputValue]);
  // TODO : input과 dropdown 상태 관리를 위한 handler가 있어야 합니다.
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    // setIsDropClick(false);
  };

  const handleDropDownClick = (clickedOption) => {
    setInputValue(clickedOption.target.textContent);
    // setIsDropClick(true);
  };

  const handleDeleteButtonClick = () => {
    setInputValue('');
  };

  const handleOnKey = (e) => {
    if(keyMenu !== '') {
      if(e.code === "ArrowDown" && options.length > 0) {
        if(refIndex === keyMenu.children.length - 1) {
          setRefIndex(0);
        }else {
          setRefIndex(refIndex + 1);
        }
      }
    
      if(e.code === 'Enter') {
        setInputValue(keyMenu.children[refIndex].textContent);
      }
    }
    
    // ArrowUp
    // ArrowDown
    // Enter
  };

  

  // Advanced Challenge: 상하 화살표 키 입력 시 dropdown 항목을 선택하고, Enter 키 입력 시 input값을 선택된 dropdown 항목의 값으로 변경하는 handleKeyUp 함수를 만들고,
  // 적절한 컴포넌트에 onKeyUp 핸들러를 할당합니다. state가 추가로 필요한지 고민하고, 필요 시 state를 추가하여 제작하세요.

  return (
    <div className='autocomplete-wrapper'>
      <InputContainer>
        <input type='text' onKeyUp={handleOnKey} onChange={handleInputChange} value={inputValue} />
        {/* TODO : 아래 div.delete-button 버튼을 누르면 input 값이 삭제되어 dropdown이 없어지는 handler 함수를 작성합니다. */}
        <div className='delete-button' onClick={handleDeleteButtonClick}>&times;</div>
      </InputContainer>
      {
        hasText && <DropDown setHoverIndex={setRefIndex} hoverIndex={refIndex} getKey={setKeyMenu} options={options} handleComboBox={handleDropDownClick} />
      }
    </div>
  );
};

export const DropDown = ({ options, handleComboBox, getKey, hoverIndex, setHoverIndex }) => {
  const getFocus = useRef(null);

  const handleHoverEvent = (e) => {
    setHoverIndex(options.indexOf(e.target.textContent));
    if(e.target.className !== 'hover') {
      e.target.className = 'hover';
    }
  };

  const handleOutEvent = (e) => {
    e.target.className = '';
  };
  
  useEffect(() => {
    getKey(getFocus.current);
  }, [options, getKey]);

  return (
    <DropDownContainer ref={getFocus}>
      {
        options.map(v => <li onMouseOver={handleHoverEvent} onMouseOut={handleOutEvent} className={(hoverIndex === options.indexOf(v))
                                            ? 'hover' 
                                            : ''}
                                            key={options.indexOf(v)} onClick={handleComboBox}>{v}</li>)
      }
    </DropDownContainer>
  );
};