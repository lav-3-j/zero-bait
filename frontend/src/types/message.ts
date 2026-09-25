export type ChannelType = 'email' | 'slack' | 'sms';
export type ThreatTier = 'Clean' | 'Advisory' | 'Suspicious' | 'Active AI Spear-Phish';

export interface MessagePayload {
  id: string;
  channel: ChannelType;
  sender_name: string;
  sender_address: string;
  recipient: string;
  subject?: string | null;
  content: string;
  headers?: Record<string, string> | null;
  timestamp?: string | null;
}

export interface PsychologicalTrigger {
  category: string;
  score: number;
  matched_text: string;
  explanation: string;
}

export interface TextSpanHighlight {
  start: number;
  end: number;
  text: string;
  vector: string;
  severity: 'high' | 'medium' | 'low';
  explanation: string;
}

export interface LegacyFilterResult {
  is_flagged: boolean;
  spam_score: number;
  status_label: string;
  reason: string;
}

export interface RadarScores {
  identity_risk: number;
  coercion_pressure: number;
  sop_deviation: number;
  channel_risk: number;
}

export interface SocraticQuiz {
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  rule_of_thumb: string;
}

export interface InoculationData {
  tactical_summary: string;
  why_legacy_missed: string;
  contrastive_authentic: string;
  quiz: SocraticQuiz;
}

export interface AnalysisResult {
  message_id: string;
  channel: ChannelType;
  is_ai_phishing: boolean;
  overall_threat_score: number;
  threat_tier: ThreatTier;
  summary: string;
  legacy_comparison: LegacyFilterResult;
  radar_scores: RadarScores;
  triggers: PsychologicalTrigger[];
  highlights: TextSpanHighlight[];
  inoculation: InoculationData;
}

export interface VerificationResponse {
  is_correct: boolean;
  explanation: string;
  rule_of_thumb: string;
  badge_awarded?: string | null;
}

export interface AdversarialGenerateRequest {
  channel: ChannelType;
  target_role: string;
  scenario: string;
  sophistication?: string;
}


export interface AdversarialGenerateResponse {
  message: MessagePayload;
  analysis: AnalysisResult;
  reconstructed_attacker_prompt: string;
}
