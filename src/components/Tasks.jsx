import React, { useState } from "react";

const Tasks = ({
  task,
  
  setFormData,
  titleList,
  setTitleList,
  formData,
}) => {

  const cleariniTask = (id) => {

  console.log("after click id", id);
  console.log("title list: ", titleList);
  titleList = titleList?.map((item) => {
    if (item.id === formData.id) {
      // Filter out the clicked miniTask from the miniTask array
      const updatedMiniTask = item.miniTask.filter((task) => task.id !== id);
      return { ...item, miniTask: updatedMiniTask };
    }
    console.log({item}, {formData})
    return item;
  });
  
  

  // console.log("updatedTitleList", updatedTitleList);

  // Update the titleList state with the modified updatedTitleList
  let result = titleList.filter((element)=>element.title === formData.title); //we are compairing the title of titleList coming from parent component with the current title tab formData title, so that it does not go to first title on clearminitask and will continue on currently filtered sub task of the current title tab title    
  setTitleList(titleList);

  setFormData(result);
  console.log("after click form data: ", formData);
};


console.log("titleList",titleList)
// console.log("task",task)
  // task = task.filter(task => task == formData);
  return (
    <>
      {task?.length === 0 && (
        <p className="text-xl font-medium mt-9 p-4">
          This project dosn't have any tasks yet.
        </p>
      )}

      {task?.length > 0 && (
        <div className="bg-zinc-200 p-4 mt-9">
          {task?.map((miniTask) => {
            return (
              <div className="flex flex-row justify-between">
                <p className="text-xl font-medium">{miniTask?.subTask}</p>
                <button
                  className="text-xl font-medium"
                  onClick={() => cleariniTask(miniTask?.id)}
                >
                  Clear
                </button>
             
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Tasks;

