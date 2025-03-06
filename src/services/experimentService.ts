import { Experiment } from '../types';
import { parseExperimentContent, extractExperimentSummary } from '../utils/experimentParser';

// List of experiment filenames
const experimentFilenames = [
  'next-gen_seo_notebook.md',
  'smoking_hot_leads.md',
  'sine_says.md',
  'persona_platform.md',
  'SWOTyMcBotFace.md',
  'jobi.md',
  'ceo_bot_5000.md',
  'slacktobasics.md'
];

// Load all experiments
export const loadExperiments = async (): Promise<Experiment[]> => {
  const experiments: Experiment[] = [];

  for (const filename of experimentFilenames) {
    try {
      // Load the content of the markdown file
      const response = await fetch(`/experiments/${filename}`);
      if (!response.ok) {
        console.error(`Failed to load ${filename}: ${response.statusText}`);
        continue;
      }
      
      const experimentContent = await response.text();
      
      // Parse the experiment content
      const experiment = parseExperimentContent(filename, experimentContent);
      experiments.push(experiment);
    } catch (error) {
      console.error(`Error loading experiment ${filename}:`, error);
    }
  }

  return experiments;
};

// Get experiment summaries for the index page
export const getExperimentSummaries = async () => {
  const experiments = await loadExperiments();
  return experiments.map(extractExperimentSummary);
};

// Get a single experiment by ID
export const getExperimentById = async (id: string): Promise<Experiment | null> => {
  const experiments = await loadExperiments();
  return experiments.find(exp => exp.id === id) || null;
}; 