import React, { useState, useEffect } from "react";
import Form from "./components/form/Form";
import { FormData } from "./types";
import { MyTreeMap } from "./components/treemap/MyTreeMap";

const App: React.FC = () => {
  const [formDataList, setFormDataList] = useState<FormData[]>([]);

  useEffect(() => {
    setFormDataList(getFormDataList());
  }, []);

  const getFormDataList = () => {
    const formDataList = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith("formData_")) {
        const formData = JSON.parse(window.localStorage.getItem(key)!);
        formDataList.push(formData);
      }
    }
    formDataList.sort((a, b) => a.id - b.id);
    return formDataList;
  };

  const handleAddData = () => {
    const id = Date.now().toString();
    const newFormData = {
      id,
      name: "",
      code: "",
      account: "",
      strategy: "",
      asset: "",
      price: 0,
      amount: 0,
    };
    window.localStorage.setItem(`formData_${id}`, JSON.stringify(newFormData));
    setFormDataList([...formDataList, newFormData]);
  };

  const getTreemapData = (key: keyof FormData) => {
    const treemapData: { name: string; size: number }[] = [];
    for (const formData of formDataList) {
      const data = treemapData.find((data) => data.name === formData[key]);
      if (data) {
        data.size += formData.amount * formData.price;
      } else {
        treemapData.push({
          name: formData[key].toString(),
          size: formData.amount * formData.price,
        });
      }
    }
    return treemapData;
  };

  return (
    <div className="App">
      <h1>자산 현황</h1>
      <p>{"합계 : ₩" + getFormDataList().reduce((acc, cur) => acc + cur.price * cur.amount, 0)
          .toLocaleString('ko-KR').split(".")[0]}</p>
      <button onClick={handleAddData}>추가</button>
      {formDataList.map((formData) => (
        <Form key={formData.id} id={formData.id} />
      ))}
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ width: "30vw" }}>
          <h2>자산 현황</h2>
          <h3>Account</h3>
          <MyTreeMap data={getTreemapData("account")} color="#82ca9d" />
        </div>
        <div style={{ width: "30vw" }}>
          <h2>자산 분포</h2>
          <h3>Asset</h3>
          <MyTreeMap data={getTreemapData("asset")} color="#8884d8" />
        </div>
        <div style={{ width: "30vw" }}>
          <h2>자산 현황</h2>
          <h3>Strategy</h3>
          <MyTreeMap data={getTreemapData("strategy")} color="#ffc658" />
        </div>
      </div>
    </div>
  );
};

export default App;
