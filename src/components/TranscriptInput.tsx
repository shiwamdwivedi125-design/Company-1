'use client';

import React, { useState } from 'react';
import styles from '@/app/page.module.css';
import sampleTranscripts from '@/data/sample-transcripts.json';

interface TranscriptInputProps {
  onAnalyze: (transcript: string, model: string) => void;
  isLoading: boolean;
}

export default function TranscriptInput({ onAnalyze, isLoading }: TranscriptInputProps) {
  const [transcript, setTranscript] = useState('');
  const [model, setModel] = useState('llama3.2'); // default model

  const handlePasteSample = (id: string) => {
    const sample = sampleTranscripts.find((t: any) => t.id === id);
    if (sample) {
      setTranscript(sample.content);
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>Input Transcript</h2>
      
      <div className={styles.sampleButtons}>
        <button className={styles.textButton} onClick={() => handlePasteSample('transcript-1')}>Load Sample 1 (Karthik)</button>
        <button className={styles.textButton} onClick={() => handlePasteSample('transcript-2')}>Load Sample 2 (Meena)</button>
        <button className={styles.textButton} onClick={() => handlePasteSample('transcript-3')}>Load Sample 3 (Anil)</button>
      </div>

      <textarea 
        className={styles.textarea}
        placeholder="Paste the supervisor feedback transcript here..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        disabled={isLoading}
      />
      
      <div className={styles.controlsRow}>
        <div className={styles.modelSelect}>
          <label htmlFor="model">Ollama Model: </label>
          <input 
            type="text" 
            id="model" 
            className={styles.input} 
            value={model} 
            onChange={(e) => setModel(e.target.value)} 
            disabled={isLoading}
          />
        </div>
        
        <button 
          className={styles.primaryButton}
          onClick={() => onAnalyze(transcript, model)}
          disabled={isLoading || transcript.trim().length === 0}
        >
          {isLoading ? 'Analyzing...' : 'Run Analysis'}
        </button>
      </div>
    </div>
  );
}
