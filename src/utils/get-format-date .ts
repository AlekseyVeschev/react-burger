import { MS_IN_DAY, DAYS_MAP, DAY_DECLENSION } from "./constants";

export const getFormatDate = (date: string): string => {
   if (!date) return ""

   const formatedDate = new Intl.DateTimeFormat('ru-ru', {
      timeZoneName: 'short',
      hour: '2-digit',
      minute: '2-digit'
   }).format(new Date(date))

   const dayDifference = Math.round((+new Date() - +new Date(date)) / MS_IN_DAY)

   if (dayDifference <= 1 && dayDifference >= 0) {
      return `${DAYS_MAP[dayDifference]}, ${formatedDate}`
   }

   return `${dayDifference
      } ${declOfNum(dayDifference, DAY_DECLENSION)
      } назад, ${formatedDate}`;
};

function declOfNum(dayDifference: number, titles: Array<string>) {
   const cases = [2, 0, 1, 1, 1, 2];
   return titles[(dayDifference % 100 > 4 && dayDifference % 100 < 20)
      ? 2
      : cases[(dayDifference % 10 < 5)
         ? dayDifference % 10
         : 5
      ]];
}
