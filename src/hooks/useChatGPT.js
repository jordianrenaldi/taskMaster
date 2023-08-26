import OpenAI from "openai";

const openai = new OpenAI({apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true});

export async function fetchChatGPT(task, duration) {
    const API_URL = 'https://api.openai.com/v1/chat/completions';
    const API_KEY = process.env.REACT_APP_OPENAI_API_KEY; // Ensure you have the API key set in your .env

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    };

    const body = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant."
            },
            {
                role: "user",
                content: `I am an ADHD person who requires help in planning tasks. Break down the task "${task}" into smaller tasks (maximum 10 sub tasks) which is expected to take ${duration}. Return in the JSON format like {"steps": [{"stepId": 1, "stepTitle": "Plan for part a", "stepDescription": "You should do plan a wknfdkwjnf", "duration": "5 minutes"}], "totalDuration": "3 hours"}`
            }
        ]
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(`Error with OpenAI API request: ${error.message}`);
        throw error;
    }
}

