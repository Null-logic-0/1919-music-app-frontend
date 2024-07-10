import styles from './Input.module.scss'

type Props = {
    className?:String;
    disabled?:boolean;
    onChange?:() => void;
    mode?:'natural' | 'Success' 
    
}

const Input = ({className,disabled,onChange,mode}:Props)=>{

    const input =[styles.input];
    if(mode === 'natural')input.push(styles.natural)
        else if(mode === 'Success') input.push(styles.success)
        else if(disabled) input.push(styles.disabled)



    return(
        <div>
            <p>Username or Email</p>
            <input type="text"  /*disabled*/ className={input.join(' ').trim()}/>
        </div>
    )
}

export default Input;