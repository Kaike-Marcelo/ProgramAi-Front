import { TopicsModuleResponseDto } from "./topics-module-response-dto.model";

export interface ModuleDetailsResponseDto {
    moduleId: string;
    moduleName: string;
    topics: TopicsModuleResponseDto[];
}

export interface ChallengeQuestionDetailsResponseDto {
    id: number,
    text: string,
    scoreBase: number,
    startAt: string,
    endAt: string,
    attempt: AttemptChallengeResponseDto
}

export interface AttemptChallengeResponseDto {
    submittedCode: string,
    aiHint: string,
    aiFeedback: string,
    aiScore: number,
    createdAt: string
}

export interface HintQuestionResponseDto {
    hint: string;
}

export interface ModuleSumaryResponseDto {
    trainingPerformance: TrainingPerformanceResponseDto,
    trainingProgress: TrainingProgressResponseDto,
    trainingContent: TrainingContentResponseDto[],
    trainingChallenges: TrainingChallengesResponseDto[]
}

export interface TrainingProgressResponseDto {
    completedPercentage: number,
    pendingPercentage: number
}

export interface TrainingPerformanceResponseDto {
    averageScore: number,
    completedChallenges: number,
    completedChallengesPercentage: number,
    failedChallenges: number,
    failedChallengesPercentage: number,
    totalChallenges: number,
    totalChallengesPercentage: number
}

export interface TrainingContentResponseDto {
    topicName: string,
    completedPercentage: number
}

export interface TrainingChallengesResponseDto {
    questionId: number,
    question: string,
    isCompleted: boolean
}