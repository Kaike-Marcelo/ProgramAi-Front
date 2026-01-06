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