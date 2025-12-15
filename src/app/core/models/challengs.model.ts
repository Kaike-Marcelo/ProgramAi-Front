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