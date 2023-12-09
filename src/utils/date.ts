/**
 * Converte uma string de data e uma string de hora para um objeto Date.
 *
 * @param {string} date - A string representando a data (no formato DD/MM/YYYY).
 * @param {string} hour - A string representando a hora (no formato HH:MM).
 * @returns Um objeto Date representando a combinação de data e hora.
 */
export function getDate(date: string, hour: string): Date {
  const regexDate =
    /(?<Day>0[1-9]|[12][0-9]|3[01])\D*(?<Month>0[1-9]|1[0-2])\D*(?<Year>\d{4})/;
  const regexHours = /(?<Hour>[01]\d|2[0-3])\D*(?<Minutes>[0-5]\d)/;

  const dateMatch = regexDate.exec(date);
  const hourMatch = regexHours.exec(hour);

  if (!dateMatch || !hourMatch) {
    return new Date();
  }

  const { Year, Month, Day } = dateMatch.groups!;
  const { Hour, Minutes } = hourMatch.groups!;

  return new Date(
    parseInt(Year),
    parseInt(Month) - 1,
    parseInt(Day),
    parseInt(Hour),
    parseInt(Minutes),
  );
}
