import React, {ChangeEvent, useState} from 'react';

interface HeadingProps {
    text: string;
}
export function Heading({ text }: HeadingProps) {
    return (
        <h1 className="mb-3 text-3xl font-bold">{text}</h1>
    );
}

interface SubheadingProps {
    text: string;
}
export function Subheading({ text }: SubheadingProps) {
    return (
        <h3 className="mb-2 font-bold text-lg">{text}</h3>
    );
}

interface WhisperProps {
    text: string;
    negativeTopMargin?: boolean;
}
export function Whisper({ text, negativeTopMargin = false}: WhisperProps) {
    return (
        <p className={`${negativeTopMargin ? "-mt-4" : ""} text-sm font-mono text-gray-700/60`}>
            {text}
        </p>
    )
}

interface LabelProps {
    text: string;
    required?: boolean;
}
export function Label({ text, required }: LabelProps) {
    return (
        <label className={`${required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}
                          mb-1 font-semibold block`}>
            {text}
        </label> 
    );
}

interface ButtonProps {
    text: string;
    level?: "default"|"success"|"danger";
    right?: boolean;
    submit?: boolean;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>|null;
}
export function Button({ text, 
                         level = "default",
                         right = false,
                         submit = false, 
                         disabled = false,
                         onClick = null }: ButtonProps) {
    var colors = "";
    switch(level) {
        case "success":
            colors = "bg-green-500 text-white enabled:hover:bg-green-400";
            break;
        case "danger":
            colors = "bg-red-500 text-white enabled:hover:bg-red-400";
            break;
        case "default":
        default:
            colors = "bg-white text-black border border-gray-300 enabled:hover:bg-gray-100";
    };

    return (
        <button type={submit ? "submit": "button"}
                className={`py-1 px-2 my-1 mr-1 rounded-md cursor-pointer ${colors}
                            disabled:opacity-60 disabled:cursor-not-allowed
                            ${right ? "float-right" : ""}`}
                disabled={disabled}
                onClick={onClick ? onClick : () => {}}>
            {text}
        </button>
    );
}

interface InputProps {
    type: "text"|"password"|"number"|"date"|"time"|"file";
    name?: string;
    defaultValue?: string;
    maxLength?: number;
    onChange?: ((event: ChangeEvent<HTMLInputElement>) => any)|null;
    required?: boolean;
    placeholder?: string;
}
export function Input({ type, 
                        name, 
                        defaultValue,
                        maxLength, 
                        onChange = null, 
                        required = false, 
                        placeholder}: InputProps) {
    return (
        <input  className={`${type == "text" || type == "password" ? "w-full" : ""} px-1 mb-4 bg-white rounded-none outline-none font-mono box-border 
                            placeholder:italic border-b-2 border-gray-200 focus:border-primary-400`}
                type={type}
                accept={type == "file" ? ".csv,.db" : undefined}
                name={name} 
                defaultValue={defaultValue}
                maxLength={maxLength}
                min={type == "number" ? 0 : undefined}
                onChange={onChange ? onChange : () => {}}
                required={required}
                placeholder={placeholder}/>
    );
}

interface TextAreaProps {
    name?: string;
    defaultValue?: string;
    placeholder?: string;
    maxLength?: number;
}
export function TextArea ({ name,
                            defaultValue,
                            placeholder,
                            maxLength }: TextAreaProps) {
    return (
        <textarea rows={5} 
                  className="w-full px-1 mb-4 bg-white rounded-none outline-none font-mono box-border
                             border-2 border-gray-200 focus:border-primary-400"
                  name={name}
                  defaultValue={defaultValue}
                  placeholder={placeholder}
                  maxLength={maxLength} >
        </textarea>
    );
}

interface CheckboxProps {
    name?: string;
    checked?: boolean;
    onChange?: ((event: ChangeEvent<HTMLInputElement>) => any)|null;
}
export function Checkbox({ checked, name, onChange }: CheckboxProps) {
    return (
        <input  className="ml-5 bg-white rounded-none outline-none box-border border-2 border-gray-200 hover:border-primary-400"
                type="checkbox"
                name={name} 
                onChange={onChange ? onChange : () => {}}
                checked={checked} />
    )
}

interface OptionProps {
    text: string;
    value?: string;
}
function Option({text, value}: OptionProps) {
    return (
        <option className=""
                value={value}>
            {text}
        </option>
    );
}

interface SelectProps {
    name?: string;
    options: OptionProps[];
}
export function Select({name, options}: SelectProps) {
    return (
        <select className="px-1 py-0.5 mb-4 bg-white rounded-none outline-none font-mono bg-white box-border 
                border-b-2 border-gray-200 focus:border-primary-400"
                name={name}>
            { options.map((option) => (
                <Option text={option.text} value={option.value}/>  
            ))} 
        </select>
    );
}

interface DialogProps {
    title: string;
    buttonLevel?: "default"|"success"|"danger";
    formBody: any; // ?
    onSubmit: React.FormEventHandler<HTMLFormElement>;
}
export function Dialog({ title, buttonLevel = "default", formBody, onSubmit }: DialogProps) {
    const modalId = Math.random().toString(36).slice(2, 10); // to support multiple modals in one page

    const openModal = () => {
        const modalElement = document.getElementById(modalId) as HTMLDialogElement;
        modalElement.showModal();
    }

    const closeModal = () => {
        const modalElement = document.getElementById(modalId) as HTMLDialogElement;
        modalElement.close();
    }

    const handleSubmit = (event) => {
        closeModal();
        event.preventDefault();
        onSubmit(event);
    }

    return (
    <>
            <Button text={title} onClick={openModal} level={buttonLevel}/>

            <dialog id={modalId} className="md:w-2/3 max-md:w-4/5 rounded-md">
            <form className="flex flex-col" onSubmit={handleSubmit}>
                
                <div className="pl-5 pt-2 border-b border-b-gray-400">
                    <Subheading text={title} />
                </div>

                <div className="p-5">
                    {formBody}
                </div>

                <div className="px-5 py-2 border-t border-t-gray-400">
                    <Button text="Cancel"
                            onClick={closeModal} />
                    <Button text="Done" 
                            level="success"
                            right
                            submit/>
                </div>

            </form>
            </dialog>
        </>
    );
}
