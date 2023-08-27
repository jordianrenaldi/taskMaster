import React, { useState, useEffect } from "react";
import { fetchChatGPT } from "../../hooks/useChatGPT";
import { useFirestore } from "../../hooks/useFirestore";
import TaskAccordion from "../../components/TaskAccordian";
import Timer from "../../components/Timer";

export default function TaskForm({ uid }) {
  const { addDocument, response } = useFirestore("tasks");
  const [task, setTask] = useState("");
  const [duration, setDuration] = useState("");
  const [contentJSON, setContentJSON] = useState(null);

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // addDocument({
    //   uid,
    //   name,
    //   description,
    //   duration,
    //   subtask: [],
    // });

    // Here, you'll make an API request to ChatGPT to break down the task

    console.log("FETCHING RESPONSE");
    const response = await fetchChatGPT(task, duration);
    console.log("END RESPONSE");
    const content = response.choices[0].message.content;
    const JSONContent = JSON.parse(content);
    console.log(JSONContent);
    setContentJSON(JSONContent);
  };

  // reset the form fields
  useEffect(() => {
    if (response.success) {
      setTask("");
      setDuration("");
    }
  }, [response.success]);

  return (
    <>
      <h3>Add a Task</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Task name:</span>
          <input
            type="text"
            required
            value={task}
            onChange={handleTaskChange}
          />
        </label>
        <label>
          <span>Duration (e.g. 5hrs 30mins):</span>
          <input
            type="text"
            required
            value={duration}
            onChange={handleDurationChange}
          />
        </label>
        <button type="submit">Break Down Task</button>
      </form>

      {contentJSON === null ? null : <div><TaskAccordion subTasks={contentJSON} maintask={task}/><Timer totalDuration={parseInt(contentJSON.totalDuration, 10)}/></div>}
    </>
  );
}
