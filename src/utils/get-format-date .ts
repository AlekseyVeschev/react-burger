

export const getFormatDate = (date: string): string => {

   const formatedDate = new Intl.DateTimeFormat('ru-ru', {
      timeZoneName: 'short',
      hour: '2-digit',
      minute: '2-digit'
   }).format(new Date(date))

   return formatedDate
}