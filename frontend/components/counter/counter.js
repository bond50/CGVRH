import React from 'react';
import {useInView} from 'react-intersection-observer';
import CountUp from 'react-countup';
import {Icon} from '@iconify/react';

const Counter = ({start, end, duration, suffix, icon, title}) => {
    const [ref, inView] = useInView({
        triggerOnce: false,

    });

    return (
        <div className="col-lg-3 col-md-6" ref={ref}>
            <div className="count-box d-flex align-items-center w-100 h-100">
                <Icon icon={icon} className='icon color-blue flex-shrink-0'/>
                <div>
                    <span>
                    {inView && <CountUp
                        start={start}
                        end={end}
                        duration={duration}
                        suffix={suffix}/>}
                </span>
                    <p>{title}</p>
                </div>

            </div>
        </div>
    );
};
export default Counter
