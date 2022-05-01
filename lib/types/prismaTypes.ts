import { Day, DiaryEntry, KsamsokImage } from '@prisma/client'
export type DayWithContent = Day & {
  diaryEntries: DiaryEntry[]
  ksamsokImages: KsamsokImage[]
}
