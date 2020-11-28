import React from 'react';
import { SlideType } from '../../model/model';
import Text from './objects/Text';
import Circle from './objects/Circle';
import Rectangle from './objects/Rectangle';
import Triangle from './objects/Triangle';
import Img from './objects/Img';
import { dispatch } from '../../dispatcher';
import { changeSelectedObject } from '../../methods/methods';

export default function getObjects(
    slide: SlideType,
    kWidth: number,
    kHeight: number,
    selectedId: string | null
) {
    return slide.objects.map((node, index) => {
        let style = {
            position: 'absolute',
            top: node.positionTopLeft.y / kHeight + 'px',
            left: node.positionTopLeft.x / kWidth + 'px',
            border: '3px solid transparent',
        } as React.CSSProperties;
        if (selectedId && node.id === selectedId) {
            style.border = '3px dashed grey';
            style.cursor = 'move';
        }

        if (node.type === 'text') {
            style = {
                ...style,
                top: 'unset',
                left: 'unset',
                position: 'unset',
                fontSize: parseInt(node.fontSize) / kHeight + 'px',
                fontStyle: node.fontStyle,
                fontWeight: node.fontWeight,
                color: node.color
            };
            return (
                <Text
                    key={index}
                    id={node.id}
                    style={style}
                    data={node.data}
                    kWidth={kWidth}
                    kHeight={kHeight}
                    width={node.width}
                    height={node.height}
                    x={node.positionTopLeft.x}
                    y={node.positionTopLeft.y}
                    choosed={node.id === selectedId}
                    onclick={(e: React.MouseEvent<HTMLElement>) => {
                        e.preventDefault();
                        dispatch(changeSelectedObject, node.id);
                    }}
                />
            );
        }

        if (node.type === 'figure' && node.figure === 'circle') {
            return (
                <Circle
                    strokeWidth={node.strokeWidth}
                    key={index}
                    id={node.id}
                    style={style}
                    bgColor={node.background}
                    width={node.width}
                    height={node.height}
                    kWidth={kWidth}
                    kHeight={kHeight}
                    x={node.positionTopLeft.x}
                    y={node.positionTopLeft.y}
                    choosed={node.id === selectedId}
                    onclick={(
                        e: React.MouseEvent<SVGSVGElement, MouseEvent>
                    ) => {
                        e.preventDefault();
                        dispatch(changeSelectedObject, node.id);
                    }}
                />
            );
        }

        if (node.type === 'figure' && node.figure === 'rectangle') {
            return (
                <Rectangle
                    strokeWidth={node.strokeWidth}
                    key={index}
                    id={node.id}
                    style={style}
                    bgColor={node.background}
                    width={node.width}
                    height={node.height}
                    kWidth={kWidth}
                    kHeight={kHeight}
                    x={node.positionTopLeft.x}
                    y={node.positionTopLeft.y}
                    choosed={node.id === selectedId}
                    onclick={(
                        e: React.MouseEvent<SVGSVGElement, MouseEvent>
                    ) => {
                        e.preventDefault();
                        dispatch(changeSelectedObject, node.id);
                    }}
                />
            );
        }
        if (node.type === 'figure' && node.figure === 'triangle') {
            return (
                <Triangle
                    strokeWidth={node.strokeWidth}
                    key={index}
                    id={node.id}
                    style={style}
                    width={node.width}
                    height={node.height}
                    kWidth={kWidth}
                    kHeight={kHeight}
                    bgColor={node.background}
                    x={node.positionTopLeft.x}
                    y={node.positionTopLeft.y}
                    choosed={node.id === selectedId}
                    onclick={(
                        e: React.MouseEvent<SVGSVGElement, MouseEvent>
                    ) => {
                        e.preventDefault();
                        dispatch(changeSelectedObject, node.id);
                    }}
                />
            );
        }
        if (node.type === 'img') {
            style = {
                ...style,
                top: 'unset',
                left: 'unset',
                position: 'unset',
                width: '100%',
                height: '100%'
            };
            return (
                <Img
                    key={index}
                    id={node.id}
                    path={node.path}
                    kWidth={kWidth}
                    kHeight={kHeight}
                    width={node.width}
                    height={node.height}
                    x={node.positionTopLeft.x}
                    y={node.positionTopLeft.y}
                    choosed={node.id === selectedId}
                    style={style}
                    onclick={(e: React.MouseEvent<HTMLElement>) => {
                        e.preventDefault();
                        dispatch(changeSelectedObject, node.id);
                    }}
                />
            );
        }
        throw new Error('Unexpected type');
    });
}
