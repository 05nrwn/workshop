import React, { useState } from 'react';
function Counter() {
    const [count, setCount] = useState(0);
    const [step, setStep] = useState(1);
    const increment = () => {
        setCount(count + step);
    };
    const decrement = () => {
        setCount(count - step);
    };
    const reset = () => {
        setCount(0);
        setStep(1);
    };
    return (
        <div style={{
            padding: '20px',
            border: '2px solid #007bff',
            borderRadius: '8px',
            maxWidth: '300px',
            margin: '20px auto'
        }}>
            <h2>Counter: {count}</h2>
            <div style={{ margin: '10px 0' }}>
                <label>
                    Step Size:
                    <input
                        type="number"
                        value={step}
                        onChange={(e) => setStep(parseInt(e.target.value) ||
                            1)}
                        min="1"
                        max="10"
                        style={{ marginLeft: '10px', padding: '5px' }}
                    />
                </label>
            </div>
            <div style={{
                display: 'flex', gap: '10px', marginBottom:
                    '10px'
            }}>
                <button
                    onClick={decrement}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    -{step}
                </button>
                <button
                    onClick={increment}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    +{step}
                </button>
            </div>
            <button
                onClick={reset}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Reset
            </button>
        </div>
    );
}
export default Counter;
