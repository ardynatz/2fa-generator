import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
    type: string;
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, className, onClick, children, ...props }) => {
    let baseClasses = "px-4 py-2 font-semibold rounded";
    let typeClasses;

    switch (type) {
        case 'primary':
            typeClasses = "bg-transparent shine-effect border-2 border-slate-100 font-medium rounded-none text-base px-4 py-2 text-center text-black dark:text-white me-2 mb-2 shadow-[5px_5px_rgba(255,_255,_255,_0.8)]";
            break;
        default:
            typeClasses = "bg-blue-500 text-white hover:opacity-75 border-0";
    }

    return (
        <button className={cn(`${baseClasses} ${typeClasses}`, className)} onClick={onClick} {...props}>
            {children}
        </button>
    );
};

export default Button;