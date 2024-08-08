import React from 'react';

interface LabelAndInputProps {
    label: string;
    type: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    minWidth: string;
    autoCompleteDataList?: string[];
};

export const LabelAndInput: React.FC<LabelAndInputProps> = (props) => {
    return (
        <div style={{padding: "0 5px"}}>
            <label htmlFor={props.label.toLowerCase()}>
                {props.label}:<br />
                {props.autoCompleteDataList ? (
                    <>
                        <input
                            type="text"
                            list={props.label.toLowerCase() + "-list"}
                            id={props.label.toLowerCase()}
                            name={props.label.toLowerCase()}
                            style={{ minWidth: props.minWidth, width: "100%", margin: 0, padding: 0 }}
                            onChange={props.onChange}
                            value={props.value}
                            autoComplete="off"
                        />
                        <datalist id={props.label.toLowerCase() + "-list"}>
                            {props.autoCompleteDataList.map((item) => (
                                <option key={item} value={item} />
                            ))}
                        </datalist>
                    </>
                ) : (
                    <input
                        type={props.type}
                        id={props.label.toLowerCase()}
                        name={props.label.toLowerCase()}
                        style={{ minWidth: props.minWidth, width: "100%" }}
                        onChange={props.onChange}
                        value={props.value}
                        autoComplete="off"
                    />
                )}
            </label>
        </div>
    );
};