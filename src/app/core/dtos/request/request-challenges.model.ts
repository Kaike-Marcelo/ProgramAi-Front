export interface RequestModuleDetails {
    moduleId: string;
    includeEmptyTopics: boolean;
}

export interface RequestChallengeQuestions {
    moduleId: number;
    topicId: number;
}

export interface RequestQuestionDetailed {
    questionId: number;
}

export interface RequestSubmitQuestion {
    questionId: number;
    code: string;
}