import React, { useState } from 'react';
import { fetchChatGPT } from '../hooks/useChatGPT';
import TaskAccordion from './TaskAccordian';

function TaskBreaker() {
    const [task, setTask] = useState('');
    const [duration, setDuration] = useState('');
    const [contentJSON, setContentJSON]=useState(null);

    const handleTaskChange = (e) => {
        setTask(e.target.value);
    };

    const handleDurationChange = (e) => {
        setDuration(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Here, you'll make an API request to ChatGPT to break down the task

        console.log("FETCHING RESPONSE")
        const response = await fetchChatGPT(task, duration);
        console.log("END RESPONSE")
        const content = response.choices[0].message.content;
        const JSONContent = JSON.parse(content)
        console.log(JSONContent);
        setContentJSON(JSONContent);
        
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={task} 
                    onChange={handleTaskChange} 
                    placeholder="Enter task" 
                />
                <input 
                    type="text" 
                    value={duration} 
                    onChange={handleDurationChange} 
                    placeholder="Enter duration (e.g., 5 hours)" 
                />
                <button type="submit">Break Down Task</button>
            </form>
           {contentJSON === null ? null : <TaskAccordion subTasks={contentJSON} maintask={task}/>}
        </div>
    );
}

export default TaskBreaker;
