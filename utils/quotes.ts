export async function getQuote(): Promise<string> {
  const res = await fetch("https://zenquotes.io/api/random/");
  const data = await res.json();
  console.log(data);
  return data as string;
}
