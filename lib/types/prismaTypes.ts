import { Day, DiaryEntry } from '@prisma/client'
export type DayWithDiaryEntries = Day & { diaryEntries: DiaryEntry[] }
