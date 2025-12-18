
export interface FeatureExtraction {
  url: string;
  length: number;
  dots: number;
  hasAt: boolean;
  hasHyphen: boolean;
  hasDoubleSlash: boolean;
  isHttps: boolean;
  isIpAddress: boolean;
}

export interface MLPrediction {
  isPhishing: boolean;
  confidence: number;
  reasoning: string;
  features: string[];
}

export interface ModelMetric {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
}
