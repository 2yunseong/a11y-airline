import React, { useState, MouseEvent } from 'react';
import './SpinButton.css';

const SpinButton: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [ariaMsg, setAriaMsg] = useState<string>('');
  const increment = () => {
    setCount((prevCount) => prevCount + 1);
    setAriaMsg(`성인 승객 추가 ${count}`);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
    setAriaMsg(`텍스트 숫자만 수정 ${count}`);
  };

  const toggleTooltip = (event: MouseEvent<HTMLDivElement>) => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  return (
    <section className='spinButtonContainer'>
      <div>
        <h1 aria-label='승객 선택'>승객 선택</h1>
        <div className='spinButtonLabel'>
          <label>성인</label>
          <div
            className='helpIcon'
            onMouseEnter={toggleTooltip}
            onMouseLeave={toggleTooltip}
            role='tooltip'
            aria-describedby='TIP_TEL'
          >
            ?
            {isTooltipVisible && (
              <span className='tooltip' id='TIP_TEL'>
                최대 인원수는 3명까지 가능합니다
              </span>
            )}
          </div>
        </div>
        <button
          onClick={decrement}
          className='spinButton'
          aria-label='성인 탑승자 한명 줄이기 버튼'
        >
          -
        </button>
        <input
          type='text'
          role='spinbutton'
          readOnly
          className='spinButtonInput'
          value={count}
          aria-valuenow={count}
          aria-valuemin={1}
          aria-valuemax={300}
          id='passenger_input'
        />
        <button
          onClick={increment}
          className='spinButton'
          aria-label='성인 탑승자 한명 늘리기 버튼'
        >
          +
        </button>
      </div>
      <p style={{ display: 'none' }} role='alert' aria-live='assertive'>
        {ariaMsg}
      </p>
    </section>
  );
};

export default SpinButton;
