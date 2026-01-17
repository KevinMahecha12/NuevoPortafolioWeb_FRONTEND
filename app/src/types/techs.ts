export interface skills {
 id: number;
 name: string;
 level: number;
 icon_url: string;
 order: number;
 level_text: string;
}

export interface SkillsGrouped {
 category_id: number;
 category_name: string;
 category_order: number;
 total: number;
 skills: skills[];
}

export interface SkillsResponse {
  success: boolean;
  message: string;
  data: SkillsGrouped[]; 
}

export interface TechBubbleProps {
  label: string;
  iconUrl: string;
  level: number;
  levelText: string;
  speed?: number;
  pulseSpeed?: number;
  minPulseScale?: number;
  maxPulseScale?: number;
  maxHoverScale?: number;
  glowColor?: string;
  containerW: number;
  containerH: number;
}

export interface BubblePhysicsProps extends TechBubbleProps {
  showInfo: boolean;
}