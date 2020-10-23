import React from 'react';
import './slideViewport.css';
import { SlideType } from '../../model/model';

interface SlideViewportProps {
    slide: SlideType | undefined;
    slideWidth: string;
    slideHeight: string;
}

export default function SlideViewport(props: SlideViewportProps) {
    if (!props.slide)
        return (
            <div id="slide-viewport">
                <div
                    id="slide"
                    style={{
                        width: props.slideWidth,
                        height: props.slideHeight,
                    }}
                ></div>
            </div>
        );
    return (
        <div id="slide-viewport">
            <div
                id="slide"
                style={{ width: props.slideWidth, height: props.slideHeight }}
            >
                {props.slide.objects.map((node) => {
                    const style = {
                        position: 'absolute',
                        top: node.positionTopLeft.y + 'px',
                        left: node.positionTopLeft.x + 'px',
                    } as React.CSSProperties;

                    if (node.type === 'text') {
                        return (
                            <h1
                                key={node.id}
                                className="text-node"
                                style={style}
                            >
                                {node.data}
                            </h1>
                        );
                    }

                    if (node.type === 'figure' && node.figure === 'circle') {
                        return (
                            <svg
                                style={style}
                                key={node.id}
                                width={parseInt(node.width) + 5}
                                height={parseInt(node.height) + 5}
                            >
                                <circle
                                    cx={(parseInt(node.width) + 5) / 2}
                                    cy={(parseInt(node.height) + 5) / 2}
                                    stroke="black"
                                    r={parseInt(node.width) / 2}
                                    fill="transparent"
                                ></circle>
                            </svg>
                        );
                    }

                    if (node.type === 'figure' && node.figure === 'rectangle') {
                        return (
                            <svg
                                style={style}
                                key={node.id}
                                width={parseInt(node.width) + 5}
                                height={parseInt(node.height) + 5}
                            >
                                <rect
                                    x="2.5"
                                    y="2.5"
                                    width={parseInt(node.width)}
                                    height={parseInt(node.height)}
                                    stroke="black"
                                    fill="transparent"
                                ></rect>
                            </svg>
                        );
                    }
                    if (node.type === 'figure' && node.figure === 'triangle') {
                        return (
                            <svg
                                style={style}
                                key={node.id}
                                width={parseInt(node.width) + 5}
                                height={parseInt(node.height) + 5}
                            >
                                <polygon
                                    points={parseInt(node.width) / 2 + ',0 0,' + parseInt(node.height) + ' ' + parseInt(node.width) + ',' + parseInt(node.height)}
                                    width={parseInt(node.width)}
                                    height={parseInt(node.height)}
                                    stroke="black"
                                    fill="transparent"
                                ></polygon>
                            </svg>
                        );
                    }
                })}
            </div>
        </div>
    );
}
