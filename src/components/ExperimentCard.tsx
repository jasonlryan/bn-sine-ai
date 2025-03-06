import React from "react";
import { Link } from "react-router-dom";
import "./ExperimentCard.css";

interface ExperimentCardProps {
  id: string;
  title: string;
  hypothesis: string;
  benefits: string[];
}

const ExperimentCard: React.FC<ExperimentCardProps> = ({
  id,
  title,
  hypothesis,
  benefits,
}) => {
  // Extract just the key benefit terms
  const extractKeyTerms = (benefits: string[]) => {
    return benefits.map((benefit) => {
      // Extract just the part before the colon if it exists
      const parts = benefit.split(":");
      if (parts.length > 1) {
        return parts[0].trim();
      }
      // Otherwise take just the first few words
      const words = benefit.split(" ");
      return words.slice(0, 3).join(" ");
    });
  };

  // Generate a background color based on the experiment ID
  const getBackgroundColor = (id: string) => {
    // Simple hash function to generate a consistent color for each ID
    const hash = id
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 25%)`;
  };

  const keyTerms = extractKeyTerms(benefits);
  const bgColor = getBackgroundColor(id);

  return (
    <div className="experiment-card">
      <div className="card-image-overlay" style={{ backgroundColor: bgColor }}>
        <div className="card-image"></div>
      </div>

      <h2 className="card-title">{title}</h2>

      <div className="card-content">
        <div className="benefit-tags">
          {keyTerms.slice(0, 3).map((term, index) => (
            <li key={index} className="benefit-tag">
              {term}
            </li>
          ))}
        </div>
      </div>

      <Link to={`/experiment/${id}`} className="view-button">
        View Experiment
      </Link>
    </div>
  );
};

export default ExperimentCard;
