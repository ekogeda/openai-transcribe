// transcribeComposable.js

import { ref } from 'vue';
import axios from 'axios';

export function useTranscribe() {
	const transcriptResult = ref(null);
	const errorTranscribing = ref(null);

	async function transcribe(file) {
		try {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('model', 'whisper-1');

			const transcription = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
				},
			});

			errorTranscribing.value = null;
			transcriptResult.value = transcription.data.text;
		} catch (error) {
			console.error('Error transcribing audio:', error.response.data.error.message);
			transcriptResult.value = null;
			errorTranscribing.value = error.response.data.error.message;
		}
	}

	return { transcriptResult, transcribe, errorTranscribing };
}
