import { useState } from 'react';
import styled from 'styled-components';

export const ModalContainer = styled.div`
// TODO : Modal을 구현하는데 전체적으로 필요한 CSS를 구현합니다.
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBackdrop = styled.div`
 // TODO : Modal이 떴을 때의 배경을 깔아주는 CSS를 구현합니다.
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: fixed;
  z-index: 1;
`;

export const ModalBtn = styled.button`
  background-color: #4000c7;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: pointer;
`;

export const ModalView = styled.div.attrs(props => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  role: 'dialog'
}))`
// TODO : Modal창 CSS를 구현합니다.
  text-align: center;
  border-radius: 10px;
  padding: 20px;
  width: 30%;
  height: 30%;
  background-color: aliceblue;
  padding: 20px;

  & > button {
    padding: 0;
    color: black;
    font-size: 1rem;
    text-align: center;
    width: 30px;
    height: 30px;
    background-color: transparent;
    border: 1px solid #7a7a7a;
    border-radius: 50%;
    cursor: pointer;
  }

  & > p {
    font-size: 1.8rem;
    margin-top: 40px;
  }
`;

export const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const enableCapture = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <ModalContainer>
        <ModalBtn onClick={openModalHandler}>
          {isOpen ? "Opened!" : "Open Modal"}
        </ModalBtn>
        {
          isOpen && <>
                      <ModalBackdrop onClick={openModalHandler}>
                        <ModalView onClick={enableCapture}>
                          <ModalBtn onClick={openModalHandler}>x</ModalBtn>
                          <p>
                            isModal!!!
                          </p>
                        </ModalView>
                      </ModalBackdrop>
                    </>
        }
      </ModalContainer>
    </>
  );
};