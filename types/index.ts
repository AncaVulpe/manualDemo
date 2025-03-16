export interface Option {
    display: string;
    value: string | boolean;
    isRejection: boolean;
  }
  
  export interface Question {
    question: string;
    type: 'ChoiceTypeImage' | 'ChoiceTypeText';
    options: Option[];
  }
  
  export interface QuizData {
    questions: Question[];
  }
  
  export interface LearnMoreItem {
    id: number;
    assetID: string;
    title: string;
    header: string;
    subtitle: string;
  }
  
  export interface LearnMoreData {
    data: LearnMoreItem[];
  }