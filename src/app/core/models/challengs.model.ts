export interface ModuleDetails {
    moduleId: string;
    moduleName: string;
    topics: TopicsModule[];
}

export interface TopicsModule {
    topicId: number,
    name: string,
    description: string,
    difficulty: string,
    hasQuestions: boolean,
    questions: QuestionsTopic[]
}

export interface QuestionsTopic {
    questionId: number,
    question: string,
    scoreBase: number,
    startAt: string,
    endAt: string,
}

export interface ChallengeQuestionDetails {
    id: number,
    text: string,
    scoreBase: number,
    startAt: string,
    endAt: string,
    attempt: AttemptChallenge
}

export interface AttemptChallenge {
    submittedCode: string,
    aiHint: string,
    aiFeedback: string,
    aiScore: number,
    createdAt: string
}