export interface TopicsModuleResponseDto {
    topicId: number,
    name: string,
    description: string,
    difficulty: string,
    hasQuestions: boolean,
    questions: QuestionsTopicResponseDto[]
}

export interface QuestionsTopicResponseDto {
    questionId: number,
    question: string,
    scoreBase: number,
    startAt: string,
    endAt: string,
}