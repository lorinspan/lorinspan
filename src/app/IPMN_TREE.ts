import {DecisionNode} from "./Decision";

export const IPMN_TREE: Record<string, DecisionNode> = {
  START: {
    id: 'START',
    text: 'Are any of the following "high-risk stigmata" of HGD / IC present?',
    options: [
      { label: 'YES', nextNodeId: 'SURGERY_CONSIDER' },
      { label: 'NO', nextNodeId: 'WORRISOME_FEATURES' }
    ]
  },
  SURGERY_CONSIDER: {
    id: 'SURGERY_CONSIDER',
    text: 'Consider surgery, if clinically appropriate.',
    result: 'SURGERY'
  },
  WORRISOME_FEATURES: {
    id: 'WORRISOME_FEATURES',
    text: 'Are any of the following "worrisome features" present?',
    options: [
      { label: 'YES', nextNodeId: 'ADDITIONAL_FACTORS' },
      { label: 'NO', nextNodeId: 'SIZE_CHECK' }
    ]
  },
  ADDITIONAL_FACTORS: {
    id: 'ADDITIONAL_FACTORS',
    text: 'Are any of the following factors present (Repeated pancreatitis, multiple "worrisome features", young/fit for surgery)?',
    options: [
      { label: 'YES', nextNodeId: 'SURGERY_CONSIDER' },
      { label: 'NO', nextNodeId: 'CYST_30_ALONE' }
    ]
  },
  CYST_30_ALONE: {
    id: 'CYST_30_ALONE',
    text: 'Is "Cyst >= 30mm" the only worrisome feature present?',
    options: [
      { label: 'YES', nextNodeId: 'SIZE_CHECK' },
      { label: 'NO', nextNodeId: 'SURVEILLANCE_1_6' }
    ]
  },
  SURVEILLANCE_1_6: {
    id: 'SURVEILLANCE_1_6',
    text: 'Surveillance with 1-6 month interval according to estimated risk.',
    result: 'SURVEILLANCE'
  },
  SIZE_CHECK: {
    id: 'SIZE_CHECK',
    text: 'What is the size of the largest cyst?',
    options: [
      { label: '< 20mm', nextNodeId: 'SIZE_UNDER_20' },
      { label: '≥ 20mm and < 30mm', nextNodeId: 'SIZE_20_30' },
      { label: '≥ 30mm', nextNodeId: 'SIZE_OVER_30' }
    ]
  },
  SIZE_UNDER_20: {
    id: 'SIZE_UNDER_20',
    text: 'Surveillance 6 months once, then every 18 months, if stable.',
    result: 'SURVEILLANCE'
  },
  SIZE_20_30: {
    id: 'SIZE_20_30',
    text: 'Surveillance 6 months twice, then every 12 months, if stable.',
    result: 'SURVEILLANCE'
  },
  SIZE_OVER_30: {
    id: 'SIZE_OVER_30',
    text: 'Surveillance every 6 months.',
    result: 'SURVEILLANCE'
  }
};
