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
    moduleId: string,
    moduleName: string,
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

export interface ModuleSumary {
    trainingPerformance: TrainingPerformance,
    trainingProgress: TrainingProgress,
    trainingContent: TrainingContent[],
    trainingChallenges: TrainingChallenges[]
}

export interface TrainingPerformance {
    averageScore: number,
    completedChallenges: number,
    completedChallengesPercentage: number,
    failedChallenges: number,
    failedChallengesPercentage: number,
    totalChallenges: number,
    totalChallengesPercentage: number
}

export interface TrainingProgress {
    completedPercentage: number,
    pendingPercentage: number
}

export interface TrainingContent {
    topicName: string,
    completedPercentage: number
}

export interface TrainingChallenges {
    questionId: number,
    question: string,
    isCompleted: boolean
}