export interface IUserStats {
    id: string
    userId: string
    resumesCreated: number
    aiRequestsUsed: number
    totalDownloads: number
    totalViews: number
    currentMonthUsage?: {
        aiRequests: number
        jobAnalyses: number
        resumeCreated: number,
        periodStart: string
    }
    createdAt: string
    updatedAt: string
}