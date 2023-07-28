import React, { useState, MouseEvent } from 'react';
import './SpinButton.css';

interface SpinButtonProps {
  label: string;
}

const SpinButton = ({ label }: SpinButtonProps) => {
  const [count, setCount] = useState<number>(0);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [ariaMsg, setAriaMsg] = useState<string>('');

  const increment = () => {
    if (count >= 3) return;
    setCount((prevCount) => prevCount + 1);
    setAriaMsg(`${label} 승객 추가 ${count + 1}`);
  };

  const decrement = () => {
    if (count <= 0) return;
    setCount((prevCount) => prevCount - 1);
    setAriaMsg(`${label} 승객 감소 ${count - 1}`);
  };

  const toggleTooltip = (event: MouseEvent<HTMLDivElement>) => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  return (
    <section className='spinButtonContainer'>
      <div>
        <div className='spinButtonLabel'>
          <label>{label}</label>
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
          aria-label={`${label} 탑승자 한명 줄이기 버튼`}
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
          aria-valuemax={3}
          id='passenger_input'
          aria-label={`${label} ${count} 텍스트 숫자만 수정`}
        />
        <button
          onClick={increment}
          className='spinButton'
          aria-label={`${label} 탑승자 한명 늘리기 버튼`}
        >
          +
        </button>
      </div>
      <p className='hidden' aria-live='assertive' aria-relevant='text'>
        {ariaMsg}
      </p>
    </section>
  );
};

export default SpinButton;
