import React, { useState } from "react";
import moment from "moment";
import SubForm from "./SubForm";

const SideNavbar = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    id: Date.now(),
    miniTask: [],
  });
  const [titleList, setTitleList] = useState([]);
  const [filterTask, setFilterTask] = useState();
  const [showFlag, setShowFlag] = useState(undefined);


  // show Form function
  function handleClick() {
    //first empty previously added form data inorder to freshly add new form data
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      id: Date.now(),
      miniTask: [],
    });
    setShowFlag(-1);
  }

  // save Form data function
  function handleSave() {
    let formDataTemp = formData;
    if(formData.titleList == '' || formData.description == '' || formData.dueDate == ''){
      alert('Please fill all the details');
      return;
    }

    setTitleList((prevTitle) => [...prevTitle, formDataTemp]);
  
    setShowFlag(undefined);
  }
  // console.log("setted title list: ", titleList)

  function handleTitleChange(e) {
    const { name, value } = e.target;
    setFormData((prevTitle) => ({
      ...prevTitle,
      [name]: value,
    }));
  }

  function handleDescriptionChange(e) {
    const { name, value } = e.target;
    setFormData((prevDescription) => ({
      ...prevDescription,
      [name]: value,
    }));
  }

  function handleDateChange(e) {
    let date = moment(e.target.value, "YYYY-MM-DD").format("DD-MM-YYYY");
    setFormData((prevDescription) => ({
      ...prevDescription,
      dueDate: date,
    }));
  }

  function handleSubForm(index) {
    setShowFlag(1);
    const filterData = titleList.filter((item) => item.id == index);
    //this will only extract the subform data that matches the title button click index and then we will pass the filterdata setformdata to subForm component  
    setFormData(filterData);
  }

  function handleDeleteTitle(index) {
    // console.log("handle delete index: ", index);
    const filterTitleList = titleList?.filter((item) => item.id !== index);
    setTitleList(filterTitleList);
    setShowFlag(undefined);
  }


  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="bg-black w-[20vw] h-screen mt-6 rounded-r-lg p-8">
          <h1 className="text-white font-bold text-2xl mt-10">YOUR PROJECTS</h1>
          <button
            className="p-4 bg-zinc-800 text-white rounded-lg mt-10"
            onClick={() => handleClick()}
          >
            + Add Project
          </button>

          {/* ---------- Title List ---------------*/}

          <div className="flex flex-col mt-6 mr-[10vw] text-white">
            {titleList?.map((list, index) => (
              <button key={index}
                className="p-4  bg-neutral-900 text-white rounded-lg text-lg mb-2"
                onClick={() => handleSubForm(list?.id)}
              >
                {list.title}
              </button>
            ))}
          </div>
        </div>
        {/* ---------- Form ------------- */}
        {showFlag == -1 && (
          <div className="flex flex-col mt-10 mr-[20vw]">
            <button
              className="text-center p-2 bg-zinc-800 text-xl text-white rounded-lg mt-10 w-20 ml-[44.5vw]"
              onClick={() => handleSave()}
            >
              Save
            </button>{" "}
            <br />
            <div className="mt-2">
              <label>TITLE</label>
              <br />
              <input
                type="text"
                className="bg-neutral-100 w-[50vw] outline-none p-2.5 text-lg"
                onChange={handleTitleChange}
                name="title"
                value={formData.title}
              />
            </div>
            <div className="mt-4">
              <label>DESCRIPTION</label> <br />
              <textarea
                rows={4}
                className="bg-neutral-100 w-[50vw] outline-none p-2 text-lg"
                onChange={handleDescriptionChange}
                name="description"
                value={formData.description}
              />
            </div>
            <div className="mt-4">
              <label>DUE DATE</label> <br />
              <input
                type="date"
                className="bg-neutral-100 w-[50vw] outline-none p-2.5 text-lg"
                onChange={handleDateChange}
                name="dueDate"
              />
            </div>
          </div>
        )}

        {/* show sub form */}
        {showFlag > -1 && (
          <SubForm
            formData={formData}
            setFormData={setFormData}
            onSelect={handleDeleteTitle}
            titleList={titleList}
            setTitleList={setTitleList}
          />
        )}

        {/* If there is no form selected */}
        {showFlag === undefined && (
          <h2 className="text-black text-2xl mt-[40vh] mr-[32vw]">
            No Project selected yet
          </h2>
        )}
      </div>
    </>
  );
};

export default SideNavbar;
