'use client';

import React from 'react';
import styles from '@/app/page.module.css';

interface AnalysisReportProps {
  data: any;
}

export default function AnalysisReport({ data }: AnalysisReportProps) {
  if (!data) return null;

  return (
    <div className={styles.reportContainer}>
      <div className={styles.reportHeader}>
        <div className={styles.scoreBadge} data-band={data.score?.band}>
          <div className={styles.scoreValue}>{data.score?.value}</div>
          <div className={styles.scoreLabel}>{data.score?.label}</div>
        </div>
        <div className={styles.justification}>
          <h3>Score Justification</h3>
          <p>{data.score?.justification}</p>
          <div className={styles.confidence}>Confidence: <strong>{data.score?.confidence}</strong></div>
        </div>
      </div>

      <div className={styles.grid}>
        <section className={styles.section}>
          <h3>Extracted Evidence</h3>
          <div className={styles.evidenceList}>
            {data.evidence?.map((item: any, idx: number) => (
              <div key={idx} className={styles.evidenceCard} data-signal={item.signal}>
                <p className={styles.quote}>"{item.quote}"</p>
                <div className={styles.evidenceMeta}>
                  <span className={styles.badge}>{item.dimension}</span>
                  <span className={styles.badge} data-signal={item.signal}>{item.signal}</span>
                </div>
                <p className={styles.interpretation}>{item.interpretation}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h3>KPI Mapping</h3>
          <div className={styles.kpiList}>
            {data.kpiMapping?.length > 0 ? (
              data.kpiMapping.map((kpi: any, idx: number) => (
                <div key={idx} className={styles.kpiCard}>
                  <div className={styles.kpiHeader}>
                    <strong>{kpi.kpi}</strong>
                    <span className={styles.badge} data-type={kpi.systemOrPersonal}>{kpi.systemOrPersonal}</span>
                  </div>
                  <p>{kpi.evidence}</p>
                </div>
              ))
            ) : (
              <p className={styles.emptyMsg}>No direct KPI impact mentioned.</p>
            )}
          </div>
        </section>
      </div>

      <div className={styles.grid}>
        <section className={styles.section}>
          <h3>Gap Analysis</h3>
          <div className={styles.gapList}>
            {data.gaps?.map((gap: any, idx: number) => (
              <div key={idx} className={styles.gapCard}>
                <strong>{gap.dimension}</strong>
                <p>{gap.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h3>Follow-up Questions</h3>
          <div className={styles.questionList}>
            {data.followUpQuestions?.map((q: any, idx: number) => (
              <div key={idx} className={styles.questionCard}>
                <p className={styles.questionText}>Q: {q.question}</p>
                <div className={styles.questionMeta}>
                  <span>Target: {q.targetGap}</span>
                  <span>Look for: {q.lookingFor}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
