import { Experiment } from '../types';

export const parseExperimentContent = (filename: string, content: string): Experiment => {
  // Extract the title from the first heading
  const titleMatch = content.match(/^# (.+)$/m);
  const title = titleMatch ? titleMatch[1] : 'Untitled Experiment';

  // Extract the hypothesis
  const hypothesisRegex = /### 5\. Hypothesis\s+([\s\S]*?)(?=###|$)/;
  const hypothesisMatch = content.match(hypothesisRegex);
  const hypothesis = hypothesisMatch 
    ? hypothesisMatch[1].trim() 
    : 'No hypothesis provided';

  // Extract benefits from the Business Value section
  const benefitsRegex = /### Extended Benefits\s+([\s\S]*?)(?=###|$)/;
  const benefitsMatch = content.match(benefitsRegex);
  const benefitsText = benefitsMatch ? benefitsMatch[1] : '';
  
  // Parse benefits as bullet points
  const benefits = benefitsText
    .split('\n')
    .filter(line => line.trim().startsWith('- **'))
    .map(line => {
      const match = line.match(/- \*\*(.+)\*\*:? (.+)/);
      return match ? `${match[1]}: ${match[2]}` : line.replace(/- \*\*|\*\*/g, '').trim();
    });

  // Create a unique ID from the filename
  const id = filename.replace(/\.md$/, '').toLowerCase().replace(/[^a-z0-9]/g, '-');

  return {
    id,
    title,
    filename,
    hypothesis,
    benefits: benefits.length > 0 ? benefits : ['No benefits listed'],
    content
  };
};

export const extractExperimentSummary = (experiment: Experiment) => {
  return {
    id: experiment.id,
    title: experiment.title,
    hypothesis: experiment.hypothesis,
    benefits: experiment.benefits
  };
}; 