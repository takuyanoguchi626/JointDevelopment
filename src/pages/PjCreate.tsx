import React, { useState } from "react";

export const PjCreate = () => {
  const [memberList, setMemberList] = useState<Array<string | undefined>>([]);
  const [memberName, setMemberName] = useState<string>("");

  const addMember = () => {
    setMemberList((memberList) => [...memberList, memberName]);
    setMemberName("");
  };

  return (
    <div>
      <h1>プロジェクト作成</h1>
      <div>
        チーム名：
        <input type="text" />
      </div>
      <div>
        チームメンバー：
        <input
          type="text"
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
        />
        <button onClick={() => addMember()}>追加</button>
        <ul>
          {memberList.map((memberName, index) => {
            return <li key={index}>{memberName}</li>;
          })}
        </ul>
      </div>
      <div>
        <button>プロジェクト作成</button>
      </div>
    </div>
  );
};
