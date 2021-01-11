import React from 'react';
import useDragResize from './useDragResize';
import styles from './Object.module.css';
import { AppType, FigureObject, NodeType } from '../../../model/model';
import { resizeNode, changeSelectedObject, moveItem } from '../../../actions/actionsCreators';
import { connect } from 'react-redux';

interface TriangProps {
    node: FigureObject;
    style: React.CSSProperties;
    kWidth: number;
    kHeight: number;
    choosed: boolean;
    onclick: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
    resizeNode: (width: string, height: string) => void;
    changeSelectedObject: (id: string, type: NodeType) => void;
    moveItem: (x: number, y: number) => void;
}

function Triangle(props: TriangProps) {
    const el = React.useRef<HTMLDivElement>(null);
    const resizeIconRef = React.useRef<SVGSVGElement>(null);

    const refs = useDragResize({
        obj: el,
        resizeIcon: resizeIconRef,
        x: props.node.positionTopLeft.x,
        y: props.node.positionTopLeft.y,
        kWidth: props.kWidth,
        kHeight: props.kHeight,
        id: props.node.id,
        choosed: props.choosed,
        width: props.node.width,
        height: props.node.height,
        squareResize: false,
        type: 'figure',
        resizeNode: props.resizeNode,
        changeSelectedObject: props.changeSelectedObject,
        moveItem: props.moveItem
    });

    let style = props.style;
    if (props.kWidth !== 1) {
        style = {
            ...style,
            border: 0
        }
    }

    const sizeRef = refs.sizeRef;
    const width =
        (parseInt(sizeRef.current.width) + props.node.strokeWidth * 2) /
        props.kWidth;
    const height =
        (parseInt(sizeRef.current.height) + props.node.strokeWidth * 2) /
        props.kHeight;

    return (
        <div ref={el} className={styles.paddedObjectBlock} style={style}>
            <svg
                ref={resizeIconRef}
                className={styles.resizeIcon}
                width={11}
                height={11}
                style={
                    props.choosed ? { display: 'block' } : { display: 'none' }
                }
            >
                <circle
                    cx={5.5}
                    cy={5.5}
                    stroke="#000"
                    r={5}
                    fill="#000"
                ></circle>
            </svg>
            <svg
                style={{ overflow: 'visible' }}
                key={props.node.id}
                width={width}
                height={height}
                onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
                    props.onclick(e);
                }}
            >
                <polygon
                    strokeLinecap={'round'}
                    points={
                        parseInt(
                            sizeRef.current.width + props.node.strokeWidth
                        ) /
                            (2 * props.kWidth) +
                        ',0 0,' +
                        parseInt(
                            sizeRef.current.height + props.node.strokeWidth
                        ) /
                            props.kHeight +
                        ' ' +
                        parseInt(
                            sizeRef.current.width + props.node.strokeWidth
                        ) /
                            props.kWidth +
                        ',' +
                        parseInt(
                            sizeRef.current.height + props.node.strokeWidth
                        ) /
                            props.kHeight
                    }
                    strokeLinejoin={'round'}
                    width={parseInt(sizeRef.current.width) / props.kWidth}
                    height={parseInt(sizeRef.current.height) / props.kHeight}
                    stroke={props.node.strokeColor}
                    strokeWidth={props.node.strokeWidth / props.kWidth}
                    fill={
                        props.node.background
                            ? props.node.background
                            : 'transparent'
                    }
                ></polygon>
            </svg>
        </div>
    );
}

interface TriangOwnProps {
    node: FigureObject;
    style: React.CSSProperties;
    kWidth: number;
    kHeight: number;
    choosed: boolean;
    onclick: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

const mapStateToProps = (state: AppType, ownProps: TriangOwnProps) => {
    return ownProps;
}

const mapDispatchToProps = {
    resizeNode,
    changeSelectedObject,
    moveItem
}

export default connect(mapStateToProps, mapDispatchToProps)(Triangle);
