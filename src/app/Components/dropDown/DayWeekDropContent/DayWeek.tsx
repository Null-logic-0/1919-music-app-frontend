import React, { useState } from 'react';
import styles from './DayWeek.module.scss'

type Props = {
    text?: string;
    onOptionSelected: (option: string) => void;
}

const DayWeekDRP = ({onOptionSelected}:Props) => {
    
    const [selectedOption, setSelectedOption] = useState('');

    const options = [
        { value: 'Day',   label: 'Day' },
        { value: 'Week',  label: 'Week' },
        { value: 'Month', label: 'Month' }
    ];

    const handleOptionChange = (value: string) => {
        setSelectedOption(value); 
        onOptionSelected(value);
    };

    return (
            
                <div className={styles.dropdownContent}>
                    {options.map(option => (
                        <label key={option.value} className={styles.lable}>
                            <input
                                type="radio"
                                value={option.value}
                                checked={selectedOption === option.value}
                                onClick={() => handleOptionChange(option.value)}
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            
        
    );
};

export default DayWeekDRP;
