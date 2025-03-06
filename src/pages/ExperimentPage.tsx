import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ExperimentDetail from "../components/ExperimentDetail";
import Navigation from "../components/Navigation";
import {
  getExperimentById,
  loadExperiments,
} from "../services/experimentService";
import { Experiment } from "../types";
import "./ExperimentPage.css";

const ExperimentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experiment, setExperiment] = useState<Experiment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [experimentIds, setExperimentIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchExperiment = async () => {
      if (!id) {
        navigate("/");
        return;
      }

      try {
        // Load all experiments to get their IDs for navigation
        const allExperiments = await loadExperiments();
        const experimentIds = allExperiments.map((exp) => exp.id);
        setExperimentIds(experimentIds);

        // Get the current experiment
        const experimentData = await getExperimentById(id);

        if (experimentData) {
          setExperiment(experimentData);
        } else {
          setError("Experiment not found");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching experiment:", err);
        setError("Failed to load experiment. Please try again later.");
        setLoading(false);
      }
    };

    fetchExperiment();
  }, [id, navigate]);

  if (loading) {
    return <div className="loading">Loading experiment...</div>;
  }

  if (error || !experiment) {
    return (
      <div className="error-container">
        <div className="error">{error || "Experiment not found"}</div>
        <button className="back-button" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="experiment-page">
      <Navigation experimentIds={experimentIds} currentExperimentId={id} />
      <ExperimentDetail experiment={experiment} />
    </div>
  );
};

export default ExperimentPage;
