import React from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { LabelAndInput } from "./LabelAndInput";
import { FormData } from "../../types";

const Form: React.FC<{ id: string }> = ({ id }) => {
  const [formData, setFormData] = useLocalStorage<FormData>(`formData_${id}`, {
    id: id,
    name: "",
    code: "",
    account: "",
    strategy: "",
    asset: "",
    amount: 0,
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  const handleRemove = () => {
    window.localStorage.removeItem(`formData_${id}`);
    window.location.reload();
  };

  const getAutoCompleteDataList = (key: string) => {
    const dataSet = new Set<string>();
    for (let i = 0; i < window.localStorage.length; i++) {
      const storageKey = window.localStorage.key(i);
      if (storageKey) {
        const data = JSON.parse(window.localStorage.getItem(storageKey)!);
        if (data[key]) {
          dataSet.add(data[key]);
        }
      }
    }
    const dataList = Array.from(dataSet);
    dataList.sort();
    return dataList;
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", padding: "5px" }}>
      <LabelAndInput
        minWidth="40px"
        label="Account"
        type="text"
        value={formData?.account}
        onChange={handleChange}
        autoCompleteDataList={getAutoCompleteDataList("account")}
      />
      <LabelAndInput
        minWidth="200px"
        label="Name"
        type="text"
        value={formData?.name}
        onChange={handleChange}
      />
      <LabelAndInput
        minWidth="40px"
        label="Asset"
        type="text"
        value={formData?.asset}
        onChange={handleChange}
        autoCompleteDataList={getAutoCompleteDataList("asset")}
      />
      <LabelAndInput
        minWidth="40px"
        label="Code"
        type="text"
        value={formData?.code}
        onChange={handleChange}
      />
      <LabelAndInput
        minWidth="40px"
        label="Strategy"
        type="text"
        value={formData?.strategy}
        onChange={handleChange}
        autoCompleteDataList={getAutoCompleteDataList("strategy")}
      />
      <LabelAndInput
        minWidth="40px"
        label="Amount"
        type="number"
        value={formData?.amount}
        onChange={handleChange}
      />
      <LabelAndInput
        minWidth="40px"
        label="price"
        type="number"
        value={formData?.price}
        onChange={handleChange}
      />
      <div style={{ minWidth: "40px", padding: "0 5px" }}>
        <label>
          Total:<br />
          <input type="text" value=
          {formData.amount * formData.price} disabled />
        </label>
      </div>
      <div style={{ display: "flex", alignItems: "end", textWrap: "nowrap" }}>
        <button>저장</button>
        <button type="button" onClick={handleRemove}>
          삭제
        </button>
      </div>
    </form>
  );
};

export default Form;
