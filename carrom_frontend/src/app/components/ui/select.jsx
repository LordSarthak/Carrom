"use client";
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from "lucide-react";
import { cn } from "./utils";

function Select(props) {
    return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup(props) {
    return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue(props) {
    return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({ className, size = "default", children, ...props }) {
    return (
        <SelectPrimitive.Trigger
            data-slot="select-trigger"
            data-size={size}
            className={cn(
                "border-input flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm",
                className
            )}
            {...props}
        >
            {children}
            <SelectPrimitive.Icon asChild>
                <ChevronDownIcon className="size-4 opacity-50" />
            </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
    );
}

function SelectContent({ className, children, position = "popper", ...props }) {
    return (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Content
                data-slot="select-content"
                className={cn(
                    "bg-popover text-popover-foreground z-50 rounded-md border shadow-md",
                    className
                )}
                position={position}
                {...props}
            >
                <SelectScrollUpButton />
                <SelectPrimitive.Viewport className="p-1">
                    {children}
                </SelectPrimitive.Viewport>
                <SelectScrollDownButton />
            </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
    );
}

function SelectItem({ className, children, ...props }) {
    return (
        <SelectPrimitive.Item
            data-slot="select-item"
            className={cn(
                "flex items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm",
                className
            )}
            {...props}
        >
            <span className="absolute right-2 flex size-3.5 items-center justify-center">
                <SelectPrimitive.ItemIndicator>
                    <CheckIcon className="size-4" />
                </SelectPrimitive.ItemIndicator>
            </span>
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
    );
}

function SelectScrollUpButton(props) {
    return (
        <SelectPrimitive.ScrollUpButton {...props}>
            <ChevronUpIcon className="size-4" />
        </SelectPrimitive.ScrollUpButton>
    );
}

function SelectScrollDownButton(props) {
    return (
        <SelectPrimitive.ScrollDownButton {...props}>
            <ChevronDownIcon className="size-4" />
        </SelectPrimitive.ScrollDownButton>
    );
}

export {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectTrigger,
    SelectValue,
};