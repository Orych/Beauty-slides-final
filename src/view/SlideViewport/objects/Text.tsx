import React from 'react';
import useScaleResize from './useScaleResize';
import textStyles from './Text.module.css';
import objStyles from './Object.module.css';
import { dispatch } from '../../../dispatcher';
import { changeText } from '../../../methods/methods';

interface TextProps {
    id: string;
    style: React.CSSProperties;
    data: string;
    x: number;
    y: number;
    width: string;
    height: string;
    kWidth: number;
    kHeight: number;
    choosed: boolean;
    onclick: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function Text(props: TextProps) {
    const div = React.useRef<HTMLDivElement>(null);
    const resizeIconRef = React.useRef<SVGSVGElement>(null);

    const refs = useScaleResize({
        obj: div,
        resizeIcon: resizeIconRef,
        x: props.x,
        y: props.y,
        kWidth: props.kWidth,
        kHeight: props.kHeight,
        id: props.id,
        choosed: props.choosed,
        width: props.width,
        height: props.height,
        squareResize: false
    });

    const cords = refs.cordsRef;
    const size = refs.sizeRef;

    const [data, _changeData] = React.useState(props.data);
    const stateRef = React.useRef(data);
    const changeData = (text: string) => {
        stateRef.current = text;
        _changeData(text);
    }

    React.useEffect(() => {
        changeData(props.data);
    }, [props.data])

    const el = React.useRef<HTMLInputElement>(null);
    
    React.useEffect(() => {
        const change = () => {
            if (el.current) dispatch(changeText, {id: props.id, textData: el.current.value});
        };
        const secondClick = () => {
            if (el.current && stateRef.current) {
                el.current.value = stateRef.current;
                el.current.focus();
                el.current.addEventListener('change', change, {once: true});
            }
        }

        const firstClick = () => {
            if (el.current) {
                el.current.blur();
            }
        }

        if (el.current) {
            el.current.addEventListener('click', firstClick);
            el.current.addEventListener('dblclick', secondClick);
        }

        return () => {
            if (el.current) {
                el.current.removeEventListener('click', firstClick);
                el.current.removeEventListener('click', secondClick);
            }
        }
    }, [cords.current]);

    const width = parseInt(size.current.width) / props.kWidth + 'px';
    const height = parseInt(size.current.width) / props.kHeight + 'px';

    return (
        <div ref={div} className={objStyles.objectBlock} style={{width: width, height: height}}>
            <svg
                ref={resizeIconRef}
                className={objStyles.resizeIcon}
                width={11}
                height={11}
                style={
                    props.choosed ? { display: 'block' } : { display: 'none' }
                }
            >
                <circle
                    cx={5.5}
                    cy={5.5}
                    stroke="#878787"
                    r={5}
                    fill="#878787"
                ></circle>
            </svg>
            <input ref={el} className={textStyles.input} placeholder={props.data} key={props.id} style={props.style} onClick={(e: React.MouseEvent<HTMLElement>) => {
            props.onclick(e);
        }} />
        </div>
    );
}
