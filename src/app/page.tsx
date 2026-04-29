'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import TranscriptInput from '@/components/TranscriptInput';
import AnalysisReport from '@/components/AnalysisReport';

export default function Home() {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/history');
      const data = await res.json();
      if (res.ok) setHistory(data);
    } catch (err) {
      console.error('Failed to fetch history', err);
    }
  };

  const handleAnalyze = async (transcript: string, model: string) => {
    setIsLoading(true);
    setError(null);
    setAnalysisData(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript, model }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setAnalysisData(data);
      fetchHistory(); // Refresh history
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadFromHistory = (item: any) => {
    setAnalysisData(JSON.parse(item.result));
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Supervisor Feedback Analyzer</h1>
        <p className={styles.subtitle}>Trinethra Module — DeepThought</p>
      </header>

      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.mainContent}>
            <TranscriptInput onAnalyze={handleAnalyze} isLoading={isLoading} />
          </div>

          {history.length > 0 && (
            <aside className={styles.sidebar}>
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>Recent History</h2>
                <div className={styles.historyList}>
                  {history.map((item) => (
                    <div 
                      key={item.id} 
                      className={styles.historyItem}
                      onClick={() => loadFromHistory(item)}
                    >
                      <div className={styles.historyScore}>{item.score}</div>
                      <div className={styles.historyMeta}>
                        <div className={styles.historyLabel}>{item.label}</div>
                        <div className={styles.historyDate}>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>

        {isLoading && (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Analyzing transcript with Ollama... This may take 30-60 seconds.</p>
          </div>
        )}

        {error && (
          <div className={styles.errorContainer}>
            <h3>Analysis Failed</h3>
            <p>{error}</p>
            {error.includes('Failed to fetch') && (
              <p className={styles.hint}>Tip: Make sure Ollama is running locally (http://localhost:11434)</p>
            )}
          </div>
        )}

        {analysisData && <AnalysisReport data={analysisData} />}
      </div>
      
      <footer className={styles.footer}>
        <p>&copy; 2026 DeepThought. Built for Software Developer Internship.</p>
      </footer>
    </main>
  );
}
