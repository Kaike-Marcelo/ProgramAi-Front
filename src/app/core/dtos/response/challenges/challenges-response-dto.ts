import { TopicsModuleResponseDto } from "./topics-module-response-dto.model";

export interface ModuleDetailsResponseDto {
    moduleId: string;
    moduleName: string;
    topics: TopicsModuleResponseDto[];
}