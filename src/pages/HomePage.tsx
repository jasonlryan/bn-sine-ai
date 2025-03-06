import React, { useEffect, useState } from "react";
import ExperimentCard from "../components/ExperimentCard";
import { getExperimentSummaries } from "../services/experimentService";
import "./HomePage.css";

interface ExperimentSummary {
  id: string;
  title: string;
  hypothesis: string;
  benefits: string[];
}

const HomePage: React.FC = () => {
  const [experiments, setExperiments] = useState<ExperimentSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiments = async () => {
      try {
        const data = await getExperimentSummaries();
        setExperiments(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching experiments:", err);
        setError("Failed to load experiments. Please try again later.");
        setLoading(false);
      }
    };

    fetchExperiments();
  }, []);

  if (loading) {
    return <div className="loading">Loading experiments...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>SINE AI Experiments</h1>
        <p>
          Explore our innovative AI experiments and their potential business
          impact
        </p>
      </div>

      {experiments.length === 0 ? (
        <div className="no-experiments">No experiments found.</div>
      ) : (
        <div className="experiments-grid">
          {experiments.map((experiment) => (
            <ExperimentCard
              key={experiment.id}
              id={experiment.id}
              title={experiment.title}
              hypothesis={experiment.hypothesis}
              benefits={experiment.benefits}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
