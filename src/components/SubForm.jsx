import React, { useState } from "react";
import Tasks from "./Tasks";

const SubForm = ({
  formData,
  onSelect,
  onSelectTask,
  titleList,
  setTitleList,
  setFormData,
}) => {

  console.log("form data in subform: ", formData);
  const [taskData, setTaskData] = useState("");

  const handleInputChange = (e) => {
    setTaskData(e.target?.value);
  };

  const handleAddTask = () => {
    if(taskData == ''){
      alert('Please enter task detail');
      return;
    }
    formData[0]?.miniTask?.push({ subTask: taskData, id: Date.now() });
    setTaskData("");
    
    // setSelectTask(getChildTask(formData[0]?.miniTask));
  };

 
  console.log("task added: ", formData,formData[0]?.miniTask, formData[0]?.title);

 

  return (
    <div className="mt-10 ml-9 mr-[65vw]">
      <div className="flex flex-row justify-between">
        <p className="text-5xl font-bold">{formData[0]?.title}</p>
        <button
          className="text-lg font-medium"
          onClick={() => onSelect(formData[0]?.id)}
        >
          Delete
        </button>
      </div>
      <p className="text-xl font-normal text-gray-400 mt-6">
        {formData[0]?.dueDate}
      </p>
      <p className="text-lg mt-7">{formData[0]?.description}</p>

      <hr className="border-2 border-zinc-300 w-[50vw] my-4 " />

      <p className="text-2xl font-bold">Tasks</p>

      <input
        type="text"
        value={taskData}
        onChange={handleInputChange}
        className="bg-zinc-300 outline-none p-2 w-[20vw] mt-4 font-medium"
      />
      <button className="ml-4 text-lg font-medium" onClick={handleAddTask}>
        Add Task
      </button>

      <Tasks
        task={formData[0]?.miniTask}
        onChildSelectTask={onSelectTask}
        titleList={titleList}
        setTitleList={setTitleList}
        formData={formData[0]}
        setFormData={setFormData}
      />
    </div>
  );
};

export default SubForm;
