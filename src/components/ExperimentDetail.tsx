import React from "react";
import ReactMarkdown from "react-markdown";
import "./ExperimentDetail.css";
import { Experiment } from "../types";

interface ExperimentDetailProps {
  experiment: Experiment;
}

const ExperimentDetail: React.FC<ExperimentDetailProps> = ({ experiment }) => {
  return (
    <div className="experiment-detail">
      <div className="experiment-header">
        <h1>{experiment.title}</h1>

        <div className="key-info">
          <div className="info-section">
            <h2>Hypothesis</h2>
            <p>{experiment.hypothesis}</p>
          </div>

          <div className="info-section">
            <h2>Key Benefits</h2>
            <ul className="benefits-list">
              {experiment.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="experiment-content">
        <h2>Experiment Details</h2>
        <div className="markdown-content">
          <ReactMarkdown>{experiment.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ExperimentDetail;
