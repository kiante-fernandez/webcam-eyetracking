export interface Tool {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  short_impression: string;
  homepage?: string;
  repo?: string;
  demo?: string;
  docs?: string;
  papers: Paper[];
  license: License;
  primary_language: string;
  platform_support: Platform[];
  features: Features;
  calibration: Calibration;
  claimed_accuracy?: string;
  privacy_notes?: string;
  example_snippet?: string;
  tags: string[];
  last_verified: string;
  verified_by: string;
  metadata?: Metadata;
}

export interface Paper {
  title: string;
  authors: string;
  year: number;
  doi?: string;
}

export type License =
  | 'MIT'
  | 'Apache-2.0'
  | 'GPL-3.0'
  | 'BSD-3-Clause'
  | 'Proprietary'
  | 'Commercial'
  | 'Other';

export type Platform =
  | 'Chrome'
  | 'Firefox'
  | 'Edge'
  | 'Safari'
  | 'Mobile'
  | 'Desktop'
  | 'iOS'
  | 'Android';

export type Calibration = 'required' | 'optional' | 'none';

export interface Features {
  gaze: boolean;
  fixation: boolean;
  heatmap: boolean;
  blink_detection: boolean;
}

export interface Metadata {
  github_stars?: number;
  last_commit_date?: string;
  latest_release?: string;
}
