import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
// import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { createServerFn } from '@tanstack/start';
import { useState } from 'react';

const generateResponse = createServerFn({ method: 'POST' })
    .handler(async () => {
        const result = streamText({
            model: openai('gpt-3.5-turbo'),
            maxTokens: 512,
            temperature: 0.3,
            maxRetries: 5,
            prompt: 'Invent a new holiday and describe its traditions.',
        });

        const reader = result.textStream.getReader();

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            console.log(value);
        }
    })

export function Chat() {
    // const [response, setResponse] = useState('');

    return (
        <div className="border p-2">
            <h2 className="text-lg font-semibold mb-4">Chat</h2>
            <Button onClick={() => generateResponse()}>
                Generate Recipe
            </Button>
            {/* <p>{response}</p> */}
        </div>
    )
}
