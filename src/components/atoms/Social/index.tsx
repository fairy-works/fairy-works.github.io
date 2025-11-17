import * as React from 'react';
import classNames from 'classnames';
import Link from '../Link';
import { iconMap } from '../../svgs';
import dynamic from 'next/dynamic';
import 'react-tooltip/dist/react-tooltip.css';

const Tooltip = dynamic(() => import('react-tooltip').then((mod) => mod.Tooltip), {
    ssr: false
});

export default function Social(props) {
    const { elementId, className, altText, url, icon = 'facebook', disabled = false } = props;
    const IconComponent = iconMap[icon];
    const fieldPath = props['data-sb-field-path'];
    const annotations = fieldPath
        ? { 'data-sb-field-path': [fieldPath, `${fieldPath}.url#@href`, `${fieldPath}.altText#@aria-label`, `${fieldPath}.elementId#@id`].join(' ').trim() }
        : {};
    return (
        <TooltipOnDisabled {...props}>
            <Link
                id={elementId}
                className={classNames(
                    'sb-component',
                    'sb-component-block',
                    'sb-component-social',
                    'inline-flex',
                    'items-center',
                    'justify-center',
                    'transition',
                    'duration-200',
                    'ease-in',
                    disabled ? '' : 'hover:-translate-y-1',
                    className
                )}
                disabled={disabled}
                href={url}
                aria-label={altText}
                {...annotations}
            >
                {IconComponent && <IconComponent className="shrink-0 fill-current w-[1em] h-[1em]" {...(fieldPath && { 'data-sb-field-path': '.icon' })} />}
            </Link>
        </TooltipOnDisabled>
    );
}

function TooltipOnDisabled(props) {
    const { elementId, altText, disabled, children } = props;
    if (!disabled) {
        return children;
    }
    return (
        <div id={`wrap-${elementId}`} onClick={(e) => e.preventDefault()}>
            {children}
            <Tooltip anchorSelect={`#wrap-${elementId}`} place="top">
                {altText}
            </Tooltip>
        </div>
    );
}
