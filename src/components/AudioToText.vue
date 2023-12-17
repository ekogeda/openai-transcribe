<template>
	<div class="container mt-5">
		<div class="card">
			<div class="card-body">
				<h4 class="card-title text-center">Creating Transcription Using OpenAI</h4>
				<div class="row my-5">
					<div class="col-12 col-md-8 mx-auto">
						<div class="input-group mb-4">
							<input type="file" class="form-control" ref="fileInput" @change="handleFileChange" id="audioFile" />
							<label class="input-group-text" for="audioFile">Upload</label>
						</div>

						<div v-if="errorMessage" class="alert alert-danger d-flex align-items-center mb-4" role="alert">
							<Icon icon="octicon:alert-24" />&nbsp;
							<div>{{ errorMessage }}</div>
						</div>

						<button class="btn btn-primary mb-4" @click="transcribeAudio">Transcribe Audio</button>

						<div class="card">
							<div class="card-body">
								<div v-if="loading">
									<Spinner />
								</div>
								<div v-if="transcriptResult">{{ transcriptResult }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import Spinner from './BSSpinner.vue';
import { ref, onMounted } from 'vue';
import { useTranscribe } from '../composables/useAudioTranscription';

const { transcriptResult, transcribe } = useTranscribe();
const fileInput = ref(null);
const loading = ref(false);
const errorMessage = ref(null);

const handleFileChange = () => {
	const file = fileInput.value.files[0];
	// You can do additional validation on the file if needed
	// before initiating transcription.
	console.log('Selected file:', file);
};

const transcribeAudio = async () => {
	transcriptResult.value = errorMessage.value = null;

	const file = fileInput.value.files[0];
	if (file) {
		loading.value = true;
		await transcribe(file);
		loading.value = false;
	} else {
		errorMessage.value = 'No file selected';
	}
};

onMounted(() => {
	fileInput.value = document.querySelector('input[type="file"]');
});
</script>

