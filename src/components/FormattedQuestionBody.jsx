import React from 'react';
import MathRenderer from './MathRenderer';
import { parseQuestionBlocks } from '../services/pdfExporter';

export default function FormattedQuestionBody({ text, customTextStyle, containerStyle }) {
  if (!text) return null;
  const blocks = parseQuestionBlocks(text);

  return (
    <div style={{ ...styles.questionBodyWrapper, ...containerStyle }}>
      {blocks.map((block, bIdx) => {
        if (block.type === 'text') {
          return (
            <div key={bIdx} style={customTextStyle || styles.questionText}>
              <MathRenderer text={block.content} />
            </div>
          );
        }
        if (block.type === 'table' && block.rows && block.rows.length > 0) {
          const headerRow = block.rows[0];
          const dataRows = block.rows.slice(1);

          return (
            <div key={bIdx} style={styles.tableCard}>
              <table style={styles.dataTable}>
                <thead>
                  <tr>
                    {headerRow.map((cell, cIdx) => (
                      <th key={cIdx} style={styles.dataTh}>
                        <MathRenderer text={cell} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataRows.map((row, rIdx) => (
                    <tr key={rIdx} style={rIdx % 2 === 1 ? { backgroundColor: '#f8fafc' } : { backgroundColor: '#ffffff' }}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} style={styles.dataTd}>
                          <MathRenderer text={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

const styles = {
  questionBodyWrapper: {
    marginBottom: '8px',
  },
  questionText: {
    fontSize: '14px',
    color: '#1e293b',
    lineHeight: '1.65',
    marginBottom: '8px',
    whiteSpace: 'pre-wrap',
  },
  tableCard: {
    margin: '14px 0 18px 0',
    overflowX: 'auto',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
    backgroundColor: '#ffffff',
  },
  dataTable: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px',
    textAlign: 'center',
    backgroundColor: '#ffffff',
  },
  dataTh: {
    backgroundColor: '#f1f5f9',
    color: '#0f172a',
    fontWeight: '700',
    padding: '10px 16px',
    border: '1px solid #cbd5e1',
    letterSpacing: '0.2px',
    fontSize: '12.5px',
    whiteSpace: 'nowrap',
  },
  dataTd: {
    padding: '9px 16px',
    border: '1px solid #e2e8f0',
    color: '#334155',
    fontSize: '13px',
    fontWeight: '500',
  },
};
